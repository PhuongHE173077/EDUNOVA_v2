"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Course, User, Subject, Semesters } from "@/types";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PencilIcon, Trash2Icon, EyeIcon, PlusIcon } from "lucide-react";
import CourseFormModal from "./components/CourseFormModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Mock data (có thể fetch từ API thật nếu cần)
const mockLecturers: User[] = [
  { _id: "u1", email: "", displayName: "Nguyễn Văn A", avatar: "", role: "lecturer", isActive: true },
  { _id: "u2", email: "", displayName: "Trần Thị B", avatar: "", role: "lecturer", isActive: true },
];

const mockSubjects: Subject[] = [
  { _id: "s1", id: "MATH101", name: "Toán cao cấp", description: "", timeAllocation: "", curriculums: [], documents: [], _destroy: false },
  { _id: "s2", id: "ENG201", name: "Tiếng Anh CN", description: "", timeAllocation: "", curriculums: [], documents: [], _destroy: false },
];

const mockSemesters: Semesters[] = [
  { _id: "sem1", name: "HK1 2025", startDate: new Date(), endDate: new Date() },
  { _id: "sem2", name: "HK2 2025", startDate: new Date(), endDate: new Date() },
];

export default function ManageCoursePage() {
  const [courses, setCourses] = useState<Course[]>([
    {
      _id: "c1",
      id: "MATH-001",
      room: "A101",
      startDate: "2025-05-10",
      endDate: "2025-07-10",
      status: "active",
      students: [],
      subject: {
        _id: "s1",
        id: "MATH101",
        name: "Toán cao cấp",
        description: "",
        timeAllocation: "",
        curriculums: [],
        documents: [],
        _destroy: false
      },
      lecturer: {
        _id: "u1",
        displayName: "Nguyễn Văn A",
        email: "",
        avatar: "",
        role: "lecturer",
        isActive: true
      },
      semester: {
        _id: "sem1",
        name: "HK1 2025",
        startDate: new Date(),
        endDate: new Date()
      }
    }
  ]);
  
  const [formOpen, setFormOpen] = useState(false);
  const [editCourse, setEditCourse] = useState<Course | null>(null);
  const [viewCourse, setViewCourse] = useState<Course | null>(null);

  // 👇 Tự động mở modal nếu URL có ?create=true
  const searchParams = useSearchParams();
  const shouldOpenCreate = searchParams.get("create") === "true";

  useEffect(() => {
    if (shouldOpenCreate) {
      setFormOpen(true);
      setEditCourse(null);
    }
  }, [shouldOpenCreate]);

  const handleSubmit = (data: Partial<Course>) => {
    if (editCourse) {
      setCourses(prev =>
        prev.map(c => (c._id === editCourse._id ? { ...c, ...data } as Course : c))
      );
    } else {
      setCourses(prev => [...prev, { _id: Date.now().toString(), id: "NEW", students: [], status: "active", ...data } as Course]);
    }
    setFormOpen(false);
    setEditCourse(null);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">📚 Quản lý khoá học</h1>
        <Button onClick={() => setFormOpen(true)}>
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
              <TableHead>Phòng</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((c) => (
              <TableRow key={c._id}>
                <TableCell>{c.subject.name}</TableCell>
                <TableCell>{c.lecturer.displayName}</TableCell>
                <TableCell>{c.semester.name}</TableCell>
                <TableCell>{c.startDate} → {c.endDate}</TableCell>
                <TableCell>{c.room}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="icon" variant="outline" onClick={() => setViewCourse(c)}><EyeIcon className="w-4 h-4" /></Button>
                  <Button size="icon" variant="outline" onClick={() => { setEditCourse(c); setFormOpen(true); }}><PencilIcon className="w-4 h-4" /></Button>
                  <Button size="icon" variant="destructive" onClick={() => setCourses(prev => prev.filter(p => p._id !== c._id))}><Trash2Icon className="w-4 h-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CourseFormModal
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditCourse(null); }}
        initial={editCourse || undefined}
        onSubmit={handleSubmit}
        lecturers={mockLecturers}
        subjects={mockSubjects}
        semesters={mockSemesters}
      />

      <Dialog open={!!viewCourse} onOpenChange={() => setViewCourse(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Chi tiết khoá học</DialogTitle></DialogHeader>
          <p><strong>Môn:</strong> {viewCourse?.subject.name}</p>
          <p><strong>Giảng viên:</strong> {viewCourse?.lecturer.displayName}</p>
          <p><strong>Học kỳ:</strong> {viewCourse?.semester.name}</p>
          <p><strong>Phòng:</strong> {viewCourse?.room}</p>
          <p><strong>Thời gian:</strong> {viewCourse?.startDate} → {viewCourse?.endDate}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
