'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ArrowLeft, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { fetchExamByExamId } from "@/apis/result.exam.apis"
import dayjs from "dayjs"

export default function StudentScoreTable() {
    const [data, setData] = useState([]);
    const params = useSearchParams();
    const examId = params.get('examId');
    const router = useRouter();
    useEffect(() => {
        fetchExamByExamId(examId).then((res) => {
            setData(res.data)
        })
    }, [])
    return (
        <TooltipProvider>
            <div className="flex p-4">
                <Button variant="outline" size="sm" className="gap-1" onClick={() => router.back()}>
                    <ArrowLeft className="w-4 h-4" />
                    <span>Quay lại</span>
                </Button>
            </div>
            <Card className="max-w-5xl mx-auto mt-10 shadow-lg rounded-2xl">
                {/* <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-primary">Môn: Toán Học – Lớp: 12A1</CardTitle>
                </CardHeader> */}
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">STT</TableHead>
                                <TableHead>Họ và tên</TableHead>

                                <TableHead>Hoàn thành </TableHead>
                                <TableHead>Điểm</TableHead>
                                <TableHead className="text-center">Chức năng</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((student, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{student.user.displayName}</TableCell>
                                    <TableCell>{dayjs(student.completeAt).format('HH:mm DD/MM/YYYY')}</TableCell>
                                    <TableCell>{student.score}</TableCell>
                                    <TableCell className="text-center">
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="outline" size="sm" className="gap-1" onClick={() => router.push(`/Courses/Exam/ResultDetail?id=${student._id}`)}>
                                                    <Eye className="w-4 h-4" />
                                                    Xem
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <span>Xem bài làm của học sinh</span>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TooltipProvider>
    )
}
