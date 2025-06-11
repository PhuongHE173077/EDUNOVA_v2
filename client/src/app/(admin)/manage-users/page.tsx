"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { User } from "@/types";
import { Button } from "@/components/ui/button";
import { 
  EyeIcon, 
  PencilIcon, 
  Trash2Icon, 
  PlusIcon,
  UsersIcon,
  UserCheckIcon,
  UserXIcon,
  ShieldIcon,
  MailIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertTriangleIcon,
  InfoIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import UserFormModal from "./components/UserFormModal";
import UserCreateModal from "./components/UserCreateModal";
import { fetchUsers, createUser, updateUser, deleteUser } from "@/apis/user.apis";
import { toast } from "react-toastify";

export default function ManageUserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [viewUser, setViewUser] = useState<User | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; user: User | null }>({
    show: false,
    user: null
  });
  const [loading, setLoading] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const searchParams = useSearchParams();
  const shouldOpenCreate = searchParams.get("create") === "true";

  // Pagination calculations
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

  // Custom toast functions với design đẹp
  const showSuccessToast = (message: string) => {
    toast.success(
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
          <CheckCircleIcon className="w-5 h-5 text-green-500" />
        </div>
        <span className="text-white font-medium">{message}</span>
      </div>,
      {
        icon: false,
        className: "!bg-gradient-to-r !from-green-500 !to-emerald-600 !text-white !border-none !rounded-xl !shadow-xl",
        progressClassName: "!bg-green-300",
        autoClose: 3000,
      }
    );
  };

  const showErrorToast = (message: string) => {
    toast.error(
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
          <XCircleIcon className="w-5 h-5 text-red-500" />
        </div>
        <span className="text-white font-medium">{message}</span>
      </div>,
      {
        icon: false,
        className: "!bg-gradient-to-r !from-red-500 !to-rose-600 !text-white !border-none !rounded-xl !shadow-xl",
        progressClassName: "!bg-red-300",
        autoClose: 4000,
      }
    );
  };

  const showInfoToast = (message: string) => {
    toast.info(
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
          <InfoIcon className="w-5 h-5 text-blue-500" />
        </div>
        <span className="text-white font-medium">{message}</span>
      </div>,
      {
        icon: false,
        className: "!bg-gradient-to-r !from-blue-500 !to-indigo-600 !text-white !border-none !rounded-xl !shadow-xl",
        progressClassName: "!bg-blue-300",
        autoClose: 3000,
      }
    );
  };

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
      showErrorToast("Không thể lấy danh sách người dùng");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreateSubmit = async (data: Partial<User>) => {
    setLoading(true);
    try {
      const res = await createUser(data);
      setUsers((prev) => [...prev, res.data]);
      showSuccessToast("Tạo người dùng thành công!");
      setCreateFormOpen(false);
    } catch (error) {
      console.error(error);
      showErrorToast("Có lỗi khi tạo người dùng");
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (data: Partial<User>) => {
    setLoading(true);
    try {
      if (!editUser) return;
      const res = await updateUser(editUser._id!, data);
      setUsers((prev) => prev.map((u) => (u._id === editUser._id ? res.data : u)));
      showSuccessToast("Cập nhật người dùng thành công!");
      setEditFormOpen(false);
      setEditUser(null);
    } catch (error) {
      console.error(error);
      showErrorToast("Có lỗi khi cập nhật người dùng");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (user: User) => {
    setDeleteConfirm({ show: true, user });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm.user) return;
    
    setLoading(true);
    try {
      await deleteUser(deleteConfirm.user._id!);
      setUsers((prev) => prev.filter((u) => u._id !== deleteConfirm.user!._id));
      showSuccessToast("Xóa người dùng thành công!");
      setDeleteConfirm({ show: false, user: null });
      
      // Điều chỉnh trang hiện tại nếu cần
      const newTotalPages = Math.ceil((users.length - 1) / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    } catch (error) {
      console.error(error);
      showErrorToast("Xóa người dùng thất bại");
    } finally {
      setLoading(false);
    }
  };

  // Thống kê users
  const activeUsers = users.filter(u => u.isActive).length;
  const inactiveUsers = users.filter(u => !u.isActive).length;
  const adminUsers = users.filter(u => u.role === 'admin').length;
  const studentUsers = users.filter(u => u.role === 'student').length;

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <ShieldIcon className="w-4 h-4 text-red-500" />;
      case 'lecturer': return <UsersIcon className="w-4 h-4 text-blue-500" />;
      case 'student': return <UserCheckIcon className="w-4 h-4 text-green-500" />;
      default: return <UserCheckIcon className="w-4 h-4 text-gray-500" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-gradient-to-r from-red-500 to-rose-600 text-white';
      case 'lecturer': return 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white';
      case 'student': return 'bg-gradient-to-r from-green-500 to-emerald-600 text-white';
      default: return 'bg-gradient-to-r from-gray-500 to-slate-600 text-white';
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          size="sm"
          onClick={() => setCurrentPage(i)}
          className={`w-10 h-10 ${
            currentPage === i 
              ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg" 
              : "hover:bg-blue-50 hover:border-blue-300"
          }`}
        >
          {i}
        </Button>
      );
    }

    return buttons;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      {/* Header với gradient đẹp */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-700 rounded-2xl p-8 text-white shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <UsersIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Quản lý người dùng</h1>
                <p className="text-blue-100 text-lg">Quản lý và theo dõi tất cả người dùng trong hệ thống</p>
              </div>
            </div>
            <Button
              onClick={() => {
                setCreateFormOpen(true);
                setEditUser(null);
              }}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Tạo người dùng mới
            </Button>
          </div>
          
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <UsersIcon className="w-8 h-8 text-blue-200" />
                <div>
                  <p className="text-blue-100 text-sm">Tổng người dùng</p>
                  <p className="text-white text-2xl font-bold">{users.length}</p>
                  <p className="text-blue-200 text-xs">Trang {currentPage}/{totalPages || 1}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <UserCheckIcon className="w-8 h-8 text-green-200" />
                <div>
                  <p className="text-blue-100 text-sm">Đang hoạt động</p>
                  <p className="text-white text-2xl font-bold">{activeUsers}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <UserXIcon className="w-8 h-8 text-red-200" />
                <div>
                  <p className="text-blue-100 text-sm">Tạm khóa</p>
                  <p className="text-white text-2xl font-bold">{inactiveUsers}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <ShieldIcon className="w-8 h-8 text-yellow-200" />
                <div>
                  <p className="text-blue-100 text-sm">Quản trị viên</p>
                  <p className="text-white text-2xl font-bold">{adminUsers}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table với design sang trọng */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                <TableHead className="font-bold text-gray-700 py-4">Thông tin cá nhân</TableHead>
                <TableHead className="font-bold text-gray-700">Email</TableHead>
                <TableHead className="font-bold text-gray-700">Vai trò</TableHead>
                <TableHead className="font-bold text-gray-700">Trạng thái</TableHead>
                <TableHead className="font-bold text-gray-700 text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentUsers.map((u, index) => (
                <TableRow 
                  key={u._id} 
                  className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 border-b border-gray-100 ${
                    (startIndex + index) % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                  }`}
                >
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
                        <span className="text-white font-bold text-lg">
                          {u.displayName?.charAt(0).toUpperCase() || 'U'}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{u.displayName}</p>
                        <p className="text-sm text-gray-500">ID: {u._id?.slice(-6)}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MailIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{u.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium shadow-md ${getRoleColor(u.role)}`}>
                      {getRoleIcon(u.role)}
                      <span className="capitalize">{u.role}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium shadow-md ${
                        u.isActive 
                          ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white" 
                          : "bg-gradient-to-r from-red-500 to-rose-600 text-white"
                      }`}
                    >
                      {u.isActive ? (
                        <>
                          <UserCheckIcon className="w-4 h-4" />
                          Hoạt động
                        </>
                      ) : (
                        <>
                          <UserXIcon className="w-4 h-4" />
                          Tạm khóa
                        </>
                      )}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => setViewUser(u)}
                        className="text-gray-600 hover:text-white hover:bg-gray-600 border-gray-300 hover:border-gray-600 transition-all duration-200 shadow-md hover:shadow-lg"
                        title="Xem chi tiết"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditUser(u);
                          setEditFormOpen(true);
                        }}
                        className="text-blue-600 hover:text-white hover:bg-blue-600 border-blue-300 hover:border-blue-600 transition-all duration-200 shadow-md hover:shadow-lg"
                        title="Chỉnh sửa"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleDeleteClick(u)}
                        className="text-red-600 hover:text-white hover:bg-red-600 border-red-300 hover:border-red-600 transition-all duration-200 shadow-md hover:shadow-lg"
                        title="Xóa người dùng"
                      >
                        <Trash2Icon className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {users.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UsersIcon className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium text-lg">Chưa có người dùng nào</p>
              <p className="text-gray-400 text-sm mt-1">Hãy tạo người dùng đầu tiên của bạn</p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {users.length > 0 && totalPages > 1 && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 mt-6 p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Hiển thị <span className="font-bold text-blue-600">{startIndex + 1}</span> đến{' '}
              <span className="font-bold text-blue-600">{Math.min(endIndex, users.length)}</span> trong tổng số{' '}
              <span className="font-bold text-blue-600">{users.length}</span> người dùng
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="hover:bg-blue-50 hover:border-blue-300 disabled:opacity-50"
              >
                <ChevronLeftIcon className="w-4 h-4 mr-1" />
                Trước
              </Button>
              
              <div className="flex gap-1">
                {renderPaginationButtons()}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="hover:bg-blue-50 hover:border-blue-300 disabled:opacity-50"
              >
                Sau
                <ChevronRightIcon className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <UserCreateModal 
        open={createFormOpen} 
        onClose={() => setCreateFormOpen(false)} 
        onSubmit={handleCreateSubmit} 
      />

      <UserFormModal
        open={editFormOpen}
        onClose={() => {
          setEditFormOpen(false);
          setEditUser(null);
        }}
        initial={editUser || undefined}
        onSubmit={handleEditSubmit}
      />

      {/* View User Dialog */}
      <Dialog open={!!viewUser} onOpenChange={() => setViewUser(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <UsersIcon className="w-6 h-6 text-white" />
              </div>
              Chi tiết người dùng
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">
                  {viewUser?.displayName?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{viewUser?.displayName}</h3>
                <p className="text-blue-600 font-medium">{viewUser?.email}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                <p className="text-purple-600 text-sm font-medium mb-1">Vai trò</p>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(viewUser?.role || '')}`}>
                  {getRoleIcon(viewUser?.role || '')}
                  <span className="capitalize">{viewUser?.role}</span>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <p className="text-green-600 text-sm font-medium mb-1">Trạng thái</p>
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                    viewUser?.isActive 
                      ? "bg-green-500 text-white" 
                      : "bg-red-500 text-white"
                  }`}
                >
                  {viewUser?.isActive ? (
                    <>
                      <UserCheckIcon className="w-4 h-4" />
                      Hoạt động
                    </>
                  ) : (
                    <>
                      <UserXIcon className="w-4 h-4" />
                      Tạm khóa
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setViewUser(null)}
              className="border-2 border-gray-300 hover:border-gray-400"
            >
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirm.show} onOpenChange={() => setDeleteConfirm({ show: false, user: null })}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-xl">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangleIcon className="w-6 h-6 text-red-600" />
              </div>
              Xác nhận xóa người dùng
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-800 font-medium">
                Bạn có chắc chắn muốn xóa người dùng này? Hành động này không thể hoàn tác.
              </p>
            </div>
            
            {deleteConfirm.user && (
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">
                      {deleteConfirm.user.displayName?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{deleteConfirm.user.displayName}</p>
                    <p className="text-sm text-gray-600">{deleteConfirm.user.email}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter className="gap-3">
            <Button
              variant="outline"
              onClick={() => setDeleteConfirm({ show: false, user: null })}
              className="border-2 border-gray-300 hover:border-gray-400"
            >
              Hủy bỏ
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
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
