'use client'
import { fetchExamsByCourseId } from '@/apis/exam.apis';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { exam } from '@/types';
import { TableCell } from '@mui/material';
import { MoveLeftIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'

export default function page() {
    const searchParams = useSearchParams();
    const courseId = searchParams.get('courseId');
    const router = useRouter();
    const [exam, setExam] = React.useState<exam[]>([]);
    useEffect(() => {
        fetchExamsByCourseId(courseId).then((res) => {
            setExam(res.data)
        })
    }, [])
    return (
        <div className='p-10'>
            <div className="flex justify-between items-center">
                <Button onClick={() => router.back()}>
                    <MoveLeftIcon className=' h-4 w-3' />
                    Back</Button>
                <Button variant={'outline'} onClick={() => router.push(`Exam/AddExam?courseId=${courseId}`)}>Add exam</Button>
            </div>
            <Table className="border-2 border-black mt-10 w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-black ">STT</TableHead>
                        <TableHead className="text-black text-center">Image</TableHead>
                        <TableHead className="text-black text-center">Title</TableHead>
                        <TableHead className="text-black text-center">Time</TableHead>
                        <TableHead className="text-black text-center">Status</TableHead>
                        <TableHead className="text-black text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {exam.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell className="text-center align-middle w-1/12">{index + 1}</TableCell>
                            <TableCell className="text-center align-middle w-2/12">
                                <img
                                    src={item.image || '/images/exam.png'}
                                    alt=""
                                    className="h-12 w-auto mx-auto"
                                />
                            </TableCell>
                            <TableCell className="text-center align-middle w-3/12">
                                {item.title.split(' ').slice(0, 6).join(' ') + '...'}
                            </TableCell>
                            <TableCell className="text-center align-middle">
                                {item.time} minutes
                            </TableCell>
                            <TableCell className="text-center align-middle">
                                {item.status}
                            </TableCell>
                            <TableCell className="text-center align-middle space-x-2 w-3/12">
                                <Button variant="warning" onClick={() => router.push(`Exam/UpdateExam?examId=${item._id}`)}>Update Detail</Button>
                                <Button variant="success">View result</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>


        </div>
    )
}
