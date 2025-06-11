'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

type Notification = {
    id: number;
    title: string;
    message: string;
    createdAt: Date;
};

export default function NotificationAdminPage() {
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: 1,
            title: 'Cập nhật hệ thống',
            message: 'Hệ thống sẽ được bảo trì vào lúc 23:00 đêm nay.',
            createdAt: new Date(),
        },
        {
            id: 2,
            title: 'Chào mừng',
            message: 'Chào mừng bạn đến với hệ thống quản lý!',
            createdAt: new Date(),
        },
    ]);

    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    const handleCreateNotification = () => {
        if (!title.trim() || !message.trim()) {
            alert('Vui lòng nhập đầy đủ tiêu đề và nội dung.');
            return;
        }

        const newNotification: Notification = {
            id: notifications.length + 1,
            title,
            message,
            createdAt: new Date(),
        };

        setNotifications(prev => [newNotification, ...prev]);
        setTitle('');
        setMessage('');
        alert('🔔 Đã gửi thông báo đến tất cả người dùng!');
    };

    return (
        <div className="p-6 max-w-4xl mx-auto w-full">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">🔔 Quản lý Thông báo</h1>

            {/* Form tạo thông báo */}
            <Card className="mb-6">
                <CardContent className="p-6 space-y-4">
                    <h2 className="text-lg font-semibold text-gray-700">📤 Gửi thông báo mới</h2>
                    <Input
                        placeholder="Tiêu đề thông báo"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Textarea
                        placeholder="Nội dung thông báo..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="min-h-[100px]"
                    />
                    <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={handleCreateNotification}>
                        ➕ Tạo thông báo
                    </Button>
                </CardContent>
            </Card>

            {/* Danh sách thông báo */}
            <Card>
                <CardContent className="p-0">
                    <ScrollArea className="h-[calc(100vh-300px)]">
                        <ul className="divide-y divide-gray-200">
                            {notifications.map(notif => (
                                <li key={notif.id} className="p-5 hover:bg-gray-50">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-md font-semibold text-gray-800">{notif.title}</h3>
                                            <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">
                                                {notif.message}
                                            </p>
                                        </div>
                                        <span className="text-xs text-gray-400 ml-4 mt-1 whitespace-nowrap">
                                            {notif.createdAt.toLocaleString()}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
}
