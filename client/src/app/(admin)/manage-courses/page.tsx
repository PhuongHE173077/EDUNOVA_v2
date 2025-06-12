"use client";

import { useEffect, useState } from "react";
import { Course, User, Subject, Semesters } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  PencilIcon, 
  Trash2Icon, 
  EyeIcon, 
  PlusIcon, 
  UserPlusIcon,
  CheckCircleIcon,
  XCircleIcon,
  InfoIcon,
  AlertTriangleIcon,
  BookOpenIcon,
  UsersIcon,
  CalendarIcon,
  GraduationCapIcon
} from "lucide-react";
import CourseFormModal from "./components/CourseFormModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {
  fetchCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  fetchCoursesById,
} from "@/apis/course.apis";
import {
  fetchLecturers,
  fetchSubjects,
  fetchSemesters,
} from "@/apis/other.apis";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ManageCoursePage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [lecturers, setLecturers] = useState<User[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [semesters, setSemesters] = useState<Semesters[]>([]);

  const [formOpen, setFormOpen] = useState(false);
  const [editCourse, setEditCourse] = useState<Course | null>(null);
  const [viewCourse, setViewCourse] = useState<Course | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; course: Course | null }>({
    show: false,
    course: null
  });
  const [loading, setLoading] = useState(false);

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

  const showInfoToast = (message: string) => {
    toast.info(
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
          <InfoIcon className="w-5 h-5 text-blue-500" />
        </div>
        <span className="text-white font-medium">{message}</span>
      </div>,
      {
        icon: false,
        className: "!bg-gradient-to-r !from-blue-500 !to-indigo-600 !text-white !border-none !rounded-xl !shadow-xl",
        progressClassName: "!bg-blue-300",
        autoClose: 3000,
      }
    );
  };

  useEffect(() => {
    fetchCourses()
      .then((res) => setCourses(res.data))
      .catch(() => showErrorToast("Không thể lấy danh sách khóa học"));

    fetchLecturers()
      .then((res) => setLecturers(res.data))
      .catch(() => showErrorToast("Không thể lấy danh sách giảng viên"));

    fetchSubjects()
      .then((res) => setSubjects(res.data))
      .catch(() => showErrorToast("Không thể lấy danh sách môn học"));

    fetchSemesters()
      .then((res) => setSemesters(res.data))
      .catch(() => showErrorToast("Không thể lấy danh sách học kỳ"));
  }, []);

  const handleEditClick = (course: Course) => {
    setEditCourse(course);
    setFormOpen(true);
  };

  const handleAddStudents = (courseId: string) => {
    router.push(`/manage-courses/${courseId}/add-students`);
  };

  const handleSubmit = async (data: Partial<Course>) => {
    setLoading(true);
    try {
      if (editCourse) {
        await updateCourse(editCourse._id!, data);
        const res = await fetchCoursesById(editCourse._id!);
        setCourses((prev) =>
          prev.map((c) => (c._id === editCourse._id ? res.data : c))
        );
        showSuccessToast("Cập nhật khóa học thành công!");
      } else {
        const res = await createCourse(data);
        setCourses((prev) => [...prev, res.data]);
        showSuccessToast("Tạo khóa học thành công!");
      }
      setFormOpen(false);
      setEditCourse(null);
    } catch {
      showErrorToast("Có lỗi xảy ra khi lưu khóa học");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (course: Course) => {
    setDeleteConfirm({ show: true, course });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm.course) return;
    
    setLoading(true);
    try {
      await deleteCourse(deleteConfirm.course._id!);
      setCourses((prev) => prev.filter((c) => c._id !== deleteConfirm.course!._id));
      showSuccessToast("Xóa khóa học thành công!");
      setDeleteConfirm({ show: false, course: null });
    } catch {
      showErrorToast("Xóa khóa học thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      {/* Header với gradient đẹp */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <GraduationCapIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Quản lý khóa học</h1>
                <p className="text-blue-100 text-lg">Quản lý và theo dõi tất cả khóa học trong hệ thống</p>
              </div>
            </div>
            <Button
              onClick={() => {
                setFormOpen(true);
                setEditCourse(null);
              }}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Tạo khóa học mới
            </Button>
          </div>
          
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <BookOpenIcon className="w-8 h-8 text-blue-200" />
                <div>
                  <p className="text-blue-100 text-sm">Tổng khóa học</p>
                  <p className="text-white text-2xl font-bold">{courses.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <UsersIcon className="w-8 h-8 text-green-200" />
                <div>
                  <p className="text-blue-100 text-sm">Khóa học hoạt động</p>
                  <p className="text-white text-2xl font-bold">
                    {courses.filter(c => c.status === 'active').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <CalendarIcon className="w-8 h-8 text-yellow-200" />
                <div>
                  <p className="text-blue-100 text-sm">Tổng học sinh</p>
                  <p className="text-white text-2xl font-bold">
                    {courses.reduce((total, course) => total + (course.student?.length || 0), 0)}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <GraduationCapIcon className="w-8 h-8 text-purple-200" />
                <div>
                  <p className="text-blue-100 text-sm">Giảng viên</p>
                  <p className="text-white text-2xl font-bold">{lecturers.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table với design sang trọng */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                <TableHead className="font-bold text-gray-700 py-4">Mã lớp</TableHead>
                <TableHead className="font-bold text-gray-700">Môn học</TableHead>
                <TableHead className="font-bold text-gray-700">Giảng viên</TableHead>
                <TableHead className="font-bold text-gray-700">Học kỳ</TableHead>
                <TableHead className="font-bold text-gray-700">Số học sinh</TableHead>
                <TableHead className="font-bold text-gray-700">Thời gian</TableHead>
                <TableHead className="font-bold text-gray-700">Trạng thái</TableHead>
                <TableHead className="font-bold text-gray-700 text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((c, index) => (
                <TableRow 
                  key={c._id} 
                  className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 border-b border-gray-100 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                  }`}
                >
                  <TableCell className="font-bold text-blue-600 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {c.id || ""}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-gray-900">{c.subject?.name || ""}</TableCell>
                  <TableCell className="text-gray-700">{c.lecturer?.displayName || ""}</TableCell>
                  <TableCell className="text-gray-700">{c.semester?.name || ""}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                        <UsersIcon className="w-3 h-3 inline mr-1" />
                        {c.student?.length || 0}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-700">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm">
                        {c.startDate?.slice(0, 10) || "Chưa có"}
                      </span>
                      {c.endDate && (
                        <span className="text-xs text-gray-500">
                          → {c.endDate.slice(0, 10)}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium shadow-md ${
                        c.status === "active" 
                          ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white" 
                          : "bg-gradient-to-r from-red-500 to-rose-600 text-white"
                      }`}
                    >
                      {c.status === "active" ? "Hoạt động" : "Tạm khóa"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAddStudents(c._id!)}
                        className="text-blue-600 hover:text-white hover:bg-blue-600 border-blue-300 hover:border-blue-600 transition-all duration-200 shadow-md hover:shadow-lg"
                        title="Thêm học sinh"
                      >
                        <UserPlusIcon className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setViewCourse(c)}
                        className="text-gray-600 hover:text-white hover:bg-gray-600 border-gray-300 hover:border-gray-600 transition-all duration-200 shadow-md hover:shadow-lg"
                        title="Xem chi tiết"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditClick(c)}
                        className="text-green-600 hover:text-white hover:bg-green-600 border-green-300 hover:border-green-600 transition-all duration-200 shadow-md hover:shadow-lg"
                        title="Chỉnh sửa"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteClick(c)}
                        className="text-red-600 hover:text-white hover:bg-red-600 border-red-300 hover:border-red-600 transition-all duration-200 shadow-md hover:shadow-lg"
                        title="Xóa khóa học"
                      >
                        <Trash2Icon className="w-4 h-4" />
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
                <BookOpenIcon className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium text-lg">Chưa có khóa học nào</p>
              <p className="text-gray-400 text-sm mt-1">Hãy tạo khóa học đầu tiên của bạn</p>
            </div>
          )}
        </div>
      </div>

      {/* Course Form Modal */}
      <CourseFormModal
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditCourse(null);
        }}
        initial={editCourse || undefined}
        onSubmit={handleSubmit}
        lecturers={lecturers}
        subjects={subjects}
        semesters={semesters}
      />

      {/* View Course Dialog */}
      <Dialog open={!!viewCourse} onOpenChange={() => setViewCourse(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <BookOpenIcon className="w-6 h-6 text-white" />
              </div>
              Chi tiết khóa học
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <p className="text-blue-600 text-sm font-medium mb-1">Mã lớp</p>
                <p className="text-blue-900 text-lg font-bold">{viewCourse?.id}</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <p className="text-green-600 text-sm font-medium mb-1">Môn học</p>
                <p className="text-green-900 text-lg font-bold">{viewCourse?.subject?.name}</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                <p className="text-purple-600 text-sm font-medium mb-1">Giảng viên</p>
                <p className="text-purple-900 text-lg font-bold">{viewCourse?.lecturer?.displayName}</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                <p className="text-orange-600 text-sm font-medium mb-1">Học kỳ</p>
                <p className="text-orange-900 text-lg font-bold">{viewCourse?.semester?.name}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
                <p className="text-indigo-600 text-sm font-medium mb-1">Số học sinh</p>
                <p className="text-indigo-900 text-lg font-bold flex items-center gap-2">
                  <UsersIcon className="w-5 h-5" />
                  {viewCourse?.student?.length || 0} học sinh
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-gray-600 text-sm font-medium mb-1">Trạng thái</p>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    viewCourse?.status === "active" 
                      ? "bg-green-500 text-white" 
                      : "bg-red-500 text-white"
                  }`}
                >
                  {viewCourse?.status === "active" ? "Hoạt động" : "Tạm khóa"}
                </span>
              </div>
            </div>
            
            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
              <p className="text-yellow-600 text-sm font-medium mb-1">Thời gian học</p>
              <p className="text-yellow-900 text-lg font-bold">
                {viewCourse?.startDate?.slice(0, 10)} → {viewCourse?.endDate?.slice(0, 10) || "Chưa có"}
              </p>
            </div>
          </div>
          
          <DialogFooter className="gap-3">
            <Button
              variant="outline"
              onClick={() => setViewCourse(null)}
              className="border-2 border-gray-300 hover:border-gray-400"
            >
              Đóng
            </Button>
            <Button
              onClick={() => {
                if (viewCourse?._id) {
                  handleAddStudents(viewCourse._id);
                  setViewCourse(null);
                }
              }}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <UserPlusIcon className="w-4 h-4 mr-2" />
              Quản lý học sinh
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirm.show} onOpenChange={() => setDeleteConfirm({ show: false, course: null })}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-xl">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangleIcon className="w-6 h-6 text-red-600" />
              </div>
              Xác nhận xóa khóa học
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-800 font-medium">
                Bạn có chắc chắn muốn xóa khóa học này? Hành động này không thể hoàn tác.
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
