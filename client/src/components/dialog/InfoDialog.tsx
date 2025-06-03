"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function InfoDialog({ open, setOpen }: any) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        role: "",
        center: "",
        students: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        console.log("Thông tin người dùng:", form);
        // Gửi API hoặc xử lý dữ liệu tại đây
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>

            <DialogContent className="max-w-md z-[1300]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Đăng ký thông tin</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-2">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Họ và Tên</Label>
                        <Input name="name" value={form.name} onChange={handleChange} placeholder="Nguyễn Văn A" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="abc@example.com" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="phone">Số điện thoại</Label>
                        <Input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="0123 456 789" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="role">Chức vụ/Vai trò</Label>
                        <Input name="role" value={form.role} onChange={handleChange} placeholder="Giáo viên / Quản lý..." />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="center">Tên trung tâm</Label>
                        <Input name="center" value={form.center} onChange={handleChange} placeholder="Trung tâm XYZ" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="students">Số lượng học viên</Label>
                        <Input name="students" type="number" value={form.students} onChange={handleChange} placeholder="50" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="message">Tin nhắn</Label>
                        <Textarea name="message" value={form.message} onChange={handleChange} placeholder="Nội dung bạn muốn chia sẻ..." />
                    </div>
                </div>
                <Button onClick={handleSubmit} className="w-full bg-[#1dd1a1] hover:bg-[#10ac84] text-white">Gửi thông tin</Button>
            </DialogContent>
        </Dialog>
    );
}
