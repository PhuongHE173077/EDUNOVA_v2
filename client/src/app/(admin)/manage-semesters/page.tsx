"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Semesters } from "@/types";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { 
  PlusIcon, 
  PencilIcon, 
  Trash2Icon, 
  EyeIcon,
  CalendarIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertTriangleIcon,
  InfoIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon
} from "lucide-react";
import SemesterFormModal from "./components/SemesterFormModal";
import {
  fetchSemesters,
  createSemester,
  updateSemester,
  deleteSemester,
} from "@/apis/semester.apis";
import { toast } from "react-toastify";

export default function ManageSemesterPage() {
  const [semesters, setSemesters] = useState<Semesters[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editSemester, setEditSemester] = useState<Semesters | null>(null);
  const [viewSemester, setViewSemester] = useState<Semesters | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; semester: Semesters | null }>({
    show: false,
    semester: null
  });
  const [loading, setLoading] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  // Pagination calculations
  const totalPages = Math.ceil(semesters.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSemesters = semesters.slice(startIndex, endIndex);

  const searchParams = useSearchParams();
  const shouldOpenCreate = searchParams.get("create") === "true";

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

  const loadSemesters = async () => {
    try {
      const res = await fetchSemesters();
      const parsed = res.data.map((s: any) => ({
        ...s,
        startDate: new Date(s.startDate),
        endDate: new Date(s.endDate),
      }));
      setSemesters(parsed);
    } catch (err) {
      showErrorToast("Lỗi khi tải danh sách học kỳ");
    }
  };

  useEffect(() => {
    loadSemesters();
  }, []);

  useEffect(() => {
    if (shouldOpenCreate) {
      setFormOpen(true);
      setEditSemester(null);
    }
  }, [shouldOpenCreate]);

  const handleSubmit = async (data: Partial<Semesters>) => {
    setLoading(true);
    try {
      if (editSemester) {
        await updateSemester(editSemester._id.toString(), data);
        showSuccessToast("Cập nhật học kỳ thành công!");
      } else {
        await createSemester(data);
        showSuccessToast("Tạo học kỳ mới thành công!");
      }

      await loadSemesters();
      setFormOpen(false);
      setEditSemester(null);
    } catch (error) {
      showErrorToast("Lỗi khi tạo hoặc cập nhật học kỳ");
      console.error("Lỗi khi tạo/cập nhật học kỳ:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (semester: Semesters) => {
    setDeleteConfirm({ show: true, semester });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm.semester) return;
    
    setLoading(true);
    try {
      await deleteSemester(deleteConfirm.semester._id.toString());
      showSuccessToast("Xóa học kỳ thành công!");
      setDeleteConfirm({ show: false, semester: null });
      await loadSemesters();
      
      // Điều chỉnh trang hiện tại nếu cần
      const newTotalPages = Math.ceil((semesters.length - 1) / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    } catch (err) {
      showErrorToast("Lỗi khi xóa học kỳ");
      console.error("Lỗi khi xóa học kỳ:", err);
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

  // Thống kê học kỳ
  const currentDate = new Date();
  const activeSemesters = semesters.filter(s => 
    new Date(s.startDate) <= currentDate && new Date(s.endDate) >= currentDate
  ).length;
  const upcomingSemesters = semesters.filter(s => 
    new Date(s.startDate) > currentDate
  ).length;
  const pastSemesters = semesters.filter(s => 
    new Date(s.endDate) < currentDate
  ).length;

  const getSemesterStatus = (semester: Semesters) => {
    const now = new Date();
    const start = new Date(semester.startDate);
    const end = new Date(semester.endDate);

    if (now < start) {
      return { status: 'upcoming', text: 'Sắp diễn ra', color: 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' };
    } else if (now >= start && now <= end) {
      return { status: 'active', text: 'Đang diễn ra', color: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' };
    } else {
      return { status: 'past', text: 'Đã kết thúc', color: 'bg-gradient-to-r from-gray-500 to-slate-600 text-white' };
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircleIcon className="w-4 h-4" />;
      case 'upcoming': return <ClockIcon className="w-4 h-4" />;
      default: return <XCircleIcon className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      {/* Header với gradient đẹp */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 rounded-2xl p-8 text-white shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <CalendarDaysIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Quản lý học kỳ</h1>
                <p className="text-blue-100 text-lg">Quản lý và theo dõi tất cả học kỳ trong hệ thống</p>
              </div>
            </div>
            <Button
              onClick={() => {
                setEditSemester(null);
                setFormOpen(false);
                setTimeout(() => setFormOpen(true), 0);
              }}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Tạo học kỳ mới
            </Button>
          </div>
          
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <CalendarIcon className="w-8 h-8 text-blue-200" />
                <div>
                  <p className="text-blue-100 text-sm">Tổng học kỳ</p>
                  <p className="text-white text-2xl font-bold">{semesters.length}</p>
                  <p className="text-blue-200 text-xs">Trang {currentPage}/{totalPages || 1}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <CheckCircleIcon className="w-8 h-8 text-green-200" />
                <div>
                  <p className="text-blue-100 text-sm">Đang diễn ra</p>
                  <p className="text-white text-2xl font-bold">{activeSemesters}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <ClockIcon className="w-8 h-8 text-yellow-200" />
                <div>
                  <p className="text-blue-100 text-sm">Sắp diễn ra</p>
                  <p className="text-white text-2xl font-bold">{upcomingSemesters}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <XCircleIcon className="w-8 h-8 text-gray-200" />
                <div>
                  <p className="text-blue-100 text-sm">Đã kết thúc</p>
                  <p className="text-white text-2xl font-bold">{pastSemesters}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table với design sang trọng */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <CalendarDaysIcon className="w-6 h-6 text-blue-600" />
            Danh sách học kỳ
            <span className="text-sm font-normal text-gray-500">
              ({currentSemesters.length} / {semesters.length})
            </span>
          </h2>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                <TableHead className="font-bold text-gray-700 py-4">Tên học kỳ</TableHead>
                <TableHead className="font-bold text-gray-700">Ngày bắt đầu</TableHead>
                <TableHead className="font-bold text-gray-700">Ngày kết thúc</TableHead>
                <TableHead className="font-bold text-gray-700">Thời gian</TableHead>
                <TableHead className="font-bold text-gray-700">Trạng thái</TableHead>
                <TableHead className="font-bold text-gray-700 text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentSemesters.map((s, index) => {
                const semesterStatus = getSemesterStatus(s);
                const duration = Math.ceil((new Date(s.endDate).getTime() - new Date(s.startDate).getTime()) / (1000 * 60 * 60 * 24));
                
                return (
                  <TableRow 
                    key={s._id.toString()}
                    className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 border-b border-gray-100 ${
                      (startIndex + index) % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                    }`}
                  >
                    <TableCell className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center shadow-md">
                          <span className="text-white font-bold text-lg">
                            {s.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{s.name}</p>
                          <p className="text-sm text-gray-500">ID: {s._id.toString().slice(-6)}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-green-500" />
                        <span className="font-medium text-gray-900">
                          {new Date(s.startDate).toLocaleDateString("vi-VN")}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-red-500" />
                        <span className="font-medium text-gray-900">
                          {new Date(s.endDate).toLocaleDateString("vi-VN")}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                        <span className="text-blue-700 font-medium text-sm">
                          {duration} ngày
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium shadow-md ${semesterStatus.color}`}>
                        {getStatusIcon(semesterStatus.status)}
                        {semesterStatus.text}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => setViewSemester(s)}
                          className="text-gray-600 hover:text-white hover:bg-gray-600 border-gray-300 hover:border-gray-600 transition-all duration-200 shadow-md hover:shadow-lg"
                          title="Xem chi tiết"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditSemester(s);
                            setFormOpen(true);
                          }}
                          className="text-blue-600 hover:text-white hover:bg-blue-600 border-blue-300 hover:border-blue-600 transition-all duration-200 shadow-md hover:shadow-lg"
                          title="Chỉnh sửa"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteClick(s)}
                          className="text-red-600 hover:text-white hover:bg-red-600 border-red-300 hover:border-red-600 transition-all duration-200 shadow-md hover:shadow-lg"
                          title="Xóa học kỳ"
                        >
                          <Trash2Icon className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {semesters.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarDaysIcon className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium text-lg">Chưa có học kỳ nào</p>
              <p className="text-gray-400 text-sm mt-1">Hãy tạo học kỳ đầu tiên của bạn</p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {semesters.length > 0 && totalPages > 1 && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 mt-6 p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Hiển thị <span className="font-bold text-blue-600">{startIndex + 1}</span> đến{' '}
              <span className="font-bold text-blue-600">{Math.min(endIndex, semesters.length)}</span> trong tổng số{' '}
              <span className="font-bold text-blue-600">{semesters.length}</span> học kỳ
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

      {/* Modals */}
      <SemesterFormModal
        key={editSemester?._id?.toString() || "new"}
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditSemester(null);
        }}
        initial={editSemester || undefined}
        onSubmit={handleSubmit}
      />

      {/* View Semester Dialog */}
      <Dialog open={!!viewSemester} onOpenChange={() => setViewSemester(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center">
                <CalendarDaysIcon className="w-6 h-6 text-white" />
              </div>
              Chi tiết học kỳ
            </DialogTitle>
          </DialogHeader>
          
          {viewSemester && (
            <div className="space-y-6 py-4">
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border border-teal-200">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-2xl">
                    {viewSemester.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{viewSemester.name}</h3>
                  <p className="text-teal-600 font-medium">Học kỳ {viewSemester._id.toString().slice(-6)}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <p className="text-green-600 text-sm font-medium mb-1">Ngày bắt đầu</p>
                  <p className="text-green-900 text-lg font-bold flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5" />
                    {new Date(viewSemester.startDate).toLocaleDateString("vi-VN")}
                  </p>
                </div>
                
                <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                  <p className="text-red-600 text-sm font-medium mb-1">Ngày kết thúc</p>
                  <p className="text-red-900 text-lg font-bold flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5" />
                    {new Date(viewSemester.endDate).toLocaleDateString("vi-VN")}
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <p className="text-blue-600 text-sm font-medium mb-1">Thời gian</p>
                <p className="text-blue-900 text-lg font-bold">
                  {Math.ceil((new Date(viewSemester.endDate).getTime() - new Date(viewSemester.startDate).getTime()) / (1000 * 60 * 60 * 24))} ngày
                </p>
              </div>

              <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                <p className="text-purple-600 text-sm font-medium mb-1">Trạng thái</p>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getSemesterStatus(viewSemester).color}`}>
                  {getStatusIcon(getSemesterStatus(viewSemester).status)}
                  {getSemesterStatus(viewSemester).text}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setViewSemester(null)}
              className="border-2 border-gray-300 hover:border-gray-400"
            >
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirm.show} onOpenChange={() => setDeleteConfirm({ show: false, semester: null })}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-xl">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangleIcon className="w-6 h-6 text-red-600" />
              </div>
              Xác nhận xóa học kỳ
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-800 font-medium">
                Bạn có chắc chắn muốn xóa học kỳ này? Hành động này không thể hoàn tác.
              </p>
            </div>
            
            {deleteConfirm.semester && (
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">
                      {deleteConfirm.semester.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{deleteConfirm.semester.name}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(deleteConfirm.semester.startDate).toLocaleDateString("vi-VN")} - {new Date(deleteConfirm.semester.endDate).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter className="gap-3">
            <Button
              variant="outline"
              onClick={() => setDeleteConfirm({ show: false, semester: null })}
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
  );
}
