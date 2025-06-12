"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { User } from "@/types";
import { Button } from "@/components/ui/button";
import { EyeIcon, PencilIcon, Trash2Icon, PlusIcon } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import UserFormModal from "./components/UserFormModal";
import UserCreateModal from "./components/UserCreateModal";
import { fetchUsers, createUser, updateUser, deleteUser } from "@/apis/user.apis";
import { toast } from "react-toastify"; // ✅ Thêm react-toastify

export default function ManageUserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [viewUser, setViewUser] = useState<User | null>(null);

  const searchParams = useSearchParams();
  const shouldOpenCreate = searchParams.get("create") === "true";

  useEffect(() => {
    if (shouldOpenCreate) {
      setCreateFormOpen(true);
      setEditUser(null);
    }
  }, [shouldOpenCreate]);

  const loadUsers = async () => {
    try {
      const res = await fetchUsers();
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Không thể lấy danh sách người dùng", { icon: false });
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreateSubmit = async (data: Partial<User>) => {
    try {
      const res = await createUser(data);
      setUsers((prev) => [...prev, res.data]);
      toast.success("Tạo người dùng thành công", { icon: false });
      setCreateFormOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi khi tạo người dùng", { icon: false });
    }
  };

  const handleEditSubmit = async (data: Partial<User>) => {
    try {
      if (!editUser) return;
      const res = await updateUser(editUser._id!, data);
      setUsers((prev) => prev.map((u) => (u._id === editUser._id ? res.data : u)));
      toast.success("Cập nhật người dùng thành công", { icon: false });
      setEditFormOpen(false);
      setEditUser(null);
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi khi cập nhật người dùng", { icon: false });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      toast.success("Xoá người dùng thành công", { icon: false });
    } catch (error) {
      console.error(error);
      toast.error("Xoá người dùng thất bại", { icon: false });
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">👥 Quản lý người dùng</h1>
        <Button
          onClick={() => {
            setCreateFormOpen(true);
            setEditUser(null);
          }}
        >
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
                <TableCell>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      u.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                    }`}
                  >
                    {u.isActive ? "Hoạt động" : "Tạm khoá"}
                  </span>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="icon" variant="outline" onClick={() => setViewUser(u)}>
                    <EyeIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => {
                      setEditUser(u);
                      setEditFormOpen(true);
                    }}
                  >
                    <PencilIcon className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="destructive" onClick={() => handleDelete(u._id!)}>
                    <Trash2Icon className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <UserCreateModal open={createFormOpen} onClose={() => setCreateFormOpen(false)} onSubmit={handleCreateSubmit} />

      <UserFormModal
        open={editFormOpen}
        onClose={() => {
          setEditFormOpen(false);
          setEditUser(null);
        }}
        initial={editUser || undefined}
        onSubmit={handleEditSubmit}
      />

      <Dialog open={!!viewUser} onOpenChange={() => setViewUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chi tiết người dùng</DialogTitle>
          </DialogHeader>
          <p><strong>Họ tên:</strong> {viewUser?.displayName}</p>
          <p><strong>Email:</strong> {viewUser?.email}</p>
          <p><strong>Vai trò:</strong> {viewUser?.role}</p>
          <p><strong>Trạng thái:</strong> {viewUser?.isActive ? "Hoạt động" : "Tạm khoá"}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
