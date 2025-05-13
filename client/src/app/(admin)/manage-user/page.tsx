"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { User } from "@/types";
import { Button } from "@/components/ui/button";
import { EyeIcon, PencilIcon, Trash2Icon, PlusIcon } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import UserFormModal from "./components/UserFormModal";

// Mock data ban đầu
const mockUsers: User[] = [
  {
    _id: "u1",
    email: "admin@example.com",
    displayName: "Nguyễn Văn A",
    avatar: "",
    role: "admin",
    isActive: true,
  },
  {
    _id: "u2",
    email: "student@example.com",
    displayName: "Trần Thị B",
    avatar: "",
    role: "student",
    isActive: false,
    specialize: ["Khoa học máy tính"],
  },
];

export default function ManageUserPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [formOpen, setFormOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [viewUser, setViewUser] = useState<User | null>(null);

  // Auto open modal nếu có ?create=true
  const searchParams = useSearchParams();
  const shouldOpenCreate = searchParams.get("create") === "true";

  useEffect(() => {
    if (shouldOpenCreate) {
      setFormOpen(true);
      setEditUser(null);
    }
  }, [shouldOpenCreate]);

  const handleSubmit = (data: Partial<User>) => {
    if (editUser) {
      setUsers((prev) =>
        prev.map((u) => (u._id === editUser._id ? { ...u, ...data } as User : u))
      );
    } else {
      const newUser: User = {
        ...data,
        _id: Date.now().toString(),
        avatar: "",
        students: [],
      } as User;
      setUsers((prev) => [...prev, newUser]);
    }

    setFormOpen(false);
    setEditUser(null);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">👥 Quản lý người dùng</h1>
        <Button onClick={() => setFormOpen(true)}>
          <PlusIcon className="w-4 h-4 mr-2" />
          Tạo người dùng
        </Button>
      </div>

      <div className="rounded-lg border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Vai trò</TableHead>
              <TableHead>Chuyên môn</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u._id}>
                <TableCell>{u.displayName}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.role}</TableCell>
                <TableCell>{u.specialize?.join(", ") || "—"}</TableCell>
                <TableCell>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${u.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                    {u.isActive ? "Hoạt động" : "Tạm khoá"}
                  </span>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="icon" variant="outline" onClick={() => setViewUser(u)}><EyeIcon className="w-4 h-4" /></Button>
                  <Button size="icon" variant="outline" onClick={() => { setEditUser(u); setFormOpen(true); }}><PencilIcon className="w-4 h-4" /></Button>
                  <Button size="icon" variant="destructive" onClick={() => setUsers(prev => prev.filter(p => p._id !== u._id))}><Trash2Icon className="w-4 h-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <UserFormModal
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditUser(null); }}
        initial={editUser || undefined}
        onSubmit={handleSubmit}
      />

      <Dialog open={!!viewUser} onOpenChange={() => setViewUser(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Chi tiết người dùng</DialogTitle></DialogHeader>
          <p><strong>Họ tên:</strong> {viewUser?.displayName}</p>
          <p><strong>Email:</strong> {viewUser?.email}</p>
          <p><strong>Vai trò:</strong> {viewUser?.role}</p>
          <p><strong>Chuyên môn:</strong> {viewUser?.specialize?.join(", ")}</p>
          <p><strong>Trạng thái:</strong> {viewUser?.isActive ? "Hoạt động" : "Tạm khoá"}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
