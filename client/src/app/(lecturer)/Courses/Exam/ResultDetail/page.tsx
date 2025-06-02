'use client'
import { fetchExamById } from '@/apis/result.exam.apis';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from "@/components/ui/separator";

const student = {
    name: "Nguyễn Văn A",
    studentId: "SV123456",
    totalScore: 8,
    answers: [
        {
            question: "1 + 1 bằng mấy?",
            studentAnswer: "2",
            correctAnswer: "2",
            isCorrect: true,
        },
        {
            question: "Thủ đô của Việt Nam là?",
            studentAnswer: "TP. Hồ Chí Minh",
            correctAnswer: "Hà Nội",
            isCorrect: false,
        },
        {
            question: "React là gì?",
            studentAnswer: "Thư viện JS",
            correctAnswer: "Thư viện JS",
            isCorrect: true,
        },
    ],
}
export default function page() {
    const params = useSearchParams();
    const [results, setResults] = useState([]);
    const id = params.get('id');
    useEffect(() => {
        fetchExamById(id).then((res) => {
            setResults(res.data);
        })
    }, [])
    return (
        <div className="max-w-3xl mx-auto mt-10 p-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Bài Làm Chi Tiết</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <p><strong>Họ tên:</strong> {student.name}</p>
                        <p><strong>Mã số sinh viên:</strong> {student.studentId}</p>
                        <p><strong>Tổng điểm:</strong> {student.totalScore}</p>
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-4">
                        {student.answers.map((item, index) => (
                            <Card key={index} className="bg-muted">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle className="text-base font-semibold">
                                        Câu {index + 1}: {item.question}
                                    </CardTitle>
                                    <Badge variant={item.isCorrect ? "default" : "destructive"}>
                                        {item.isCorrect ? "Đúng" : "Sai"}
                                    </Badge>
                                </CardHeader>
                                <CardContent className="text-sm space-y-1">
                                    <p><strong>Câu trả lời của học sinh:</strong> {item.studentAnswer}</p>
                                    <p><strong>Đáp án đúng:</strong> {item.correctAnswer}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
