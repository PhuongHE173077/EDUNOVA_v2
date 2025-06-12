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
  initial?: any; // giữ any để tránh lỗi kiểu do initial là Course
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
  const [room, setRoom] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [status, setStatus] = useState<string>("active");

  useEffect(() => {
    if (initial) {
      setSubjectId(initial.subject?._id || "");
      setLecturerId(initial.lecturer?._id || "");
      setSemesterId(initial.semester?._id || "");
      setRoom(initial.room || "");
      setStart(initial.startDate ? initial.startDate.slice(0, 10) : "");
      setEnd(initial.endDate ? initial.endDate.slice(0, 10) : "");
      setStatus(initial.status || "active");
    } else {
      setSubjectId("");
      setLecturerId("");
      setSemesterId("");
      setRoom("");
      setStart("");
      setEnd("");
      setStatus("active");
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
            <label className="block text-sm font-medium mb-1">Phòng học</label>
            <Input value={room} onChange={e => setRoom(e.target.value)} />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Ngày bắt đầu</label>
              <Input type="date" value={start} onChange={e => setStart(e.target.value)} />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Ngày kết thúc</label>
              <Input type="date" value={end} onChange={e => setEnd(e.target.value)} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Trạng thái</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Hoạt động</SelectItem>
                <SelectItem value="inactive">Tạm khoá</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose}>Huỷ</Button>
            <Button
              onClick={() => {
                onSubmit({
                  subjectId,
                  lecturerId,
                  semesterId,
                  room,
                  startDate: start,
                  endDate: end,
                  status,
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
