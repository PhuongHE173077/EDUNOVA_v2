'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { 
    BellIcon,
    SendIcon,
    PlusIcon,
    EyeIcon,
    Trash2Icon,
    CheckCircleIcon,
    XCircleIcon,
    AlertTriangleIcon,
    InfoIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    CalendarIcon,
    MessageSquareIcon
} from 'lucide-react';
import { toast } from "react-toastify";

type Notification = {
    id: number;
    title: string;
    message: string;
    createdAt: Date;
    type?: 'info' | 'warning' | 'success' | 'error';
    priority?: 'low' | 'medium' | 'high';
};

export default function NotificationAdminPage() {
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: 1,
            title: 'Cập nhật hệ thống',
            message: 'Hệ thống sẽ được bảo trì vào lúc 23:00 đêm nay. Trong thời gian này, một số chức năng có thể bị gián đoạn.',
            createdAt: new Date('2025-06-11T10:30:00'),
            type: 'warning',
            priority: 'high'
        },
        {
            id: 2,
            title: 'Chào mừng',
            message: 'Chào mừng bạn đến với hệ thống quản lý! Hãy khám phá các tính năng mới.',
            createdAt: new Date('2025-06-10T14:15:00'),
            type: 'success',
            priority: 'medium'
        },
        {
            id: 3,
            title: 'Thông báo bảo mật',
            message: 'Vui lòng cập nhật mật khẩu của bạn để đảm bảo tính bảo mật.',
            createdAt: new Date('2025-06-09T09:00:00'),
            type: 'error',
            priority: 'high'
        },
    ]);

    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [type, setType] = useState<'info' | 'warning' | 'success' | 'error'>('info');
    const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
    const [viewNotification, setViewNotification] = useState<Notification | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; notification: Notification | null }>({
        show: false,
        notification: null
    });
    const [loading, setLoading] = useState(false);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    // Pagination calculations
    const totalPages = Math.ceil(notifications.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentNotifications = notifications.slice(startIndex, endIndex);

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

    const handleCreateNotification = () => {
        if (!title.trim() || !message.trim()) {
            showErrorToast('Vui lòng nhập đầy đủ tiêu đề và nội dung');
            return;
        }

        setLoading(true);
        
        const newNotification: Notification = {
            id: Date.now(),
            title: title.trim(),
            message: message.trim(),
            type,
            priority,
            createdAt: new Date(),
        };

        setTimeout(() => {
            setNotifications(prev => [newNotification, ...prev]);
            setTitle('');
            setMessage('');
            setType('info');
            setPriority('medium');
            showSuccessToast('Đã gửi thông báo đến tất cả người dùng!');
            setLoading(false);
        }, 1000);
    };

    const handleDeleteClick = (notification: Notification) => {
        setDeleteConfirm({ show: true, notification });
    };

    const confirmDelete = async () => {
        if (!deleteConfirm.notification) return;
        
        setLoading(true);
        try {
            setNotifications(prev => prev.filter(n => n.id !== deleteConfirm.notification!.id));
            showSuccessToast("Xóa thông báo thành công!");
            setDeleteConfirm({ show: false, notification: null });
            
            // Điều chỉnh trang hiện tại nếu cần
            const newTotalPages = Math.ceil((notifications.length - 1) / itemsPerPage);
            if (currentPage > newTotalPages && newTotalPages > 0) {
                setCurrentPage(newTotalPages);
            }
        } catch (error) {
            showErrorToast("Xóa thông báo thất bại");
        } finally {
            setLoading(false);
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'success': return 'bg-gradient-to-r from-green-500 to-emerald-600 text-white';
            case 'warning': return 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white';
            case 'error': return 'bg-gradient-to-r from-red-500 to-rose-600 text-white';
            default: return 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'success': return <CheckCircleIcon className="w-4 h-4" />;
            case 'warning': return <AlertTriangleIcon className="w-4 h-4" />;
            case 'error': return <XCircleIcon className="w-4 h-4" />;
            default: return <InfoIcon className="w-4 h-4" />;
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'bg-red-100 text-red-700 border-red-200';
            case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            default: return 'bg-green-100 text-green-700 border-green-200';
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

    // Statistics
    const highPriorityCount = notifications.filter(n => n.priority === 'high').length;
    const todayCount = notifications.filter(n => 
        new Date(n.createdAt).toDateString() === new Date().toDateString()
    ).length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
            {/* Header với gradient đẹp */}
            <div className="mb-8">
                <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-700 rounded-2xl p-8 text-white shadow-2xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                <BellIcon className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold mb-2">Quản lý Thông báo</h1>
                                <p className="text-blue-100 text-lg">Gửi và quản lý thông báo đến tất cả người dùng</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                            <div className="flex items-center gap-3">
                                <BellIcon className="w-8 h-8 text-blue-200" />
                                <div>
                                    <p className="text-blue-100 text-sm">Tổng thông báo</p>
                                    <p className="text-white text-2xl font-bold">{notifications.length}</p>
                                    <p className="text-blue-200 text-xs">Trang {currentPage}/{totalPages || 1}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                            <div className="flex items-center gap-3">
                                <AlertTriangleIcon className="w-8 h-8 text-red-200" />
                                <div>
                                    <p className="text-blue-100 text-sm">Ưu tiên cao</p>
                                    <p className="text-white text-2xl font-bold">{highPriorityCount}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                            <div className="flex items-center gap-3">
                                <CalendarIcon className="w-8 h-8 text-green-200" />
                                <div>
                                    <p className="text-blue-100 text-sm">Hôm nay</p>
                                    <p className="text-white text-2xl font-bold">{todayCount}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                            <div className="flex items-center gap-3">
                                <MessageSquareIcon className="w-8 h-8 text-purple-200" />
                                <div>
                                    <p className="text-blue-100 text-sm">Đang hiển thị</p>
                                    <p className="text-white text-2xl font-bold">{currentNotifications.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto space-y-8">
                {/* Form tạo thông báo */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                            <SendIcon className="w-6 h-6 text-blue-600" />
                            Gửi thông báo mới
                        </h2>
                    </div>
                    
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Tiêu đề thông báo</label>
                                <Input
                                    placeholder="Nhập tiêu đề thông báo..."
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="h-12 border-2 border-gray-300 focus:border-blue-500"
                                />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Loại thông báo</label>
                                    <select
                                        value={type}
                                        onChange={(e) => setType(e.target.value as any)}
                                        className="w-full h-12 border-2 border-gray-300 rounded-md px-3 focus:border-blue-500 focus:outline-none"
                                    >
                                        <option value="info">Thông tin</option>
                                        <option value="success">Thành công</option>
                                        <option value="warning">Cảnh báo</option>
                                        <option value="error">Lỗi</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Mức độ ưu tiên</label>
                                    <select
                                        value={priority}
                                        onChange={(e) => setPriority(e.target.value as any)}
                                        className="w-full h-12 border-2 border-gray-300 rounded-md px-3 focus:border-blue-500 focus:outline-none"
                                    >
                                        <option value="low">Thấp</option>
                                        <option value="medium">Trung bình</option>
                                        <option value="high">Cao</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Nội dung thông báo</label>
                            <Textarea
                                placeholder="Nhập nội dung thông báo..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="min-h-[120px] border-2 border-gray-300 focus:border-blue-500"
                            />
                        </div>
                        
                        <Button 
                            onClick={handleCreateNotification}
                            disabled={loading}
                            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                                    Đang gửi...
                                </>
                            ) : (
                                <>
                                    <PlusIcon className="w-5 h-5 mr-2" />
                                    Tạo và gửi thông báo
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                {/* Danh sách thông báo */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                            <BellIcon className="w-6 h-6 text-blue-600" />
                            Danh sách thông báo
                            <span className="text-sm font-normal text-gray-500">
                                ({currentNotifications.length} / {notifications.length})
                            </span>
                        </h2>
                    </div>

                    <div className="divide-y divide-gray-200">
                        {currentNotifications.length > 0 ? (
                            currentNotifications.map((notif, index) => (
                                <div 
                                    key={notif.id}
                                    className={`p-6 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 ${
                                        (startIndex + index) % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                                    }`}
                                >
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center shadow-md">
                                                    <span className="text-white font-bold text-sm">
                                                        {notif.title.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900">{notif.title}</h3>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(notif.type || 'info')}`}>
                                                            {getTypeIcon(notif.type || 'info')}
                                                            {notif.type || 'info'}
                                                        </div>
                                                        <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(notif.priority || 'medium')}`}>
                                                            {notif.priority || 'medium'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <p className="text-gray-700 leading-relaxed mb-3">
                                                {notif.message.length > 150 
                                                    ? notif.message.substring(0, 150) + '...' 
                                                    : notif.message
                                                }
                                            </p>
                                            
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <CalendarIcon className="w-4 h-4" />
                                                <span>{notif.createdAt.toLocaleString('vi-VN')}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => setViewNotification(notif)}
                                                className="text-gray-600 hover:text-white hover:bg-gray-600 border-gray-300 hover:border-gray-600 transition-all duration-200 shadow-md hover:shadow-lg"
                                                title="Xem chi tiết"
                                            >
                                                <EyeIcon className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleDeleteClick(notif)}
                                                className="text-red-600 hover:text-white hover:bg-red-600 border-red-300 hover:border-red-600 transition-all duration-200 shadow-md hover:shadow-lg"
                                                title="Xóa thông báo"
                                            >
                                                <Trash2Icon className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-16">
                                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <BellIcon className="w-12 h-12 text-gray-400" />
                                </div>
                                <p className="text-gray-500 font-medium text-lg">Chưa có thông báo nào</p>
                                <p className="text-gray-400 text-sm mt-1">Hãy tạo thông báo đầu tiên của bạn</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Pagination */}
                {notifications.length > 0 && totalPages > 1 && (
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-700">
                                Hiển thị <span className="font-bold text-blue-600">{startIndex + 1}</span> đến{' '}
                                <span className="font-bold text-blue-600">{Math.min(endIndex, notifications.length)}</span> trong tổng số{' '}
                                <span className="font-bold text-blue-600">{notifications.length}</span> thông báo
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
            </div>

            {/* View Notification Dialog */}
            <Dialog open={!!viewNotification} onOpenChange={() => setViewNotification(null)}>
                <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-3 text-2xl">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center">
                                <BellIcon className="w-6 h-6 text-white" />
                            </div>
                            Chi tiết thông báo
                        </DialogTitle>
                    </DialogHeader>
                    
                    {viewNotification && (
                        <div className="space-y-6 py-4">
                            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-200">
                                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                                    <span className="text-white font-bold text-2xl">
                                        {viewNotification.title.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{viewNotification.title}</h3>
                                    <p className="text-orange-600 font-medium">{viewNotification.createdAt.toLocaleString('vi-VN')}</p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                                    <p className="text-blue-600 text-sm font-medium mb-1">Loại thông báo</p>
                                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(viewNotification.type || 'info')}`}>
                                        {getTypeIcon(viewNotification.type || 'info')}
                                        {viewNotification.type || 'info'}
                                    </div>
                                </div>
                                
                                <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                                    <p className="text-yellow-600 text-sm font-medium mb-1">Mức độ ưu tiên</p>
                                    <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(viewNotification.priority || 'medium')}`}>
                                        {viewNotification.priority || 'medium'}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                <p className="text-gray-600 text-sm font-medium mb-2">Nội dung thông báo</p>
                                <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">
                                    {viewNotification.message}
                                </p>
                            </div>
                        </div>
                    )}
                    
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setViewNotification(null)}
                            className="border-2 border-gray-300 hover:border-gray-400"
                        >
                            Đóng
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteConfirm.show} onOpenChange={() => setDeleteConfirm({ show: false, notification: null })}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-3 text-xl">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                <AlertTriangleIcon className="w-6 h-6 text-red-600" />
                            </div>
                            Xác nhận xóa thông báo
                        </DialogTitle>
                    </DialogHeader>
                    
                    <div className="py-4">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                            <p className="text-red-800 font-medium">
                                Bạn có chắc chắn muốn xóa thông báo này? Hành động này không thể hoàn tác.
                            </p>
                        </div>
                        
                        {deleteConfirm.notification && (
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold">
                                            {deleteConfirm.notification.title.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{deleteConfirm.notification.title}</p>
                                        <p className="text-sm text-gray-600">{deleteConfirm.notification.createdAt.toLocaleString('vi-VN')}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <DialogFooter className="gap-3">
                        <Button
                            variant="outline"
                            onClick={() => setDeleteConfirm({ show: false, notification: null })}
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
