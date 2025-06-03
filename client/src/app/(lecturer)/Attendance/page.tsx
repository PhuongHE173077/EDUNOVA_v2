'use client';
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, XCircle } from "lucide-react";

type Student = {
    id: number;
    name: string;
    present: boolean;
};

const initialStudents: Student[] = [
    { id: 1, name: "Đỗ Phương", present: false },
    { id: 2, name: "Đỗ Đăng Phương", present: false },
];


export default function page() {
    const [students, setStudents] = useState<Student[]>(initialStudents);

    const toggleAttendance = (id: number) => {
        setStudents(prev =>
            prev.map(s => (s.id === id ? { ...s, present: !s.present } : s))
        );
    };

    const handleSubmit = () => {
        const presentCount = students.filter(s => s.present).length;
        alert(`✅ Có mặt: ${presentCount}/${students.length} học sinh.`);
    };

    return (
        <div className=" mx-auto mt-10 p-4">
            <Card className="shadow-xl rounded-2xl border border-gray-200">
                <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        📋 Điểm danh học sinh
                    </h2>
                    <Separator className="mb-4" />
                    <ul className="space-y-3">
                        {students.map(student => (
                            <li
                                key={student.id}
                                className="flex items-center justify-between p-3 rounded-xl transition hover:bg-gray-50"
                            >
                                <div className="flex items-center gap-3">
                                    <Checkbox
                                        checked={student.present}
                                        onCheckedChange={() => toggleAttendance(student.id)}
                                        className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                                    />
                                    <span
                                        className={`text-lg ${student.present ? "text-green-600 font-medium" : "text-gray-700"
                                            }`}
                                    >
                                        {student.name}
                                    </span>
                                </div>
                                {student.present ? (
                                    <CheckCircle className="text-green-500 w-5 h-5" />
                                ) : (
                                    <XCircle className="text-red-400 w-5 h-5" />
                                )}
                            </li>
                        ))}
                    </ul>
                    <Separator className="my-6" />
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">
                            👨‍🏫 Có mặt:{" "}
                            <strong className="text-green-600">
                                {students.filter(student => student.present).length}
                            </strong>{" "}
                            / {students.length}
                        </span>
                        <Button
                            onClick={handleSubmit}
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6"
                        >
                            ✅ Xác nhận điểm danh
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
