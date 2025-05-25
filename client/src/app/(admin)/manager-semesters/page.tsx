"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Semesters } from "@/types";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusIcon, PencilIcon, Trash2Icon, EyeIcon } from "lucide-react";
import SemesterFormModal from "./components/SemesterFormModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Dữ liệu mẫu (có thể thay bằng API sau)
const mockSemesters: Semesters[] = [
  {
    _id: "sem1",
    name: "Spring25",
    startDate: new Date("2025-01-10"),
    endDate: new Date("2025-05-15"),
  },
  {
    _id: "sem2",
    name: "Summer25",
    startDate: new Date("2025-06-01"),
    endDate: new Date("2025-10-01"),
  },
];

export default function ManageSemesterPage() {
  const [semesters, setSemesters] = useState<Semesters[]>(mockSemesters);
  const [formOpen, setFormOpen] = useState(false);
  const [editSemester, setEditSemester] = useState<Semesters | null>(null);
  const [viewSemester, setViewSemester] = useState<Semesters | null>(null);

  const searchParams = useSearchParams();
  const shouldOpenCreate = searchParams.get("create") === "true";

  useEffect(() => {
    if (shouldOpenCreate) {
      setFormOpen(true);
      setEditSemester(null);
    }
  }, [shouldOpenCreate]);

  const handleSubmit = (data: Partial<Semesters>) => {
    if (editSemester) {
      // Chỉnh sửa
      setSemesters(prev =>
        prev.map(s => s._id === editSemester._id ? { ...s, ...data } as Semesters : s)
      );
    } else {
      // Thêm mới (nếu dùng backend thật thì không cần tự tạo _id)
      const newSemester: Semesters = {
        _id: `sem${Date.now()}`, // Tạm thời mock _id cho React key
        name: data.name || "Học kỳ mới",
        startDate: data.startDate || new Date(),
        endDate: data.endDate || new Date(),
      };
      setSemesters(prev => [...prev, newSemester]);
    }

    setFormOpen(false);
    setEditSemester(null);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">🗓️ Quản lý học kỳ</h1>
        <Button onClick={() => { setFormOpen(true); setEditSemester(null); }}>
          <PlusIcon className="w-4 h-4 mr-2" />
          Tạo học kỳ
        </Button>
      </div>

      <div className="rounded-lg border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên học kỳ</TableHead>
              <TableHead>Ngày bắt đầu</TableHead>
              <TableHead>Ngày kết thúc</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {semesters.map((s) => (
              <TableRow key={s._id.toString()}>
                <TableCell>{s.name}</TableCell>
                <TableCell>{new Date(s.startDate).toLocaleDateString("vi-VN")}</TableCell>
                <TableCell>{new Date(s.endDate).toLocaleDateString("vi-VN")}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="icon" variant="outline" onClick={() => setViewSemester(s)}>
                    <EyeIcon className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="outline" onClick={() => { setEditSemester(s); setFormOpen(true); }}>
                    <PencilIcon className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="destructive" onClick={() => setSemesters(prev => prev.filter(p => p._id !== s._id))}>
                    <Trash2Icon className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal tạo/sửa học kỳ */}
      <SemesterFormModal
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditSemester(null); }}
        initial={editSemester || undefined}
        onSubmit={handleSubmit}
      />

      {/* Modal xem chi tiết */}
      <Dialog open={!!viewSemester} onOpenChange={() => setViewSemester(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chi tiết học kỳ</DialogTitle>
          </DialogHeader>
          {viewSemester && (
            <div className="space-y-2 text-sm">
              <p><strong>Tên:</strong> {viewSemester.name}</p>
              <p><strong>Bắt đầu:</strong> {new Date(viewSemester.startDate).toLocaleDateString("vi-VN")}</p>
              <p><strong>Kết thúc:</strong> {new Date(viewSemester.endDate).toLocaleDateString("vi-VN")}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
