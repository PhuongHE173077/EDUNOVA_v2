"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { User, Subject, Semesters, CourseFormData } from "@/types";

interface Props {
  open: boolean;
  onClose: () => void;
  initial?: any;
  onSubmit: (data: CourseFormData) => void;
  lecturers: User[];
  subjects: Subject[];
  semesters: Semesters[];
}

export default function CourseFormModal({
  open,
  onClose,
  initial,
  onSubmit,
  lecturers,
  subjects,
  semesters,
}: Props) {
  const [subjectId, setSubjectId] = useState<string>("");
  const [lecturerId, setLecturerId] = useState<string>("");
  const [semesterId, setSemesterId] = useState<string>("");
  const [start, setStart] = useState("");

  useEffect(() => {
    if (initial) {
      setSubjectId(initial.subject?._id || "");
      setLecturerId(initial.lecturer?._id || "");
      setSemesterId(initial.semester?._id || "");
      setStart(initial.startDate ? initial.startDate.slice(0, 10) : "");
    } else {
      setSubjectId("");
      setLecturerId("");
      setSemesterId("");
      setStart("");
    }
  }, [initial]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{initial ? "Chỉnh sửa khóa học" : "Tạo khóa học mới"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Môn học</label>
            <Select value={subjectId} onValueChange={setSubjectId}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn môn học" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map(s => (
                  <SelectItem key={s._id} value={s._id.toString()}>{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Giảng viên</label>
            <Select value={lecturerId} onValueChange={setLecturerId}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn giảng viên" />
              </SelectTrigger>
              <SelectContent>
                {lecturers.map(l => (
                  <SelectItem key={l._id} value={l._id.toString()}>{l.displayName}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Học kỳ</label>
            <Select value={semesterId} onValueChange={setSemesterId}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn học kỳ" />
              </SelectTrigger>
              <SelectContent>
                {semesters.map(s => (
                  <SelectItem key={s._id.toString()} value={s._id.toString()}>{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Ngày bắt đầu</label>
            <Input type="date" value={start} onChange={e => setStart(e.target.value)} />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose}>Huỷ</Button>
            {/* Nút thêm học sinh - chỉ hiện khi edit (có initial) */}
            {initial && (
              <Button
                variant="outline"
                onClick={() => {
                  // Chuyển sang trang thêm học sinh
                  window.location.href = `/manage-courses/${initial._id}/add-students`;
                  // Hoặc dùng router.push nếu dùng Next.js router
                }}
              >
                Thêm học sinh
              </Button>
            )}
            <Button
              onClick={() => {
                onSubmit({
                  subjectId,
                  lecturerId,
                  semesterId,
                  startDate: start,
                  status: "inactive"
                });
              }}
            >
              {initial ? "Cập nhật" : "Tạo mới"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
