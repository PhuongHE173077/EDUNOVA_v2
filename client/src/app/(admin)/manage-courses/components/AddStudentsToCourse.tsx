// src/app/(admin)/manage-courses/components/AddStudentsToCourse.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { User, Course } from "@/types";
import { fetchCoursesById, updateCourse, fetchAllStudents } from "@/apis/course.apis";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  SearchIcon, 
  UserPlusIcon, 
  UserMinusIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertTriangleIcon,
  InfoIcon
} from "lucide-react";

interface Props {
  courseId: string;
}

const ITEMS_PER_PAGE = 10;

export default function AddStudentsToCourse({ courseId }: Props) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [allStudents, setAllStudents] = useState<User[]>([]);
  const [courseStudents, setCourseStudents] = useState<User[]>([]);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(false);
  const [studentsLoading, setStudentsLoading] = useState(true);
  
  // Confirmation dialog states
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [studentToRemove, setStudentToRemove] = useState<User | null>(null);
  
  // Pagination states
  const [availableCurrentPage, setAvailableCurrentPage] = useState(1);
  const [courseCurrentPage, setCourseCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'name' | 'email'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    fetchCourseData();
    fetchStudentsData();
  }, [courseId]);

  const fetchCourseData = async () => {
    try {
      const response = await fetchCoursesById(courseId);
      setCourse(response.data);
      setCourseStudents(response.data.student || []);
    } catch (error) {
      console.error("Error fetching course:", error);
      showErrorToast("Không thể lấy thông tin khóa học");
    }
  };

  const fetchStudentsData = async () => {
    setStudentsLoading(true);
    try {
      const response = await fetchAllStudents();
      setAllStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
      showErrorToast("Không thể lấy danh sách học sinh");
    } finally {
      setStudentsLoading(false);
    }
  };

  // Custom toast functions with icons[1][2]
  const showSuccessToast = (message: string) => {
    toast.success(
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
          <CheckCircleIcon className="w-4 h-4 text-green-500" />
        </div>
        <span className="text-white font-medium">{message}</span>
      </div>,
      {
        icon: false,
        className: "!bg-green-500 !text-white !border-green-500 !rounded-lg",
        progressClassName: "!bg-green-600"
      }
    );
  };
  

  const showErrorToast = (message: string) => {
    toast.error(
      <div className="flex items-center gap-2">
        <XCircleIcon className="w-5 h-5 text-red-600" />
        <span>{message}</span>
      </div>,
      {
        icon: false,
        className: "!bg-red-50 !text-red-800 !border-red-200",
        progressClassName: "!bg-red-600"
      }
    );
  };

  const showInfoToast = (message: string) => {
    toast.info(
      <div className="flex items-center gap-2">
        <InfoIcon className="w-5 h-5 text-blue-600" />
        <span>{message}</span>
      </div>,
      {
        icon: false,
        className: "!bg-blue-50 !text-blue-800 !border-blue-200",
        progressClassName: "!bg-blue-600"
      }
    );
  };

  // Memoized filtered and sorted students với regex
  const filteredAndSortedStudents = useMemo(() => {
    let filtered = allStudents.filter(student => {
      if (!searchQuery.trim()) return true;
      
      try {
        const regex = new RegExp(searchQuery, 'i');
        return regex.test(student.displayName) || regex.test(student.email);
      } catch (error) {
        return student.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
               student.email.toLowerCase().includes(searchQuery.toLowerCase());
      }
    });

    filtered.sort((a, b) => {
      const aValue = sortBy === 'name' ? a.displayName : a.email;
      const bValue = sortBy === 'name' ? b.displayName : b.email;
      
      if (sortOrder === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    return filtered;
  }, [allStudents, searchQuery, sortBy, sortOrder]);

  const availableStudents = useMemo(() => {
    return filteredAndSortedStudents.filter(student =>
      !courseStudents.some(courseStudent => courseStudent._id === student._id)
    );
  }, [filteredAndSortedStudents, courseStudents]);

  const sortedCourseStudents = useMemo(() => {
    return [...courseStudents].sort((a, b) => {
      const aValue = sortBy === 'name' ? a.displayName : a.email;
      const bValue = sortBy === 'name' ? b.displayName : b.email;
      
      if (sortOrder === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
  }, [courseStudents, sortBy, sortOrder]);

  // Pagination calculations
  const availableTotalPages = Math.ceil(availableStudents.length / ITEMS_PER_PAGE);
  const availablePaginatedStudents = availableStudents.slice(
    (availableCurrentPage - 1) * ITEMS_PER_PAGE,
    availableCurrentPage * ITEMS_PER_PAGE
  );

  const courseTotalPages = Math.ceil(sortedCourseStudents.length / ITEMS_PER_PAGE);
  const coursePaginatedStudents = sortedCourseStudents.slice(
    (courseCurrentPage - 1) * ITEMS_PER_PAGE,
    courseCurrentPage * ITEMS_PER_PAGE
  );

  // ✅ Sửa hàm addStudentToCourse nhận User thay vì string
  const addStudentToCourse = async (student: User) => {
    setLoading(true);
    try {
      const currentStudentIds = courseStudents.map(s => s._id);
      const updatedStudentIds = [...currentStudentIds, student._id];

      await updateCourse(courseId, {
        studentIds: updatedStudentIds
      });

      await fetchCourseData();
      showSuccessToast("Thêm học sinh thành công!");
      
      if (availablePaginatedStudents.length === 1 && availableCurrentPage > 1) {
        setAvailableCurrentPage(availableCurrentPage - 1);
      }
    } catch (error) {
      console.error("Error adding student:", error);
      showErrorToast("Có lỗi xảy ra khi thêm học sinh!");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveClick = (student: User) => {
    setStudentToRemove(student);
    setShowConfirmDialog(true);
  };

  const confirmRemoveStudent = async () => {
    if (!studentToRemove) return;
    
    setLoading(true);
    try {
      const updatedStudentIds = courseStudents
        .filter(s => s._id !== studentToRemove._id)
        .map(s => s._id);

      await updateCourse(courseId, {
        studentIds: updatedStudentIds
      });

      await fetchCourseData();
      showSuccessToast("Xóa học sinh thành công!");
      
      if (coursePaginatedStudents.length === 1 && courseCurrentPage > 1) {
        setCourseCurrentPage(courseCurrentPage - 1);
      }
    } catch (error) {
      console.error("Error removing student:", error);
      showErrorToast("Có lỗi xảy ra khi xóa học sinh!");
    } finally {
      setLoading(false);
      setShowConfirmDialog(false);
      setStudentToRemove(null);
    }
  };

  const PaginationControls = ({ 
    currentPage, 
    totalPages, 
    onPageChange 
  }: { 
    currentPage: number; 
    totalPages: number; 
    onPageChange: (page: number) => void;
  }) => (
    <div className="flex items-center justify-between mt-4">
      <p className="text-sm font-medium text-gray-700">
        Trang <span className="font-bold text-blue-600">{currentPage}</span> / <span className="font-bold">{totalPages}</span>
      </p>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="hover:bg-blue-50 hover:border-blue-300"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="hover:bg-blue-50 hover:border-blue-300"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  // ✅ Sửa StudentCard để nhận hàm với tham số User
  const StudentCard = ({ 
    student, 
    isInCourse, 
    onAction 
  }: { 
    student: User; 
    isInCourse: boolean; 
    onAction: (student: User) => void; // ✅ Sửa thành User
  }) => (
    <div className="flex items-center justify-between p-4 border-b hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 group">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
          <span className="text-white font-bold text-lg">
            {student.displayName.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <p className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
            {student.displayName}
          </p>
          <p className="text-sm text-gray-600">{student.email}</p>
        </div>
      </div>
      <Button
        size="sm"
        variant={isInCourse ? "destructive" : "default"}
        onClick={() => onAction(student)} // ✅ Truyền student object
        disabled={loading}
        className={`transition-all duration-200 font-medium ${
          isInCourse 
            ? "bg-red-500 hover:bg-red-600 shadow-md hover:shadow-lg" 
            : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-md hover:shadow-lg"
        }`}
      >
        {isInCourse ? (
          <>
            <UserMinusIcon className="w-4 h-4 mr-2" />
            Xóa
          </>
        ) : (
          <>
            <UserPlusIcon className="w-4 h-4 mr-2" />
            Thêm
          </>
        )}
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header với gradient nổi bật */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
          <h1 className="text-4xl font-bold mb-3 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <UserPlusIcon className="w-6 h-6" />
            </div>
            Quản lý học sinh lớp học
          </h1>
          {course && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="text-blue-100 text-sm font-medium">Mã lớp</p>
                <p className="text-white text-lg font-bold">{course.id}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="text-blue-100 text-sm font-medium">Môn học</p>
                <p className="text-white text-lg font-bold">{course.subject?.name}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="text-blue-100 text-sm font-medium">Giảng viên</p>
                <p className="text-white text-lg font-bold">{course.lecturer?.displayName}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search Controls với design nổi bật */}
      <div className="mb-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <SearchIcon className="w-4 h-4 text-blue-600" />
                Tìm kiếm học sinh (Regex)
              </label>
              <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Nhập regex pattern (vd: ^Nguyễn, .*@gmail.com, student00[1-5])"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setAvailableCurrentPage(1);
                  }}
                  className="pl-12 h-12 text-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg"
                />
              </div>
              
              <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs font-semibold text-blue-800 mb-1">💡 Ví dụ regex patterns:</p>
                <div className="flex flex-wrap gap-2">
                  <code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">^Nguyễn</code>
                  <code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">.*@gmail.com</code>
                  <code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">student00[1-5]</code>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Sắp xếp theo</label>
                <Select value={sortBy} onValueChange={(value: 'name' | 'email') => setSortBy(value)}>
                  <SelectTrigger className="w-36 h-12 border-2 border-gray-300 focus:border-blue-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">📝 Tên</SelectItem>
                    <SelectItem value="email">📧 Email</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Thứ tự</label>
                <Select value={sortOrder} onValueChange={(value: 'asc' | 'desc') => setSortOrder(value)}>
                  <SelectTrigger className="w-36 h-12 border-2 border-gray-300 focus:border-blue-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">⬆️ A → Z</SelectItem>
                    <SelectItem value="desc">⬇️ Z → A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content với design nổi bật */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Available Students */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 text-white">
            <h2 className="text-xl font-bold flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <UserPlusIcon className="w-5 h-5" />
              </div>
              Học sinh có thể thêm
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">
                {availableStudents.length}
              </span>
            </h2>
          </div>
          
          <div className="h-96 overflow-y-auto">
            {studentsLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
                  <p className="text-gray-600 font-medium">Đang tải danh sách học sinh...</p>
                </div>
              </div>
            ) : availablePaginatedStudents.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <InfoIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">Không tìm thấy học sinh nào</p>
                </div>
              </div>
            ) : (
              availablePaginatedStudents.map(student => (
                <StudentCard
                  key={student._id}
                  student={student}
                  isInCourse={false}
                  onAction={addStudentToCourse}
                />
              ))
            )}
          </div>
          
          {!studentsLoading && availableTotalPages > 1 && (
            <div className="p-4 border-t bg-gray-50">
              <PaginationControls
                currentPage={availableCurrentPage}
                totalPages={availableTotalPages}
                onPageChange={setAvailableCurrentPage}
              />
            </div>
          )}
        </div>

        {/* Course Students */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white">
            <h2 className="text-xl font-bold flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="w-5 h-5" />
              </div>
              Học sinh trong lớp
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">
                {courseStudents.length}
              </span>
            </h2>
          </div>
          
          <div className="h-96 overflow-y-auto">
            {coursePaginatedStudents.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <InfoIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">Chưa có học sinh nào trong lớp</p>
                </div>
              </div>
            ) : (
              coursePaginatedStudents.map(student => (
                <StudentCard
                  key={student._id}
                  student={student}
                  isInCourse={true}
                  onAction={handleRemoveClick}
                />
              ))
            )}
          </div>
          
          {courseTotalPages > 1 && (
            <div className="p-4 border-t bg-gray-50">
              <PaginationControls
                currentPage={courseCurrentPage}
                totalPages={courseTotalPages}
                onPageChange={setCourseCurrentPage}
              />
            </div>
          )}
        </div>
      </div>

      {/* Footer với thống kê nổi bật */}
      <div className="mt-8 flex justify-between items-center">
        <Button 
          variant="outline" 
          onClick={() => router.back()}
          className="h-12 px-6 font-medium border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50"
        >
          ← Quay lại
        </Button>
        
        <div className="bg-white rounded-lg shadow-md border border-gray-200 px-6 py-3">
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="font-medium text-gray-700">
                Tổng: <span className="font-bold text-blue-600">{allStudents.length}</span> học sinh
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-medium text-gray-700">
                Trong lớp: <span className="font-bold text-green-600">{courseStudents.length}</span> học sinh
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-xl">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangleIcon className="w-6 h-6 text-red-600" />
              </div>
              Xác nhận xóa học sinh
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-800 font-medium">
                Bạn có chắc chắn muốn xóa học sinh này khỏi lớp?
              </p>
            </div>
            
            {studentToRemove && (
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">
                      {studentToRemove.displayName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{studentToRemove.displayName}</p>
                    <p className="text-sm text-gray-600">{studentToRemove.email}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter className="gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setShowConfirmDialog(false);
                setStudentToRemove(null);
              }}
              className="border-2 border-gray-300 hover:border-gray-400"
            >
              Hủy bỏ
            </Button>
            <Button
              variant="destructive"
              onClick={confirmRemoveStudent}
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
