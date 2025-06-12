'use client';

import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { 
    MessageSquareIcon,
    UserIcon,
    CheckCircleIcon,
    XCircleIcon,
    ClockIcon,
    ReplyIcon,
    ThumbsUpIcon,
    ThumbsDownIcon,
    AlertTriangleIcon,
    InfoIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    SendIcon,
    EyeIcon
} from 'lucide-react';
import { toast } from "react-toastify";

type Feedback = {
    id: number;
    user: string;
    message: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    reply?: string;
    timestamp?: string;
    rating?: number;
};

export default function FeedbackPage() {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([
        {
            id: 1,
            user: "Nguyễn Văn A",
            message: "Ứng dụng rất hữu ích nhưng cần cải thiện hiệu năng. Tôi hy vọng các bạn sẽ tối ưu hóa tốc độ tải trang và giảm thời gian phản hồi của hệ thống.",
            status: 'Pending',
            timestamp: "2025-06-10 14:30",
            rating: 4
        },
        {
            id: 2,
            user: "Trần Thị B",
            message: "Tôi rất thích giao diện mới! Thiết kế rất đẹp và dễ sử dụng.",
            status: 'Approved',
            reply: "Cảm ơn bạn rất nhiều! Chúng tôi sẽ tiếp tục cải thiện.",
            timestamp: "2025-06-09 09:15",
            rating: 5
        },
        {
            id: 3,
            user: "Lê Văn C",
            message: "Có một số lỗi trong quá trình thanh toán, mong được khắc phục sớm.",
            status: 'Rejected',
            timestamp: "2025-06-08 16:45",
            rating: 2
        },
    ]);

    const [replyInputsVisible, setReplyInputsVisible] = useState<{ [id: number]: boolean }>({});
    const [replyTexts, setReplyTexts] = useState<{ [id: number]: string }>({});
    const [viewFeedback, setViewFeedback] = useState<Feedback | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; feedback: Feedback | null }>({
        show: false,
        feedback: null
    });
    const [loading, setLoading] = useState(false);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    // Pagination calculations
    const totalPages = Math.ceil(feedbacks.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentFeedbacks = feedbacks.slice(startIndex, endIndex);

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

    const updateStatus = (id: number, status: Feedback['status']) => {
        setFeedbacks(prev =>
            prev.map(fb => fb.id === id ? { ...fb, status } : fb)
        );
        
        const statusText = status === 'Approved' ? 'phê duyệt' : 'từ chối';
        showSuccessToast(`Đã ${statusText} feedback thành công!`);
    };

    const updateReply = (id: number) => {
        const replyText = replyTexts[id];
        if (!replyText?.trim()) {
            showErrorToast("Vui lòng nhập nội dung phản hồi");
            return;
        }

        setFeedbacks(prev =>
            prev.map(fb => fb.id === id ? { ...fb, reply: replyText } : fb)
        );
        setReplyInputsVisible(prev => ({ ...prev, [id]: false }));
        setReplyTexts(prev => ({ ...prev, [id]: '' }));
        showSuccessToast("Đã gửi phản hồi thành công!");
    };

    const getBadgeColor = (status: Feedback['status']) => {
        switch (status) {
            case 'Approved':
                return 'bg-gradient-to-r from-green-500 to-emerald-600 text-white';
            case 'Rejected':
                return 'bg-gradient-to-r from-red-500 to-rose-600 text-white';
            case 'Pending':
            default:
                return 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white';
        }
    };

    const getStatusIcon = (status: Feedback['status']) => {
        switch (status) {
            case 'Approved': return <CheckCircleIcon className="w-4 h-4" />;
            case 'Rejected': return <XCircleIcon className="w-4 h-4" />;
            default: return <ClockIcon className="w-4 h-4" />;
        }
    };

    const getStatusText = (status: Feedback['status']) => {
        switch (status) {
            case 'Approved': return 'Đã duyệt';
            case 'Rejected': return 'Đã từ chối';
            default: return 'Chờ duyệt';
        }
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                ★
            </span>
        ));
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
    const approvedCount = feedbacks.filter(f => f.status === 'Approved').length;
    const pendingCount = feedbacks.filter(f => f.status === 'Pending').length;
    const rejectedCount = feedbacks.filter(f => f.status === 'Rejected').length;
    const avgRating = feedbacks.reduce((sum, f) => sum + (f.rating || 0), 0) / feedbacks.length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
            {/* Header với gradient đẹp */}
            <div className="mb-8">
                <div className="bg-gradient-to-r from-pink-600 via-rose-600 to-red-700 rounded-2xl p-8 text-white shadow-2xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                <MessageSquareIcon className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold mb-2">Quản lý Feedback</h1>
                                <p className="text-blue-100 text-lg">Quản lý và phản hồi ý kiến từ người dùng</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                            <div className="flex items-center gap-3">
                                <MessageSquareIcon className="w-8 h-8 text-blue-200" />
                                <div>
                                    <p className="text-blue-100 text-sm">Tổng feedback</p>
                                    <p className="text-white text-2xl font-bold">{feedbacks.length}</p>
                                    <p className="text-blue-200 text-xs">Trang {currentPage}/{totalPages || 1}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                            <div className="flex items-center gap-3">
                                <CheckCircleIcon className="w-8 h-8 text-green-200" />
                                <div>
                                    <p className="text-blue-100 text-sm">Đã duyệt</p>
                                    <p className="text-white text-2xl font-bold">{approvedCount}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                            <div className="flex items-center gap-3">
                                <ClockIcon className="w-8 h-8 text-yellow-200" />
                                <div>
                                    <p className="text-blue-100 text-sm">Chờ duyệt</p>
                                    <p className="text-white text-2xl font-bold">{pendingCount}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                            <div className="flex items-center gap-3">
                                <div className="text-yellow-200 text-2xl">★</div>
                                <div>
                                    <p className="text-blue-100 text-sm">Đánh giá TB</p>
                                    <p className="text-white text-2xl font-bold">{avgRating.toFixed(1)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table với design sang trọng */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                        <MessageSquareIcon className="w-6 h-6 text-blue-600" />
                        Danh sách feedback
                        <span className="text-sm font-normal text-gray-500">
                            ({currentFeedbacks.length} / {feedbacks.length})
                        </span>
                    </h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left font-bold text-gray-700 min-w-[180px]">Người dùng</th>
                                <th className="px-6 py-4 text-left font-bold text-gray-700 min-w-[300px]">Nội dung</th>
                                <th className="px-6 py-4 text-center font-bold text-gray-700 min-w-[120px]">Trạng thái</th>
                                <th className="px-6 py-4 text-left font-bold text-gray-700 min-w-[250px]">Phản hồi</th>
                                <th className="px-6 py-4 text-center font-bold text-gray-700 min-w-[200px]">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentFeedbacks.map((fb, index) => (
                                <tr 
                                    key={fb.id}
                                    className={`border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 ${
                                        (startIndex + index) % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                                    }`}
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center shadow-md">
                                                <span className="text-white font-bold text-sm">
                                                    {fb.user.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">{fb.user}</p>
                                                <p className="text-xs text-gray-500">{fb.timestamp}</p>
                                                {fb.rating && (
                                                    <div className="flex gap-1 mt-1">
                                                        {renderStars(fb.rating)}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="max-w-xs">
                                            <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                                                {fb.message.length > 100 
                                                    ? fb.message.substring(0, 100) + '...' 
                                                    : fb.message
                                                }
                                            </p>
                                            {fb.message.length > 100 && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setViewFeedback(fb)}
                                                    className="text-blue-600 hover:text-blue-800 p-0 h-auto mt-1"
                                                >
                                                    Xem thêm
                                                </Button>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium shadow-md ${getBadgeColor(fb.status)}`}>
                                            {getStatusIcon(fb.status)}
                                            {getStatusText(fb.status)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {replyInputsVisible[fb.id] ? (
                                            <div className="space-y-3">
                                                <Textarea
                                                    className="min-h-[80px] text-sm border-2 border-blue-300 focus:border-blue-500"
                                                    placeholder="Nhập phản hồi của bạn..."
                                                    value={replyTexts[fb.id] || ''}
                                                    onChange={(e) => setReplyTexts(prev => ({ ...prev, [fb.id]: e.target.value }))}
                                                />
                                                <div className="flex gap-2">
                                                    <Button
                                                        size="sm"
                                                        onClick={() => updateReply(fb.id)}
                                                        className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md"
                                                    >
                                                        <SendIcon className="w-4 h-4 mr-1" />
                                                        Gửi
                                                    </Button>
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm"
                                                        onClick={() => {
                                                            setReplyInputsVisible(prev => ({ ...prev, [fb.id]: false }));
                                                            setReplyTexts(prev => ({ ...prev, [fb.id]: '' }));
                                                        }}
                                                    >
                                                        Hủy
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            fb.reply ? (
                                                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                                    <p className="text-gray-700 text-sm leading-relaxed">{fb.reply}</p>
                                                </div>
                                            ) : (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setReplyInputsVisible(prev => ({ ...prev, [fb.id]: true }))}
                                                    className="text-blue-600 hover:text-white hover:bg-blue-600 border-blue-300 hover:border-blue-600"
                                                >
                                                    <ReplyIcon className="w-4 h-4 mr-1" />
                                                    Trả lời
                                                </Button>
                                            )
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2 justify-center">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => updateStatus(fb.id, 'Approved')}
                                                className="text-green-600 hover:text-white hover:bg-green-600 border-green-300 hover:border-green-600 transition-all duration-200 shadow-md hover:shadow-lg"
                                                title="Phê duyệt"
                                            >
                                                <ThumbsUpIcon className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => updateStatus(fb.id, 'Rejected')}
                                                className="text-red-600 hover:text-white hover:bg-red-600 border-red-300 hover:border-red-600 transition-all duration-200 shadow-md hover:shadow-lg"
                                                title="Từ chối"
                                            >
                                                <ThumbsDownIcon className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => setViewFeedback(fb)}
                                                className="text-gray-600 hover:text-white hover:bg-gray-600 border-gray-300 hover:border-gray-600 transition-all duration-200 shadow-md hover:shadow-lg"
                                                title="Xem chi tiết"
                                            >
                                                <EyeIcon className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {feedbacks.length === 0 && (
                        <div className="text-center py-16">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MessageSquareIcon className="w-12 h-12 text-gray-400" />
                            </div>
                            <p className="text-gray-500 font-medium text-lg">Chưa có feedback nào</p>
                            <p className="text-gray-400 text-sm mt-1">Feedback từ người dùng sẽ hiển thị ở đây</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Pagination */}
            {feedbacks.length > 0 && totalPages > 1 && (
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 mt-6 p-6">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Hiển thị <span className="font-bold text-blue-600">{startIndex + 1}</span> đến{' '}
                            <span className="font-bold text-blue-600">{Math.min(endIndex, feedbacks.length)}</span> trong tổng số{' '}
                            <span className="font-bold text-blue-600">{feedbacks.length}</span> feedback
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

            {/* View Feedback Dialog */}
            <Dialog open={!!viewFeedback} onOpenChange={() => setViewFeedback(null)}>
                <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-3 text-2xl">
                            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center">
                                <MessageSquareIcon className="w-6 h-6 text-white" />
                            </div>
                            Chi tiết feedback
                        </DialogTitle>
                    </DialogHeader>
                    
                    {viewFeedback && (
                        <div className="space-y-6 py-4">
                            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-200">
                                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center shadow-lg">
                                    <span className="text-white font-bold text-2xl">
                                        {viewFeedback.user.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{viewFeedback.user}</h3>
                                    <p className="text-pink-600 font-medium">{viewFeedback.timestamp}</p>
                                    {viewFeedback.rating && (
                                        <div className="flex gap-1 mt-1">
                                            {renderStars(viewFeedback.rating)}
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                <p className="text-gray-600 text-sm font-medium mb-2">Nội dung feedback</p>
                                <p className="text-gray-900 leading-relaxed">
                                    {viewFeedback.message}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                                    <p className="text-blue-600 text-sm font-medium mb-1">Trạng thái</p>
                                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getBadgeColor(viewFeedback.status)}`}>
                                        {getStatusIcon(viewFeedback.status)}
                                        {getStatusText(viewFeedback.status)}
                                    </div>
                                </div>
                                
                                {viewFeedback.rating && (
                                    <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                                        <p className="text-yellow-600 text-sm font-medium mb-1">Đánh giá</p>
                                        <div className="flex gap-1">
                                            {renderStars(viewFeedback.rating)}
                                            <span className="ml-2 text-yellow-700 font-bold">
                                                {viewFeedback.rating}/5
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {viewFeedback.reply && (
                                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                                    <p className="text-green-600 text-sm font-medium mb-2">Phản hồi của bạn</p>
                                    <p className="text-green-900 leading-relaxed">
                                        {viewFeedback.reply}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                    
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setViewFeedback(null)}
                            className="border-2 border-gray-300 hover:border-gray-400"
                        >
                            Đóng
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
