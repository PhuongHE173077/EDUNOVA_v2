'use client';

import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

type Feedback = {
    id: number;
    user: string;
    message: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    reply?: string;
};

export default function FeedbackPage() {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([
        {
            id: 1,
            user: "Nguyễn Văn A",
            message: "Ứng dụng rất hữu ích nhưng cần cải thiện hiệu năng.",
            status: 'Pending',
        },
        {
            id: 2,
            user: "Trần Thị B",
            message: "Tôi rất thích giao diện mới!",
            status: 'Approved',
            reply: "Cảm ơn bạn rất nhiều!",
        },
    ]);

    const [replyInputsVisible, setReplyInputsVisible] = useState<{ [id: number]: boolean }>({});

    const updateStatus = (id: number, status: Feedback['status']) => {
        setFeedbacks(prev =>
            prev.map(fb => fb.id === id ? { ...fb, status } : fb)
        );
    };

    const updateReply = (id: number, reply: string) => {
        setFeedbacks(prev =>
            prev.map(fb => fb.id === id ? { ...fb, reply } : fb)
        );
        setReplyInputsVisible(prev => ({ ...prev, [id]: false }));
    };

    const getBadgeColor = (status: Feedback['status']) => {
        switch (status) {
            case 'Approved':
                return 'bg-green-100 text-green-700';
            case 'Rejected':
                return 'bg-red-100 text-red-700';
            case 'Pending':
            default:
                return 'bg-yellow-100 text-yellow-700';
        }
    };

    return (
        <div className="p-6 w-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">📬 Quản lý Feedback</h1>

            <Card className="overflow-auto rounded-xl shadow border border-gray-200">
                <ScrollArea className="h-[calc(100vh-200px)]">
                    <table className="min-w-full text-sm text-gray-700">
                        <thead className="sticky top-0 bg-gray-50 z-10">
                            <tr className="text-left border-b border-gray-200">
                                <th className="p-3 w-[150px]">👤 Người dùng</th>
                                <th className="p-3">💬 Nội dung</th>
                                <th className="p-3 w-[120px]">📌 Trạng thái</th>
                                <th className="p-3 w-[250px]">✏️ Phản hồi</th>
                                <th className="p-3 w-[240px]">⚙️ Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feedbacks.map(fb => (
                                <tr key={fb.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="p-3">{fb.user}</td>
                                    <td className="p-3 line-clamp-2 max-w-[300px]" title={fb.message}>
                                        {fb.message}
                                    </td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(fb.status)}`}>
                                            {fb.status}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        {replyInputsVisible[fb.id] ? (
                                            <div className="space-y-2">
                                                <Textarea
                                                    className="min-h-[60px] text-sm"
                                                    placeholder="Nhập phản hồi..."
                                                    value={fb.reply || ''}
                                                    onChange={(e) => updateReply(fb.id, e.target.value)}
                                                />
                                                <div className="flex gap-2">
                                                    <Button
                                                        className="bg-blue-600 text-white hover:bg-blue-700"
                                                        onClick={() => {
                                                            if (!fb.reply) return;
                                                            alert('Đã gửi phản hồi!');
                                                        }}
                                                    >
                                                        Gửi
                                                    </Button>
                                                    <Button variant="outline" onClick={() =>
                                                        setReplyInputsVisible(prev => ({ ...prev, [fb.id]: false }))
                                                    }>
                                                        Hủy
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            fb.reply ? (
                                                <div className="text-gray-700 text-sm">{fb.reply}</div>
                                            ) : (
                                                <Button
                                                    variant="ghost"
                                                    className="text-blue-600 hover:underline text-sm"
                                                    onClick={() => setReplyInputsVisible(prev => ({ ...prev, [fb.id]: true }))}
                                                >
                                                    ✏️ Trả lời
                                                </Button>
                                            )
                                        )}
                                    </td>
                                    <td className="p-3 space-x-2 flex ">
                                        <Button
                                            variant="outline"
                                            className="text-green-700 bg-green-100 hover:bg-green-200"
                                            onClick={() => updateStatus(fb.id, 'Approved')}
                                        >
                                            ✅ Approve
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="text-red-700 bg-red-100 hover:bg-red-200"
                                            onClick={() => updateStatus(fb.id, 'Rejected')}
                                        >
                                            ❌ Reject
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </ScrollArea>
            </Card>
        </div>
    );
}
