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
import { PencilIcon, Trash2Icon, EyeIcon, PlusIcon } from "lucide-react";
import CourseFormModal from "./components/CourseFormModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import {
  fetchCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  fetchCoursesById
} from "@/apis/course.apis";
import {
  fetchLecturers,
  fetchSubjects,
  fetchSemesters,
} from "@/apis/other.apis";

export default function ManageCoursePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [lecturers, setLecturers] = useState<User[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [semesters, setSemesters] = useState<Semesters[]>([]);

  const [formOpen, setFormOpen] = useState(false);
  const [editCourse, setEditCourse] = useState<Course | null>(null);
  const [viewCourse, setViewCourse] = useState<Course | null>(null);

  useEffect(() => {
    // Load danh sách khoá học
    fetchCourses()
      .then((res) => setCourses(res.data))
      .catch(() => alert("Không thể lấy danh sách khoá học"));

    // Load danh sách giảng viên
    fetchLecturers()
      .then((res) => setLecturers(res.data))
      .catch(() => alert("Không thể lấy danh sách giảng viên"));

    // Load danh sách môn học
    fetchSubjects()
      .then((res) => setSubjects(res.data))
      .catch(() => alert("Không thể lấy danh sách môn học"));

    // Load danh sách học kỳ
    fetchSemesters()
      .then((res) => setSemesters(res.data))
      .catch(() => alert("Không thể lấy danh sách học kỳ"));
  }, []);

  const handleEditClick = (course: Course) => {
    setEditCourse(course);
    setFormOpen(true);
  };

  const handleSubmit = async (data: Partial<Course>) => {
    try {
      if (editCourse) {
        // Gọi update trước
        await updateCourse(editCourse._id!, data);
        // Lấy lại dữ liệu chi tiết khóa học sau khi update (có đầy đủ thông tin liên kết)
        const res = await fetchCoursesById(editCourse._id!);
        // Cập nhật lại courses với dữ liệu mới vừa lấy
        setCourses((prev) =>
          prev.map((c) => (c._id === editCourse._id ? res.data : c))
        );
      } else {
        const res = await createCourse(data);
        setCourses((prev) => [...prev, res.data]);
      }
      setFormOpen(false);
      setEditCourse(null);
    } catch {
      alert("Có lỗi khi lưu khoá học.");
    }
  };
  

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bạn có chắc muốn xoá khoá học này?")) return;
    try {
      await deleteCourse(id);
      setCourses((prev) => prev.filter((c) => c._id !== id));
    } catch {
      alert("Xoá khoá học thất bại.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">📚 Quản lý khoá học</h1>
        <Button
          onClick={() => {
            setFormOpen(true);
            setEditCourse(null);
          }}
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Tạo khoá học
        </Button>
      </div>

      <div className="rounded-lg border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Môn</TableHead>
              <TableHead>Giảng viên</TableHead>
              <TableHead>Học kỳ</TableHead>
              <TableHead>Thời gian</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((c) => (
              <TableRow key={c._id}>
                <TableCell>{c.subject?.name || ""}</TableCell>
                <TableCell>{c.lecturer?.displayName || ""}</TableCell>
                <TableCell>{c.semester?.name || ""}</TableCell>
                <TableCell>
                  {c.startDate?.slice(0, 10)} → {c.endDate?.slice(0, 10)}
                </TableCell>
                <TableCell
                  className={
                    c.status === "active" ? "text-green-600" : "text-red-600"
                  }
                >
                  {c.status === "active" ? "Hoạt động" : "Tạm khoá"}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setViewCourse(c)}
                  >
                    <EyeIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleEditClick(c)}
                  >
                    <PencilIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => handleDelete(c._id!)}
                  >
                    <Trash2Icon className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

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

      <Dialog open={!!viewCourse} onOpenChange={() => setViewCourse(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chi tiết khoá học</DialogTitle>
          </DialogHeader>
          <p>
            <strong>Môn:</strong> {viewCourse?.subject?.name}
          </p>
          <p>
            <strong>Giảng viên:</strong> {viewCourse?.lecturer?.displayName}
          </p>
          <p>
            <strong>Học kỳ:</strong> {viewCourse?.semester?.name}
          </p>
          <p>
            <strong>Thời gian:</strong> {viewCourse?.startDate?.slice(0, 10)} →{" "}
            {viewCourse?.endDate?.slice(0, 10)}
          </p>
          <p
            className={
              viewCourse?.status === "active" ? "text-green-600" : "text-red-600"
            }
          >
            <strong>Trạng thái:</strong>{" "}
            {viewCourse?.status === "active" ? "Hoạt động" : "Tạm khoá"}
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
