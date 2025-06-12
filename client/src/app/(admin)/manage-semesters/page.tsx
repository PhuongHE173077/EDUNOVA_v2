"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Semesters } from "@/types";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusIcon, PencilIcon, Trash2Icon, EyeIcon } from "lucide-react";
import SemesterFormModal from "./components/SemesterFormModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  fetchSemesters,
  createSemester,
  updateSemester,
  deleteSemester,
} from "@/apis/semester.apis";
import { toast } from "react-toastify"; // ✅ dùng react-toastify

export default function ManageSemesterPage() {
  const [semesters, setSemesters] = useState<Semesters[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editSemester, setEditSemester] = useState<Semesters | null>(null);
  const [viewSemester, setViewSemester] = useState<Semesters | null>(null);

  const searchParams = useSearchParams();
  const shouldOpenCreate = searchParams.get("create") === "true";

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
      toast.error(" Lỗi khi tải danh sách học kỳ");
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
    try {
      if (editSemester) {
        await updateSemester(editSemester._id.toString(), data);
        toast.success(" Cập nhật học kỳ thành công");
      } else {
        await createSemester(data);
        toast.success(" Tạo học kỳ mới thành công");
      }

      await loadSemesters();
      setFormOpen(false);
      setEditSemester(null);
    } catch (error) {
      toast.error(" Lỗi khi tạo hoặc cập nhật học kỳ");
      console.error("Lỗi khi tạo/cập nhật học kỳ:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSemester(id);
      toast.success("🗑️ Đã xoá học kỳ");
      await loadSemesters();
    } catch (err) {
      toast.error(" Lỗi khi xoá học kỳ");
      console.error("Lỗi khi xoá học kỳ:", err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">🗓️ Quản lý học kỳ</h1>
        <Button
          onClick={() => {
            setEditSemester(null);
            setFormOpen(false);
            setTimeout(() => setFormOpen(true), 0);
          }}
        >
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
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => {
                      setEditSemester(s);
                      setFormOpen(true);
                    }}
                  >
                    <PencilIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => handleDelete(s._id.toString())}
                  >
                    <Trash2Icon className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

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
