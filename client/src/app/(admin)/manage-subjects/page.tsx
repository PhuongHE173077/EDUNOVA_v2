'use client';

import { fetchAllSubjects } from '@/apis/subject.apis';
import { Subject } from '@/types';
import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Eye, Pencil, Trash2 } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

export default function Page() {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [filterId, setFilterId] = useState<string>('');

    useEffect(() => {
        fetchAllSubjects().then((res) => {
            setSubjects(res.data);
        });
    }, []);

    const handleView = (id: string) => {
        console.log('View', id);
    };

    const handleEdit = (id: string) => {
        console.log('Edit', id);
    };

    const handleDelete = (id: string) => {
        console.log('Delete', id);
    };

    const filteredSubjects = subjects.filter((subject) =>
        subject.id.toLowerCase().includes(filterId.toLowerCase())
    );

    return (
        <TooltipProvider>
            <Card className="mt-6 mx-auto w-11/12  rounded-2xl border border-gray-200">
                <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <CardTitle className="text-2xl font-semibold">Danh sách môn học</CardTitle>
                    <div className="flex gap-2 items-center w-full sm:w-auto">
                        <Input
                            placeholder="Lọc theo ID..."
                            value={filterId}
                            onChange={(e) => setFilterId(e.target.value)}
                            className="w-full sm:w-[250px]"
                        />
                        <Button onClick={() => console.log('Tạo mới')}>
                            <Plus className="w-4 h-4 mr-2" />
                            Thêm môn học
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-auto rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="min-w-[150px]">ID</TableHead>
                                    <TableHead className="min-w-[200px]">Tên</TableHead>
                                    <TableHead className="min-w-[300px]">Mô tả</TableHead>
                                    <TableHead className="text-center min-w-[150px]">Số lượng buổi học</TableHead>
                                    <TableHead className="text-center min-w-[100px]">Hành động</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredSubjects.length > 0 ? (
                                    filteredSubjects.map((subject) => (
                                        <TableRow key={subject.id}>
                                            <TableCell>{subject.id}</TableCell>
                                            <TableCell>{subject.name}</TableCell>
                                            <TableCell>{subject.description.length > 40 ? subject.description.substring(0, 40) + '...' : subject.description.substring(0, 40)}</TableCell>
                                            <TableCell className="text-center">{subject.curriculums?.length || 0}</TableCell>
                                            <TableCell className="text-center">
                                                <div className="flex items-center justify-center gap-3">
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Eye
                                                                className="w-5 h-5 text-blue-600 hover:cursor-pointer hover:scale-110 transition-transform"
                                                                onClick={() => handleView(subject.id)}
                                                            />
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Xem</p>
                                                        </TooltipContent>
                                                    </Tooltip>

                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Pencil
                                                                className="w-5 h-5 text-yellow-600 hover:cursor-pointer hover:scale-110 transition-transform"
                                                                onClick={() => handleEdit(subject.id)}
                                                            />
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Chỉnh sửa</p>
                                                        </TooltipContent>
                                                    </Tooltip>

                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Trash2
                                                                className="w-5 h-5 text-red-600 hover:cursor-pointer hover:scale-110 transition-transform"
                                                                onClick={() => handleDelete(subject.id)}
                                                            />
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Xóa</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                                            Không tìm thấy môn học nào phù hợp.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </TooltipProvider>
    );
}
