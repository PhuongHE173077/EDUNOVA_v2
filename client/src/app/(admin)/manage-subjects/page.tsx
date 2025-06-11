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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { 
    Plus, 
    Eye, 
    Pencil, 
    Trash2, 
    BookOpenIcon,
    SearchIcon,
    CheckCircleIcon,
    XCircleIcon,
    AlertTriangleIcon,
    InfoIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    FileTextIcon,
    ClockIcon
} from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { toast } from "react-toastify";

export default function Page() {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [filterId, setFilterId] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [viewSubject, setViewSubject] = useState<Subject | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; subject: Subject | null }>({
        show: false,
        subject: null
    });

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);

    // Custom toast functions với design đẹp
    const showSuccessToast = (message: string) => {
        toast.success(
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                </div>
                <span className="text-white font-medium">{message}</span>
            </div>,
            {
                icon: false,
                className: "!bg-gradient-to-r !from-green-500 !to-emerald-600 !text-white !border-none !rounded-xl !shadow-xl",
                progressClassName: "!bg-green-300",
                autoClose: 3000,
            }
        );
    };

    const showErrorToast = (message: string) => {
        toast.error(
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                    <XCircleIcon className="w-5 h-5 text-red-500" />
                </div>
                <span className="text-white font-medium">{message}</span>
            </div>,
            {
                icon: false,
                className: "!bg-gradient-to-r !from-red-500 !to-rose-600 !text-white !border-none !rounded-xl !shadow-xl",
                progressClassName: "!bg-red-300",
                autoClose: 4000,
            }
        );
    };

    useEffect(() => {
        const loadSubjects = async () => {
            try {
                const res = await fetchAllSubjects();
                setSubjects(res.data);
            } catch (error) {
                showErrorToast("Không thể lấy danh sách môn học");
            }
        };

        loadSubjects();
    }, []);

    const filteredSubjects = subjects.filter((subject) =>
        subject.id.toLowerCase().includes(filterId.toLowerCase()) ||
        subject.name.toLowerCase().includes(filterId.toLowerCase())
    );

    // Pagination calculations
    const totalPages = Math.ceil(filteredSubjects.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentSubjects = filteredSubjects.slice(startIndex, endIndex);

    const handleView = (subject: Subject) => {
        setViewSubject(subject);
    };

    const handleEdit = (id: string) => {
        console.log('Edit', id);
        // Add edit logic here
    };

    const handleDeleteClick = (subject: Subject) => {
        setDeleteConfirm({ show: true, subject });
    };

    const confirmDelete = async () => {
        if (!deleteConfirm.subject) return;
        
        setLoading(true);
        try {
            // Add your delete API call here
            // await deleteSubject(deleteConfirm.subject._id);
            showSuccessToast("Xóa môn học thành công!");
            setDeleteConfirm({ show: false, subject: null });
            // Refresh data
        } catch (error) {
            showErrorToast("Xóa môn học thất bại");
        } finally {
            setLoading(false);
        }
    };

    const renderPaginationButtons = () => {
        const buttons = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <Button
                    key={i}
                    variant={currentPage === i ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(i)}
                    className={`w-10 h-10 ${
                        currentPage === i 
                            ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg" 
                            : "hover:bg-blue-50 hover:border-blue-300"
                    }`}
                >
                    {i}
                </Button>
            );
        }

        return buttons;
    };

    // Statistics
    const totalCurriculums = subjects.reduce((total, subject) => total + (subject.curriculums?.length || 0), 0);
    const avgCurriculumsPerSubject = subjects.length > 0 ? Math.round(totalCurriculums / subjects.length) : 0;

    return (
        <TooltipProvider>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
                {/* Header với gradient đẹp */}
                <div className="mb-8">
                    <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700 rounded-2xl p-8 text-white shadow-2xl">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                    <BookOpenIcon className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-4xl font-bold mb-2">Quản lý môn học</h1>
                                    <p className="text-blue-100 text-lg">Quản lý và theo dõi tất cả môn học trong hệ thống</p>
                                </div>
                            </div>
                            <Button
                                onClick={() => console.log('Tạo mới')}
                                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                <Plus className="w-5 h-5 mr-2" />
                                Thêm môn học mới
                            </Button>
                        </div>
                        
                        {/* Statistics Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                <div className="flex items-center gap-3">
                                    <BookOpenIcon className="w-8 h-8 text-blue-200" />
                                    <div>
                                        <p className="text-blue-100 text-sm">Tổng môn học</p>
                                        <p className="text-white text-2xl font-bold">{subjects.length}</p>
                                        <p className="text-blue-200 text-xs">Trang {currentPage}/{totalPages || 1}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                <div className="flex items-center gap-3">
                                    <FileTextIcon className="w-8 h-8 text-green-200" />
                                    <div>
                                        <p className="text-blue-100 text-sm">Tổng chương trình</p>
                                        <p className="text-white text-2xl font-bold">{totalCurriculums}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                <div className="flex items-center gap-3">
                                    <ClockIcon className="w-8 h-8 text-yellow-200" />
                                    <div>
                                        <p className="text-blue-100 text-sm">Trung bình/môn</p>
                                        <p className="text-white text-2xl font-bold">{avgCurriculumsPerSubject}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                <div className="flex items-center gap-3">
                                    <SearchIcon className="w-8 h-8 text-purple-200" />
                                    <div>
                                        <p className="text-blue-100 text-sm">Kết quả tìm kiếm</p>
                                        <p className="text-white text-2xl font-bold">{filteredSubjects.length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                            <div className="flex items-center gap-4">
                                <SearchIcon className="w-6 h-6 text-white" />
                                <div className="flex-1">
                                    <label className='text-white font-medium mb-2 block'>Tìm kiếm môn học:</label>
                                    <Input
                                        placeholder="Nhập ID hoặc tên môn học..."
                                        value={filterId}
                                        onChange={(e) => {
                                            setFilterId(e.target.value);
                                            setCurrentPage(1); // Reset to first page when searching
                                        }}
                                        className="bg-white/20 border-white/30 text-white placeholder:text-white/70 h-12"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table với design sang trọng */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                            <BookOpenIcon className="w-6 h-6 text-blue-600" />
                            Danh sách môn học
                            <span className="text-sm font-normal text-gray-500">
                                ({currentSubjects.length} / {filteredSubjects.length})
                            </span>
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                                    <TableHead className="font-bold text-gray-700 py-4 min-w-[150px]">Mã môn học</TableHead>
                                    <TableHead className="font-bold text-gray-700 min-w-[200px]">Tên môn học</TableHead>
                                    <TableHead className="font-bold text-gray-700 min-w-[300px]">Mô tả</TableHead>
                                    <TableHead className="font-bold text-gray-700 text-center min-w-[150px]">Số buổi học</TableHead>
                                    <TableHead className="font-bold text-gray-700 text-center min-w-[120px]">Hành động</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentSubjects.length > 0 ? (
                                    currentSubjects.map((subject, index) => (
                                        <TableRow 
                                            key={subject.id}
                                            className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 border-b border-gray-100 ${
                                                (startIndex + index) % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                                            }`}
                                        >
                                            <TableCell className="py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
                                                        <span className="text-white font-bold text-sm">
                                                            {subject.id.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-blue-600">{subject.id}</p>
                                                        <p className="text-xs text-gray-500">ID: {subject._id?.slice(-6)}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <p className="font-semibold text-gray-900">{subject.name}</p>
                                            </TableCell>
                                            <TableCell>
                                                <div className="max-w-xs">
                                                    <p className="text-gray-700 text-sm leading-relaxed">
                                                        {subject.description.length > 60 
                                                            ? subject.description.substring(0, 60) + '...' 
                                                            : subject.description
                                                        }
                                                    </p>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <div className="bg-blue-50 px-3 py-1 rounded-full border border-blue-200 inline-block">
                                                    <span className="text-blue-700 font-bold text-sm">
                                                        {subject.curriculums?.length || 0} buổi
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => handleView(subject)}
                                                                className="text-gray-600 hover:text-white hover:bg-gray-600 border-gray-300 hover:border-gray-600 transition-all duration-200 shadow-md hover:shadow-lg"
                                                            >
                                                                <Eye className="w-4 h-4" />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Xem chi tiết</p>
                                                        </TooltipContent>
                                                    </Tooltip>

                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => handleEdit(subject.id)}
                                                                className="text-blue-600 hover:text-white hover:bg-blue-600 border-blue-300 hover:border-blue-600 transition-all duration-200 shadow-md hover:shadow-lg"
                                                            >
                                                                <Pencil className="w-4 h-4" />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Chỉnh sửa</p>
                                                        </TooltipContent>
                                                    </Tooltip>

                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => handleDeleteClick(subject)}
                                                                className="text-red-600 hover:text-white hover:bg-red-600 border-red-300 hover:border-red-600 transition-all duration-200 shadow-md hover:shadow-lg"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Xóa môn học</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-16">
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                                                    <BookOpenIcon className="w-12 h-12 text-gray-400" />
                                                </div>
                                                <div>
                                                    <p className="text-gray-500 font-medium text-lg">Không tìm thấy môn học nào</p>
                                                    <p className="text-gray-400 text-sm mt-1">
                                                        {filterId ? 'Thử thay đổi từ khóa tìm kiếm' : 'Hãy thêm môn học đầu tiên'}
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                {/* Pagination */}
                {filteredSubjects.length > 0 && totalPages > 1 && (
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 mt-6 p-6">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-700">
                                Hiển thị <span className="font-bold text-blue-600">{startIndex + 1}</span> đến{' '}
                                <span className="font-bold text-blue-600">{Math.min(endIndex, filteredSubjects.length)}</span> trong tổng số{' '}
                                <span className="font-bold text-blue-600">{filteredSubjects.length}</span> môn học
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="hover:bg-blue-50 hover:border-blue-300 disabled:opacity-50"
                                >
                                    <ChevronLeftIcon className="w-4 h-4 mr-1" />
                                    Trước
                                </Button>
                                
                                <div className="flex gap-1">
                                    {renderPaginationButtons()}
                                </div>
                                
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="hover:bg-blue-50 hover:border-blue-300 disabled:opacity-50"
                                >
                                    Sau
                                    <ChevronRightIcon className="w-4 h-4 ml-1" />
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* View Subject Dialog */}
                <Dialog open={!!viewSubject} onOpenChange={() => setViewSubject(null)}>
                    <DialogContent className="sm:max-w-3xl">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-3 text-2xl">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                                    <BookOpenIcon className="w-6 h-6 text-white" />
                                </div>
                                Chi tiết môn học
                            </DialogTitle>
                        </DialogHeader>
                        
                        {viewSubject && (
                            <div className="space-y-6 py-4">
                                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
                                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                                        <span className="text-white font-bold text-2xl">
                                            {viewSubject.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{viewSubject.name}</h3>
                                        <p className="text-purple-600 font-medium">Mã: {viewSubject.id}</p>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                                        <p className="text-blue-600 text-sm font-medium mb-1">Số buổi học</p>
                                        <p className="text-blue-900 text-lg font-bold">
                                            {viewSubject.curriculums?.length || 0} buổi
                                        </p>
                                    </div>
                                    
                                    <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                                        <p className="text-green-600 text-sm font-medium mb-1">Thời gian phân bổ</p>
                                        <p className="text-green-900 text-lg font-bold">
                                            {viewSubject.timeAllocation || 'Chưa xác định'}
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                    <p className="text-gray-600 text-sm font-medium mb-2">Mô tả môn học</p>
                                    <p className="text-gray-900 leading-relaxed">
                                        {viewSubject.description}
                                    </p>
                                </div>

                                {viewSubject.curriculums && viewSubject.curriculums.length > 0 && (
                                    <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                                        <p className="text-yellow-600 text-sm font-medium mb-3">Chương trình học</p>
                                        <div className="space-y-2 max-h-40 overflow-y-auto">
                                            {viewSubject.curriculums.map((curriculum, index) => (
                                                <div key={curriculum._id} className="bg-white p-3 rounded-lg border border-yellow-200">
                                                    <p className="font-medium text-gray-900">
                                                        Buổi {index + 1}: {curriculum.title}
                                                    </p>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        {curriculum.content}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setViewSubject(null)}
                                className="border-2 border-gray-300 hover:border-gray-400"
                            >
                                Đóng
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Delete Confirmation Dialog */}
                <Dialog open={deleteConfirm.show} onOpenChange={() => setDeleteConfirm({ show: false, subject: null })}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-3 text-xl">
                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                    <AlertTriangleIcon className="w-6 h-6 text-red-600" />
                                </div>
                                Xác nhận xóa môn học
                            </DialogTitle>
                        </DialogHeader>
                        
                        <div className="py-4">
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                                <p className="text-red-800 font-medium">
                                    Bạn có chắc chắn muốn xóa môn học này? Hành động này không thể hoàn tác.
                                </p>
                            </div>
                            
                            {deleteConfirm.subject && (
                                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                                            <span className="text-white font-bold">
                                                {deleteConfirm.subject.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{deleteConfirm.subject.name}</p>
                                            <p className="text-sm text-gray-600">Mã: {deleteConfirm.subject.id}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        <DialogFooter className="gap-3">
                            <Button
                                variant="outline"
                                onClick={() => setDeleteConfirm({ show: false, subject: null })}
                                className="border-2 border-gray-300 hover:border-gray-400"
                            >
                                Hủy bỏ
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={confirmDelete}
                                disabled={loading}
                                className="bg-red-500 hover:bg-red-600 font-medium"
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                                        Đang xóa...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircleIcon className="w-4 h-4 mr-2" />
                                        Xác nhận xóa
                                    </>
                                )}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </TooltipProvider>
    );
}
