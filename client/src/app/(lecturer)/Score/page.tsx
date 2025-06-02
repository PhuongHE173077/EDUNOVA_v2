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
    attendance?: number;
    midterm?: number;
    final?: number;
    average?: number;
}

const mockStudents: StudentScore[] = [
    { _id: "s1", name: "Nguyễn Văn A", email: "a@student.com", class: "10A1", subject: "Toán" },
    { _id: "s2", name: "Trần Thị B", email: "b@student.com", class: "10A1", subject: "Toán" },
    { _id: "s3", name: "Lê Văn C", email: "c@student.com", class: "10A2", subject: "Anh văn" },
];

export default function ScorePage() {
    const [students, setStudents] = useState<StudentScore[]>(mockStudents);
    const [search, setSearch] = useState("");
    const [filterClass, setFilterClass] = useState("Tất cả");
    const [filterSubject, setFilterSubject] = useState("Tất cả");

    const classes = ["Tất cả", ...new Set(mockStudents.map(s => s.class))];
    const subjects = ["Tất cả", ...new Set(mockStudents.map(s => s.subject))];

    const handleScoreChange = (id: string, field: keyof StudentScore, value: string) => {
        const numeric = parseFloat(value);
        if (isNaN(numeric) || numeric < 0 || numeric > 10) return;
        setStudents(prev =>
            prev.map(s => s._id === id
                ? {
                    ...s,
                    [field]: isNaN(numeric) ? undefined : numeric,
                    average: calcAvg(
                        field === "attendance" ? numeric : s.attendance,
                        field === "midterm" ? numeric : s.midterm,
                        field === "final" ? numeric : s.final
                    )
                }
                : s
            )
        );
    };

    const calcAvg = (att?: number, mid?: number, fin?: number) => {
        if (att == null || mid == null || fin == null) return undefined;
        return Math.round((att * 0.1 + mid * 0.4 + fin * 0.5) * 10) / 10;
    };

    const filtered = students.filter(s =>
        (filterClass === "Tất cả" || s.class === filterClass) &&
        (filterSubject === "Tất cả" || s.subject === filterSubject) &&
        `${s.name} ${s.email}`.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">📊 Quản lý điểm học sinh</h1>

            <div className="flex flex-wrap gap-3 mb-4">
                <Input
                    placeholder="Tìm kiếm học sinh..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-60"
                />
                <select
                    value={filterClass}
                    onChange={(e) => setFilterClass(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                    {classes.map(c => <option key={c}>{c}</option>)}
                </select>
                <select
                    value={filterSubject}
                    onChange={(e) => setFilterSubject(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                    {subjects.map(s => <option key={s}>{s}</option>)}
                </select>
            </div>

            <div className="rounded-lg border overflow-x-auto bg-white shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>STT</TableHead>
                            <TableHead>Họ và tên</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Chuyên cần</TableHead>
                            <TableHead>Giữa kỳ</TableHead>
                            <TableHead>Cuối kỳ</TableHead>
                            <TableHead>Trung bình</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.map((s, i) => (
                            <TableRow key={s._id}>
                                <TableCell>{i + 1}</TableCell>
                                <TableCell>{s.name}</TableCell>
                                <TableCell className="text-gray-500 text-sm">{s.email}</TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        min={0}
                                        max={10}
                                        value={s.attendance ?? ""}
                                        onChange={(e) => handleScoreChange(s._id, "attendance", e.target.value)}
                                        className="w-20"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        min={0}
                                        max={10}
                                        value={s.midterm ?? ""}
                                        onChange={(e) => handleScoreChange(s._id, "midterm", e.target.value)}
                                        className="w-20"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        min={0}
                                        max={10}
                                        value={s.final ?? ""}
                                        onChange={(e) => handleScoreChange(s._id, "final", e.target.value)}
                                        className="w-20"
                                    />
                                </TableCell>
                                <TableCell className="font-medium text-indigo-600 text-center">
                                    {s.average ?? "-"}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="mt-3 text-sm text-gray-500 italic">
                🎯 Ghi chú: Trung bình = (Chuyên cần × 10%) + (Giữa kỳ × 40%) + (Cuối kỳ × 50%)
            </div>
        </div>
    );
}
