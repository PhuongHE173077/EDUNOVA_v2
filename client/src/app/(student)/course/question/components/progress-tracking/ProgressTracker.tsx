import { useSearchParams } from "next/navigation"
import ChartStatistics from "./ChartStatistics"
import ClassMeetingCard from "./ClassMeetingCard"
import UpcomingQuestionsTable from "./UpcomingQuestionsTable"
import { useEffect, useState } from "react"
import { answerLesson, Course, lesson, questionLesson } from "@/types"
import { fetchCoursesById } from "@/apis/course.apis"
import { fetchAnswerByQuestionId } from "@/apis/answer.lesson.apis"
import { fetchLessonByCourseId } from "@/apis/lession.apis"
import { fetchQuestionsByLessonId } from "@/apis/question.lesion.apis"
import { Loading } from "@/components/ui/loading"


function ProgressTracker() {
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const courseId = searchParams.get('courseId')
    const lessonId = searchParams.get('lessonId')
    const [totalStudents, setTotalStudents] = useState(0)
    const [studentsCommented, setStudentsCommented] = useState(0)
    const [questions, setQuestion] = useState<questionLesson[]>([])
    const [loading, setLoading] = useState(true)
    const pageQuery = searchParams.get("page")

    const page = parseInt(pageQuery || "1")
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetchCoursesById(courseId)
            setTotalStudents(res.data.student.length)
            const res2 = await fetchAnswerByQuestionId(id!, page)
            setStudentsCommented([...new Set(res2.data.answers.map((item: any) => item.userId))].length)
            const res3 = await fetchQuestionsByLessonId(lessonId!)
            setQuestion(res3.data)
            setLoading(false)
        }
        fetchData()
    }, [id, courseId, lessonId])

    if (loading) return <Loading />

    return (
        <div>
            {/* <ChartStatistics totalStudents={totalStudents} studentsCommented={studentsCommented} /> */}
            {/* <hr style={{
                border: "1px solid lightgray",
                margin: "8px auto"
            }} /> */}
            {questions && <UpcomingQuestionsTable questions={questions} questionId={id!} courseId={courseId!} lessonId={lessonId!} />}

        </div>
    )
}

export default ProgressTracker
