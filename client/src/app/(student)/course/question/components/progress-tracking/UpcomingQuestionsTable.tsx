import { lesson, questionLesson } from '@/types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

function UpcomingQuestionsTable({ questions, questionId, lessonId, courseId }: { questions: questionLesson[], questionId: any, courseId: any, lessonId: any }) {
    const router = useRouter()

    return (
        <TableContainer component={Paper} sx={{ marginTop: 4 }}>
            <Typography variant="h6" sx={{ margin: 2 }}>Upcoming Questions</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Question</TableCell>
                        <TableCell>Due Date</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {questions.map((question, index) => (
                        questionId === question._id ?
                            <TableRow key={index} sx={{ backgroundColor: '#dfe6e9' }}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{question?.title.split(' ').slice(0, 6).join(' ') + '...'}</TableCell>
                                <TableCell>{dayjs(question?.timeEnd).format('DD/MM/YYYY')}</TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="success">
                                        {question?.status}
                                    </Button>
                                </TableCell>
                            </TableRow>
                            :
                            <TableRow key={index}
                                onClick={() => router.push(`question?id=${question._id}&courseId=${courseId}&lessonId=${lessonId}`)}
                                sx={{ cursor: 'pointer' }}
                            >
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{question?.title.split(' ').slice(0, 6).join(' ') + '...'}</TableCell>
                                <TableCell>{dayjs(question?.timeEnd).format('DD/MM/YYYY')}</TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="success">
                                        {question?.status}
                                    </Button>
                                </TableCell>
                            </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
}

export default UpcomingQuestionsTable;
