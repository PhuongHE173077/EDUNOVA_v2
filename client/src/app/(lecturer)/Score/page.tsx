"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


interface StudentScore {
    _id: string;
    name: string;
    email: string;
    class: string;
    subject: string;
    semester: string;
    attendance?: number;
    midterm?: number;
    final?: number;
    average?: number;
}

const mockSemesters = [
    { id: "2024-1", name: "Summer25" },
    { id: "2024-2", name: "spring25" },
];

const mockStudents: StudentScore[] = [
    { _id: "s1", name: "Nguyễn Văn A", email: "a@student.com", class: "tienganh10-04", subject: "Toán", semester: "2024-1" },
    { _id: "s2", name: "Trần Thị B", email: "b@student.com", class: "tienganh10-04", subject: "Toán", semester: "2024-1" },
    { _id: "s3", name: "Lê Văn C", email: "c@student.com", class: "tienganh11-04", subject: "Anh văn", semester: "2024-1" },
    { _id: "s4", name: "Phạm Văn D", email: "d@student.com", class: "tienganh11-04", subject: "Toán", semester: "2024-1" },
];

// Lấy danh sách lớp duy nhất theo kỳ
const getClassesBySemester = (semesterId: string) => {
    return Array.from(new Set(mockStudents.filter(s => s.semester === semesterId).map(s => s.class)));
};

export default function ScorePage() {
    const [filterSemester, setFilterSemester] = useState(mockSemesters[0].id);

    const classes = getClassesBySemester(filterSemester);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">� Quản lý lớp học theo kỳ</h1>

            {/* Chọn kỳ */}
            <div className="flex gap-3 mb-4 items-center">
                <span className="font-semibold">Kỳ:</span>
                <select
                    value={filterSemester}
                    onChange={e => {
                        setFilterSemester(e.target.value);
                    }}
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                    {mockSemesters.map(sem => (
                        <option key={sem.id} value={sem.id}>{sem.name}</option>
                    ))}
                </select>
            </div>

            <div className="rounded-lg border bg-white shadow-sm p-4">
                <h2 className="text-lg font-semibold mb-2">Danh sách lớp của kỳ</h2>
                {classes.length === 0 ? (
                    <div className="text-gray-500 italic">Không có lớp nào trong kỳ này.</div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>STT</TableHead>
                                <TableHead>Tên lớp</TableHead>
                                <TableHead>Thao tác</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {classes.map((className, idx) => (
                                <TableRow key={className}>
                                    <TableCell>{idx + 1}</TableCell>
                                    <TableCell className="font-medium">{className}</TableCell>
                                    <TableCell>
                                        <Button variant="outline" size="sm">Chỉnh sửa</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        </div>
    );
}
