'use client'
import { fetchExamsByCourseId, updateExamById } from '@/apis/exam.apis'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { exam } from '@/types'
import { Chip } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import { CircleCheck, CirclePowerIcon, Loader, MoveLeft, MoveLeftIcon } from 'lucide-react'
import dayjs from 'dayjs'
import { fetchAFewRsExam } from '@/apis/result.exam.apis'
import { STATUS_EXAM } from '@/lib/constants'

export default function page() {
    const [exam, setExam] = React.useState<exam[]>([]);
    const searchLocation = useSearchParams();
    const courseId = searchLocation.get('courseId');
    const [resultExams, setResultExams] = React.useState<any[]>([])]
    const router = useRouter();
    useEffect(() => {
        fetchExamsByCourseId(courseId).then((res) => {
            setExam(res.data)
        })
        fetchAFewRsExam().then((res) => {
            setResultExams(res.data)
        })
    }, [])

    const doExam = async (id: any) => {
        router.push(`exam/join?examId=${id}&courseId=${courseId}`)
    }

    return (
        <>
            <div className="mt-5 ml-5">
                <Button onClick={() => router.push(`/course/${courseId}`)}>
                    <MoveLeftIcon className=' h-4 w-3' />
                    Back</Button>
            </div>

            <div className="overflow-x-auto p-10 !pt-5">

                <Table className='border-2 border-black'>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='text-black'>STT</TableHead>
                            <TableHead className='text-black'>Title</TableHead>
                            <TableHead className='text-black'>Doing Date</TableHead>
                            <TableHead className='text-black'>Time </TableHead>
                            <TableHead className='text-black'>Status</TableHead>
                            <TableHead className='text-black'>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {exam.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>{dayjs(item.date).format('DD-MM-YYYY')} </TableCell>
                                <TableCell>{item.time} minutes </TableCell>
                                <TableCell>
                                    <Chip
                                        icon={
                                            <>
                                                {item.status === STATUS_EXAM.FINISHED && (
                                                    <CheckCircleIcon style={{ color: "#2e7d32" }} />
                                                )}
                                                {item.status === STATUS_EXAM.PENDING && (
                                                    <NewReleasesIcon style={{ color: "#f9a825" }} />
                                                )}
                                                {(item.status === STATUS_EXAM.START && resultExams.find((result) => result.examId === item._id)
                                                    && (new Date(resultExams.find((result) => result.examId === item._id).dueTime).getTime() > Date.now())
                                                    && (resultExams.find((result) => result.examId === item._id).type !== 'finish')) &&
                                                    <Loader
                                                        style={{
                                                            color: "#0288d1",
                                                            animation: "spin 1s linear infinite",
                                                        }}
                                                        width={20}
                                                        height={20}
                                                    />
                                                }
                                                {(item.status === STATUS_EXAM.START && resultExams.find((result) => result.examId === item._id)
                                                    && ((new Date(resultExams.find((result) => result.examId === item._id).dueTime).getTime() < Date.now())
                                                        || (resultExams.find((result) => result.examId === item._id).type == 'finish'))
                                                )
                                                    && <CheckCircleIcon style={{ color: "#2e7d32" }} />
                                                }
                                                {
                                                    item.status === STATUS_EXAM.START && !resultExams.find((result) => result.examId === item._id)
                                                    && <CircleCheck style={{ color: "#341f97" }} width={20} height={20} />
                                                }
                                            </>
                                        }
                                        label={item.status !== STATUS_EXAM.START ? item.status :
                                            (!resultExams.find((result) => result.examId === item._id) ? 'START' :
                                                (new Date(resultExams.find((result) => result.examId === item._id).dueTime).getTime() > Date.now())
                                                    && (resultExams.find((result) => result.examId === item._id).type !== 'finish')
                                                    ? 'DOING'
                                                    : 'FINISHED'
                                            )
                                        }
                                        size="medium"
                                        sx={{
                                            backgroundColor:
                                                item.status === STATUS_EXAM.FINISHED
                                                    ? '#c8e6c9'
                                                    : item.status === STATUS_EXAM.PENDING
                                                        ? '#fff3e0'
                                                        : !resultExams.find((result) => result.examId === item._id)
                                                            ? '#0abde3' :
                                                            ((new Date(resultExams.find((result) => result.examId === item._id).dueTime).getTime() > Date.now())
                                                                && (resultExams.find((result) => result.examId === item._id).type !== 'finish'))
                                                                ? '#e3f2fd'
                                                                : '#c8e6c9',
                                            color:
                                                item.status === STATUS_EXAM.FINISHED
                                                    ? '#2e7d32'
                                                    : item.status === STATUS_EXAM.PENDING
                                                        ? '#f57c00'
                                                        : !resultExams.find((result) => result.examId === item._id)
                                                            ? '#222f3e' :
                                                            ((new Date(resultExams.find((result) => result.examId === item._id).dueTime).getTime() > Date.now())
                                                                && (resultExams.find((result) => result.examId === item._id).type !== 'finish'))
                                                                ? '#0277bd'
                                                                : '#1b5e20',
                                            fontWeight: "bold",
                                            textTransform: "uppercase",
                                            padding: "2px 8px",
                                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                                backgroundColor:
                                                    item.status === STATUS_EXAM.FINISHED
                                                        ? "#a5d6a7"
                                                        : item.status === STATUS_EXAM.PENDING
                                                            ? "#ffe0b2"
                                                            : !resultExams.find((result) => result.examId === item._id)
                                                                ? "#bbdefb" :
                                                                (new Date(resultExams.find((result) => result.examId === item._id).dueTime).getTime() > Date.now())
                                                                    && (resultExams.find((result) => result.examId === item._id).type !== 'finish')
                                                                    ? "#bbdefb"
                                                                    : "#f0f0f0",
                                                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.25)",
                                            },
                                        }}
                                    />

                                </TableCell>
                                <TableCell>
                                    {(item.status === STATUS_EXAM.START
                                        && (!resultExams.find((result) => result.examId === item._id) || ((new Date(resultExams.find((result) => result.examId === item._id).dueTime).getTime() > Date.now()) && (resultExams.find((result) => result.examId === item._id).type !== 'finish')))
                                    )
                                        && <Button variant={'outline'} onClick={() => doExam(item._id)}>
                                            Do Exam
                                        </Button>}
                                    {
                                        item.status === 'done' && item.viewAnswer && <Button variant={'success'}>
                                            History
                                        </Button>
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>



        </>
    )
}
