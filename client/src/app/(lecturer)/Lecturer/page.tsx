'use client'

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Users, BookOpen, CalendarCheck, Megaphone, TrendingUp, LogOut } from 'lucide-react'

export default function TeacherOverview() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14 ring-2 ring-primary">
                        <AvatarImage src="https://i.pravatar.cc/150?img=11" />
                        <AvatarFallback>GV</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-xl font-bold text-gray-800">Chào mừng, Thầy/Cô</p>
                        <p className="text-sm text-gray-500">Giáo viên môn Toán - Trường THPT Việt Đức</p>
                    </div>
                </div>

            </div>

            <Separator className="mb-6" />

            {/* Cards Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Lớp đang dạy</CardTitle>
                        <Users className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">Lớp 10A1, 11B2, 12C3</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Bài giảng trong tuần</CardTitle>
                        <BookOpen className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">Đã lên kế hoạch</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Lịch dạy</CardTitle>
                        <CalendarCheck className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5</div>
                        <p className="text-xs text-muted-foreground">Ca dạy tuần này</p>
                    </CardContent>
                </Card>
            </div>

            {/* Extra Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Tiến độ giảng dạy</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Chương 1: Hàm số và đồ thị</span>
                            <span className="text-sm font-semibold">100%</span>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Chương 2: Giới hạn và liên tục</span>
                            <span className="text-sm font-semibold">70%</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Chương 3: Đạo hàm và ứng dụng</span>
                            <span className="text-sm font-semibold">30%</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Thông báo mới</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-muted-foreground">
                        <div className="flex items-start gap-2">
                            <Megaphone className="w-4 h-4 mt-1 text-primary" />
                            <p><strong>Phòng đào tạo:</strong> Nộp giáo án tuần tới trước Thứ 5.</p>
                        </div>
                        <div className="flex items-start gap-2">
                            <Megaphone className="w-4 h-4 mt-1 text-primary" />
                            <p><strong>Ban giám hiệu:</strong> Dự họp giao ban chiều Thứ 6 lúc 14h.</p>
                        </div>
                        <div className="flex items-start gap-2">
                            <Megaphone className="w-4 h-4 mt-1 text-primary" />
                            <p><strong>Admin:</strong> Hệ thống cập nhật giao diện mới.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
