'use client'
import { fetchCourseBySemesterId, fetchCourseBySemesterIdAndSubjectId } from '@/apis/course.apis'
import { fetchSemesters } from '@/apis/other.apis'
import { fetchCurrentSemester } from '@/apis/semester.apis'
import { Loading } from '@/components/ui/loading'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Semesters } from '@/types'
import { FormLabel } from '@mui/material'
import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { 
  ClipboardPlus, 
  Pencil, 
  Trash2, 
  CalendarIcon,
  BookOpenIcon,
  UsersIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertTriangleIcon,
  InfoIcon,
  ClockIcon,
  GraduationCapIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from "lucide-react";
import ScheduleDialog from './components/DialogCreate'
import { toast } from "react-toastify";

export default function page() {
    const [currentSemester, setCurrentSemester] = useState<Semesters>()
    const [semesters, setSemesters] = useState<Semesters[]>([])
    const [loading, setLoading] = useState(true)
    const [courses, setCourses] = useState<any[]>([])
    const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; course: any | null }>({
        show: false,
        course: null
    });

    const [openDialogCreate, setOpenDialogCreate] = useState(false);
    const [activeCourse, setActiveCourse] = useState<any>(null);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);

    // Pagination calculations
    const totalPages = Math.ceil(courses.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentCourses = courses.slice(startIndex, endIndex);

    // Custom toast functions
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
        const fetchData = async () => {
            try {
                const [semRes, curSemRes] = await Promise.all([
                    fetchSemesters(),
                    fetchCurrentSemester(),
                ])
                setSemesters(semRes.data)
                setCurrentSemester(curSemRes.data)
            } catch (err) {
                console.error("Error fetching data:", err)
                showErrorToast("Không thể lấy dữ liệu học kỳ");
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    useEffect(() => {
        fetchData()
    }, [currentSemester])

    const fetchData = async () => {
        if (currentSemester) {
            try {
                const res = await fetchCourseBySemesterId(currentSemester._id);
                setCourses(res.data);
            } catch (err) {
                showErrorToast("Không thể lấy danh sách lớp học");
            }
        }
    }

    const handleDeleteClick = (course: any) => {
        setDeleteConfirm({ show: true, course });
    };

    const confirmDelete = async () => {
        if (!deleteConfirm.course) return;
        
        try {
            // Add your delete API call here
            // await deleteCourse(deleteConfirm.course._id);
            showSuccessToast("Xóa lớp học thành công!");
            setDeleteConfirm({ show: false, course: null });
            fetchData(); // Refresh data
        } catch (error) {
            showErrorToast("Xóa lớp học thất bại");
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-gradient-to-r from-green-500 to-emerald-600 text-white';
            case 'pending': return 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white';
            default: return 'bg-gradient-to-r from-red-500 to-rose-600 text-white';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'active': return 'Đã tạo';
            case 'pending': return 'Chưa tạo';
            default: return 'Đã đóng';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active': return <CheckCircleIcon className="w-4 h-4" />;
            case 'pending': return <ClockIcon className="w-4 h-4" />;
            default: return <XCircleIcon className="w-4 h-4" />;
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
    const activeCourses = courses.filter(c => c.status === 'active').length;
    const pendingCourses = courses.filter(c => c.status === 'pending').length;
    const totalStudents = courses.reduce((total, course) => total + (course.student?.length || 0), 0);

    if (loading) return <div className='max-h-[70vh]'><Loading /></div>

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
            {/* Header với gradient đẹp */}
            <div className="mb-8">
                <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-700 rounded-2xl p-8 text-white shadow-2xl">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                <CalendarIcon className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold mb-2">Quản lý lịch học</h1>
                                <p className="text-blue-100 text-lg">Quản lý và theo dõi lịch học của tất cả lớp</p>
                            </div>
                        </div>
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                            <div className="flex items-center gap-3">
                                <BookOpenIcon className="w-8 h-8 text-blue-200" />
                                <div>
                                    <p className="text-blue-100 text-sm">Tổng lớp học</p>
                                    <p className="text-white text-2xl font-bold">{courses.length}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                            <div className="flex items-center gap-3">
                                <CheckCircleIcon className="w-8 h-8 text-green-200" />
                                <div>
                                    <p className="text-blue-100 text-sm">Đã tạo lịch</p>
                                    <p className="text-white text-2xl font-bold">{activeCourses}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                            <div className="flex items-center gap-3">
                                <ClockIcon className="w-8 h-8 text-yellow-200" />
                                <div>
                                    <p className="text-blue-100 text-sm">Chưa tạo lịch</p>
                                    <p className="text-white text-2xl font-bold">{pendingCourses}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                            <div className="flex items-center gap-3">
                                <UsersIcon className="w-8 h-8 text-purple-200" />
                                <div>
                                    <p className="text-blue-100 text-sm">Tổng học sinh</p>
                                    <p className="text-white text-2xl font-bold">{totalStudents}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Semester Selector */}
                    <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                        <div className="flex items-center gap-4">
                            <GraduationCapIcon className="w-6 h-6 text-white" />
                            <div className="flex-1">
                                <FormLabel className='text-white font-medium mb-2 block'>Chọn học kỳ:</FormLabel>
                                <Select
                                    value={currentSemester?._id.toString()}
                                    onValueChange={(value) => {
                                        const selected = semesters.find((sem) => sem._id === value)
                                        if (selected) setCurrentSemester(selected)
                                    }}
                                >
                                    <SelectTrigger className="bg-white/20 border-white/30 text-white placeholder:text-white/70 h-12">
                                        <SelectValue placeholder="Chọn học kỳ" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {semesters.slice().reverse().map((semester) => (
                                            <SelectItem key={semester._id.toString()} value={semester._id.toString()}>
                                                {semester.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
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
                        Danh sách lớp học
                        <span className="text-sm font-normal text-gray-500">
                            ({currentCourses.length} / {courses.length})
                        </span>
                    </h2>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                                <TableHead className="font-bold text-gray-700 py-4">Mã lớp</TableHead>
                                <TableHead className="font-bold text-gray-700">Giáo viên</TableHead>
                                <TableHead className="font-bold text-gray-700">Môn học</TableHead>
                                <TableHead className="font-bold text-gray-700">Học kỳ</TableHead>
                                <TableHead className="font-bold text-gray-700">Trạng thái</TableHead>
                                <TableHead className="font-bold text-gray-700 text-right">Chức năng</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentCourses.map((course, index) => (
                                <TableRow 
                                    key={course._id}
                                    className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 border-b border-gray-100 ${
                                        (startIndex + index) % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                                    }`}
                                >
                                    <TableCell className="font-bold text-blue-600 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            {course.id}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                                                <span className="text-white font-bold text-xs">
                                                    {course.lecturer?.displayName?.charAt(0).toUpperCase() || 'N'}
                                                </span>
                                            </div>
                                            <span className="font-medium text-gray-900">
                                                {course.lecturer?.displayName || "N/A"}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium text-gray-900">
                                        {course.subject?.name || "N/A"}
                                    </TableCell>
                                    <TableCell className="text-gray-700">
                                        {course.semester?.name || "N/A"}
                                    </TableCell>
                                    <TableCell>
                                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium shadow-md ${getStatusColor(course.status)}`}>
                                            {getStatusIcon(course.status)}
                                            {getStatusText(course.status)}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex gap-2 justify-end">
                                            {course.status === "pending" && (
                                                <Button 
                                                    size="sm" 
                                                    variant="outline" 
                                                    onClick={() => { 
                                                        setOpenDialogCreate(true); 
                                                        setActiveCourse(course) 
                                                    }}
                                                    className="text-green-600 hover:text-white hover:bg-green-600 border-green-300 hover:border-green-600 transition-all duration-200 shadow-md hover:shadow-lg"
                                                    title="Tạo lịch học"
                                                >
                                                    <ClipboardPlus className="w-4 h-4" />
                                                </Button>
                                            )}

                                            {course.status === "active" && (
                                                <Button 
                                                    size="sm" 
                                                    variant="outline"
                                                    className="text-blue-600 hover:text-white hover:bg-blue-600 border-blue-300 hover:border-blue-600 transition-all duration-200 shadow-md hover:shadow-lg"
                                                    title="Chỉnh sửa lịch"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </Button>
                                            )}

                                            <Button 
                                                size="sm" 
                                                variant="outline"
                                                onClick={() => handleDeleteClick(course)}
                                                className="text-red-600 hover:text-white hover:bg-red-600 border-red-300 hover:border-red-600 transition-all duration-200 shadow-md hover:shadow-lg"
                                                title="Xóa lớp học"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {courses.length === 0 && (
                        <div className="text-center py-16">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CalendarIcon className="w-12 h-12 text-gray-400" />
                            </div>
                            <p className="text-gray-500 font-medium text-lg">Chưa có lớp học nào</p>
                            <p className="text-gray-400 text-sm mt-1">Hãy chọn học kỳ khác hoặc tạo lớp học mới</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Pagination */}
            {courses.length > 0 && totalPages > 1 && (
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 mt-6 p-6">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Hiển thị <span className="font-bold text-blue-600">{startIndex + 1}</span> đến{' '}
                            <span className="font-bold text-blue-600">{Math.min(endIndex, courses.length)}</span> trong tổng số{' '}
                            <span className="font-bold text-blue-600">{courses.length}</span> lớp học
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

            {/* Dialogs */}
            <ScheduleDialog 
                open={openDialogCreate} 
                setOpen={setOpenDialogCreate} 
                course={activeCourse} 
                fetchData={fetchData} 
            />

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteConfirm.show} onOpenChange={() => setDeleteConfirm({ show: false, course: null })}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-3 text-xl">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                <AlertTriangleIcon className="w-6 h-6 text-red-600" />
                            </div>
                            Xác nhận xóa lớp học
                        </DialogTitle>
                    </DialogHeader>
                    
                    <div className="py-4">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                            <p className="text-red-800 font-medium">
                                Bạn có chắc chắn muốn xóa lớp học này? Hành động này không thể hoàn tác.
                            </p>
                        </div>
                        
                        {deleteConfirm.course && (
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                                        <BookOpenIcon className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{deleteConfirm.course.id}</p>
                                        <p className="text-sm text-gray-600">{deleteConfirm.course.subject?.name}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <DialogFooter className="gap-3">
                        <Button
                            variant="outline"
                            onClick={() => setDeleteConfirm({ show: false, course: null })}
                            className="border-2 border-gray-300 hover:border-gray-400"
                        >
                            Hủy bỏ
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={confirmDelete}
                            className="bg-red-500 hover:bg-red-600 font-medium"
                        >
                            <CheckCircleIcon className="w-4 h-4 mr-2" />
                            Xác nhận xóa
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
