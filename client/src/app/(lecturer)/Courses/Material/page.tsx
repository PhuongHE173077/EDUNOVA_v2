'use client';
import React, { useState } from 'react';
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from '@/components/ui/tabs';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ArrowLeft, DownloadIcon, PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'mon' | 'gv'>('mon');

    const dataMon = [
        { stt: 1, content: 'Giáo trình Toán cao cấp', link: '#' },
        { stt: 2, content: 'Bài tập vật lý', link: '#' },
    ];
    const dataGiaoVien = [
        { stt: 1, content: 'Hướng dẫn chấm điểm', link: '#' },
        { stt: 2, content: 'Đề cương giảng dạy', link: '#' },
    ];

    const renderTable = (data: { stt: number; content: string; link: string }[]) => (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[50px] text-center">STT</TableHead>
                    <TableHead>Nội dung</TableHead>
                    <TableHead className="text-center">Tải xuống</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((item) => (
                    <TableRow key={item.stt}>
                        <TableCell className="text-center">{item.stt}</TableCell>
                        <TableCell>{item.content}</TableCell>
                        <TableCell className="text-center">
                            <a
                                href={item.link}
                                className="text-blue-600 hover:underline flex items-center justify-center gap-1"
                            >
                                <DownloadIcon className="w-4 h-4" /> Tải
                            </a>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );

    return (
        <div className="p-6">
            {/* Quay lại */}
            <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded border border-gray-300"
            >
                <ArrowLeft className="w-4 h-4" />
                Quay lại
            </button>

            <div className="p-6 max-w-4xl mx-auto">
                <Tabs
                    defaultValue="mon"
                    value={activeTab}
                    onValueChange={(val) => setActiveTab(val as 'mon' | 'gv')}
                    className="w-full"
                >
                    <div className="flex items-center justify-between mb-3">
                        <TabsList className="flex gap-4 bg-gray-100 rounded-lg p-2">
                            <TabsTrigger
                                value="mon"
                                className="px-4 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:shadow"
                            >
                                Tài liệu môn
                            </TabsTrigger>
                            <TabsTrigger
                                value="gv"
                                className="px-4 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:shadow"
                            >
                                Tài liệu giáo viên
                            </TabsTrigger>
                        </TabsList>
                        <Button
                            onClick={() => setDialogOpen(true)}
                            className="gap-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
                        >
                            <PlusCircle className="w-4 h-4" />
                            Thêm tài liệu
                        </Button>
                    </div>

                    <div className="border rounded-lg p-4 bg-white shadow">
                        <TabsContent value="mon">{renderTable(dataMon)}</TabsContent>
                        <TabsContent value="gv">{renderTable(dataGiaoVien)}</TabsContent>
                    </div>
                </Tabs>
            </div>

            {/* Dialog thêm tài liệu */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Thêm tài liệu {activeTab === 'mon' ? 'môn học' : 'giáo viên'}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-2">
                        <div className="grid gap-2">
                            <Label htmlFor="content">Nội dung</Label>
                            <Input id="content" placeholder="Nhập nội dung tài liệu..." />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="file">Tệp đính kèm</Label>
                            <Input id="file" type="file" />
                        </div>
                    </div>
                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button variant="outline">Hủy</Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            onClick={() => {
                                // Xử lý lưu tài liệu
                                setDialogOpen(false);
                            }}
                        >
                            Lưu
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
