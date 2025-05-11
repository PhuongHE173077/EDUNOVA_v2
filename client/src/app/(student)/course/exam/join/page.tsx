'use client'
import { fetchExamDetail } from '@/apis/exam.apis'
import { createNewRsExam, updateRsExam } from '@/apis/result.exam.apis'
import { Loading } from '@/components/ui/loading'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ExamContent } from '../components/ExamContent'
import { HeaderExam } from '../components/Header'
import { toast } from 'react-toastify'

export default function page() {
    const [data, setData] = useState()
    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(true)
    const [rsExam, setRsExam] = useState<any>()
    const searchLocation = useSearchParams()
    const examId = searchLocation.get('examId')
    const router = useRouter()
    useEffect(() => {
        const fetchData = async () => {
            await createNewRsExam(examId).then((res) => {
                setRsExam(res.data)
                fetchExamDetail(examId).then((res) => {
                    if (res.data.message === "doing") {
                        setData(res.data.data)
                        setQuestions(res.data.data.questions)
                    } else {
                        setData(res.data.data)
                        setQuestions(res.data.data.questions.map((item: any) => {
                            return {
                                ...item,
                                options: item.options.map((option: any) => {
                                    return {
                                        id: option.id,
                                        content: option.content,
                                        isChecked: false
                                    }
                                })
                            }
                        }))
                    }

                    setLoading(false)
                })
            })
                .catch((err) => {
                    router.push('/course/exam?courseId=' + searchLocation.get('courseId'))
                })
        }
        fetchData()
    }, [])

    const handleSubmit = async (data: any, type: string) => {
        const dataUpdate = {
            answers: data,
            type
        }
        return await updateRsExam(examId, dataUpdate)
    }

    if (loading) return <Loading />
    return (
        <>
            <HeaderExam />
            <main>
                <ExamContent
                    questions={questions}
                    data={data}
                    setQuestions={setQuestions}
                    dueTime={rsExam.dueTime}
                    handleSubmit={handleSubmit}
                    examId={examId}
                />
            </main>
        </>
    )
}
