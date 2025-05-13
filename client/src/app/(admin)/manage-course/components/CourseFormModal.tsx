"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Course, User, Subject, Semesters } from "@/types";

interface Props {
  open: boolean;
  onClose: () => void;
  initial?: Course;
  onSubmit: (data: Partial<Course>) => void;
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
  const [subjectId, setSubjectId] = useState<string>(initial?.subject._id.toString() || "");
  const [lecturerId, setLecturerId] = useState<string>(initial?.lecturer._id.toString() || "");
  const [semesterId, setSemesterId] = useState<string>(initial?.semester._id.toString() || "");
  const [room, setRoom] = useState(initial?.room || "");
  const [start, setStart] = useState(initial?.startDate.slice(0, 10) || "");
  const [end, setEnd] = useState(initial?.endDate.slice(0, 10) || "");

  useEffect(() => {
    if (initial) {
      setSubjectId(initial.subject._id.toString());
      setLecturerId(initial.lecturer._id.toString());
      setSemesterId(initial.semester._id.toString());
      setRoom(initial.room || "");
      setStart(initial.startDate.slice(0, 10));
      setEnd(initial.endDate.slice(0, 10));
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
              <SelectTrigger><SelectValue placeholder="Chọn môn học" /></SelectTrigger>
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
              <SelectTrigger><SelectValue placeholder="Chọn giảng viên" /></SelectTrigger>
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
              <SelectTrigger><SelectValue placeholder="Chọn học kỳ" /></SelectTrigger>
              <SelectContent>
                {semesters.map(s => (
                  <SelectItem key={s._id.toString()} value={s._id.toString()}>{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phòng học</label>
            <Input value={room} onChange={(e) => setRoom(e.target.value)} />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Ngày bắt đầu</label>
              <Input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Ngày kết thúc</label>
              <Input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose}>Huỷ</Button>
            <Button
              onClick={() => {
                const data: Partial<Course> = {
                  room,
                  startDate: start,
                  endDate: end,
                  subject: subjects.find(s => s._id.toString() === subjectId)!,
                  lecturer: lecturers.find(l => l._id.toString() === lecturerId)!,
                  semester: semesters.find(s => s._id.toString() === semesterId)!,
                };
                onSubmit(data);
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
