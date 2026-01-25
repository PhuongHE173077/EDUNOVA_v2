'use client';
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, XCircle } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { fetchCoursesById } from "@/apis/course.apis";
import { fetchScheduleById } from "@/apis/schedule.apis";
import { createAttend, fetchAttendByScheduleId } from "@/apis/attend.apis";
import { toast } from "react-toastify";

type Student = {
    _id: number;
    displayName: string;
    present: boolean;
};

const initialStudents: Student[] = [
    { _id: 1, displayName: "Đỗ Phương", present: false },
    { _id: 2, displayName: "Đỗ Đăng Phương", present: false },
];


export default function page() {
    const [students, setStudents] = useState<Student[]>(initialStudents);
    const [attendanceData, setAttendanceData] = useState<any>(null);
    const [scheduleData, setScheduleData] = useState<any>(null);
    const [editMode, setEditMode] = useState(false);
    const param = useSearchParams();

    const courseId = param.get("courseId");
    const id = param.get("id");
    useEffect(() => {
        if (courseId && id) {
            fetchData(courseId, id);
        };
    }, [])
    const fetchData = async (id: string, id2: string) => {
        await fetchCoursesById(id).then((res) => {
            setStudents(res.data.student)
        })
        await fetchScheduleById(id2).then((res) => {
            setScheduleData(res.data);
        });
        await fetchAttendByScheduleId(id2).then((res) => {
            if (res.data && res.data.studentAttendance) {
                setAttendanceData(res.data);
                setStudents(prev => prev.map(s => {
                    const attend = res.data.studentAttendance.find((a: any) => a.studentId === s._id || a.studentId === String(s._id));
                    return attend ? { ...s, present: !!attend.isAttend } : s;
                }));
            }
        })
    };

    const toggleAttendance = (id: number) => {
        setStudents(prev =>
            prev.map((s: any) => (s._id === id ? { ...s, present: !s.present } : s))
        );
    };

    const handleSubmit = async () => {
        const result = students.map(s => ({ studentId: s._id, isAttend: !!s.present }));
        await createAttend(id, result).then((res) => {
            toast.success("Điểm danh thành công!");
        })

    };

    // Kiểm tra điều kiện cho phép chỉnh sửa (không quá 1 ngày)
    let canEdit = false;
    if (scheduleData && scheduleData.start) {
        const now = new Date();
        const startDate = new Date(scheduleData.start);
        const diffDays = (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
        canEdit = diffDays <= 2;
    }

    return (
        <div className="mx-auto mt-10 p-4">
            <Card className="shadow-xl rounded-2xl border border-gray-200">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <button
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2"
                            onClick={() => window.history.back()}
                        >
                            ← Quay lại
                        </button>
                        <h2 className="text-2xl font-semibold text-gray-800">
                            📋 Điểm danh học sinh
                        </h2>
                    </div>
                    <Separator className="mb-4" />
                    <div className="mb-2">
                        <span className="text-sm text-red-500 font-medium">
                            Lưu ý: Nếu quá 1 ngày kể từ thời điểm bắt đầu lịch học, bạn sẽ không thể chỉnh sửa lại điểm danh.
                        </span>
                    </div>
                    <ul className="space-y-3">
                        {students.map(student => (
                            <li
                                key={student._id}
                                className="flex items-center justify-between p-3 rounded-xl transition hover:bg-gray-50"
                            >
                                <div className="flex items-center gap-3">
                                    {(attendanceData && !editMode) ? null : (
                                        <Checkbox
                                            checked={student.present}
                                            onCheckedChange={() => toggleAttendance(student._id)}
                                            className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                                        />
                                    )}
                                    <span
                                        className={`text-lg ${student.present ? "text-green-600 font-medium" : "text-gray-700"
                                            }`}
                                    >
                                        {student.displayName}
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
                            👨‍🏫 Có mặt:{' '}
                            <strong className="text-green-600">
                                {students.filter(student => student.present).length}
                            </strong>{' '}
                            / {students.length}
                        </span>
                        {(attendanceData && !editMode) ? (
                            canEdit ? (
                                <Button
                                    onClick={() => setEditMode(true)}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full px-6"
                                >
                                    ✏️ Chỉnh sửa điểm danh
                                </Button>
                            ) : null
                        ) : (
                            <Button
                                onClick={handleSubmit}
                                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6"
                            >
                                ✅ Xác nhận điểm danh
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
