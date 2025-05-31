"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const mockFeedbacks: Feedback[] = [
    {
        _id: "f1",
        type: "Đơn xin đổi lịch giảng dạy",
        content: `Kính gửi Admin: Do lý do sức khỏe, tôi xin phép đổi lịch dạy môn Toán 12 lớp BE-201 ngày 14/5/2025 sang ngày 18/5/2025.
Mong admin hỗ trợ xác nhận và cập nhật trên hệ thống.
Trân trọng!
- Nguyễn Văn Nam (GV Toán)`,
        createdAt: "13/05/2025",
        status: "Đã duyệt",
        processNote: "Admin đã xác nhận và cập nhật lịch mới.",
        adminReply: "Lịch dạy mới đã được cập nhật, thầy kiểm tra lại trên hệ thống nhé!",
        repliedAt: "14/05/2025 08:15",
        file: "",
    },
    {
        _id: "f2",
        type: "Phản ánh sự cố lớp học",
        content: `Thưa admin, phòng BE-202 sáng nay thiết bị trình chiếu không hoạt động, ảnh hưởng đến giờ học môn Tiếng Anh 12. 
Đề nghị bộ phận kỹ thuật kiểm tra và khắc phục trước buổi chiều.
Xin cảm ơn! 
- Trần Thị Hoa (GV Tiếng Anh)`,
        createdAt: "15/05/2025",
        status: "Đã xử lý",
        processNote: "Bộ phận kỹ thuật đã tiếp nhận và xử lý.",
        adminReply: "Sự cố đã được khắc phục xong. Cảm ơn cô đã phản ánh.",
        repliedAt: "15/05/2025 14:20",
        file: "",
    },
    {
        _id: "f3",
        type: "Đề nghị xét duyệt bổ sung tài liệu môn học",
        content: `Kính gửi admin: Tôi đề nghị bổ sung tài liệu tham khảo mới cho môn Toán 12 (bộ tài liệu PDF đính kèm). 
Hy vọng tài liệu sẽ hỗ trợ tốt cho học sinh trong kỳ thi sắp tới.
Trân trọng!
- Nguyễn Văn Nam`,
        createdAt: "12/05/2025",
        status: "Chờ duyệt",
        processNote: "",
        adminReply: "",
        repliedAt: "",
        file: "https://drive.google.com/yourfilelink",
    },
];

export default function FeedbacksPage() {
    // Lưu vào localStorage
    const [feedbacks, setFeedbacks] = useState<Feedback[]>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("feedbacks");
            if (saved) return JSON.parse(saved);
        }
        return mockFeedbacks;
    });

    const [open, setOpen] = useState(false);
    const [type, setType] = useState("");
    const [content, setContent] = useState("");
    const [filter, setFilter] = useState("");

    // Mỗi khi feedbacks thay đổi, lưu lại localStorage
    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
        }
    }, [feedbacks]);

    const handleSubmit = () => {
        setFeedbacks(prev => [
            {
                _id: Date.now().toString(),
                type,
                content,
                createdAt: new Date().toLocaleDateString(),
                status: "Chờ duyệt",
                processNote: "",
                adminReply: "",
            },
            ...prev,
        ]);
        setType("");
        setContent("");
        setOpen(false);
    };

    const getStatusTextColor = (status: string) => {
        if (status.includes("Chờ")) return "text-yellow-600 font-semibold";
        if (status.includes("duyệt")) return "text-green-600 font-semibold";
        if (status.includes("xử lý")) return "text-blue-600 font-semibold";
        if (status.includes("Từ chối")) return "text-red-600 font-semibold";
        return "text-gray-700";
    };

    // Lọc theo từ khoá
    const filteredFeedbacks = feedbacks.filter((f) =>
        (f.type + f.content + f.status + f.processNote + (f.adminReply || "")).toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">📋 Phản hồi & Đơn từ</h1>

            <div className="flex flex-col sm:flex-row justify-between mb-3 gap-2">
                <Button onClick={() => setOpen(true)}>+ Gửi phản hồi mới</Button>
                <Input
                    className="sm:max-w-xs"
                    placeholder="Tìm kiếm nhanh..."
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                />
            </div>

            <div className="overflow-auto rounded-lg border">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100 text-left font-semibold">
                        <tr>
                            <th className="p-3">Loại</th>
                            <th className="p-3">Nội dung phản hồi</th>
                            <th className="p-3">Ngày gửi</th>
                            <th className="p-3">Ghi chú xử lý</th>
                            <th className="p-3">Trạng thái</th>
                            <th className="p-3">Phản hồi từ admin</th>
                            <th className="p-3">Ngày trả lời</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredFeedbacks.length ? filteredFeedbacks.map((f) => (
                            <tr key={f._id} className="border-t">
                                <td className="p-3">{f.type}</td>
                                <td className="p-3 max-w-[360px] whitespace-pre-line">{f.content}</td>
                                <td className="p-3">{f.createdAt}</td>
                                <td className="p-3">{f.processNote}</td>
                                <td className={`p-3 ${getStatusTextColor(f.status)}`}>
                                    {f.status}
                                </td>
                                <td className="p-3 max-w-[320px] whitespace-pre-line">
                                    {f.adminReply ? (
                                        <span className="text-green-600">{f.adminReply}</span>
                                    ) : (
                                        <span className="italic text-gray-400">Chưa có phản hồi</span>
                                    )}
                                </td>
                                <td className="p-3">{f.repliedAt || "--"}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={7} className="p-3 text-center text-gray-500 italic">
                                    Không có kết quả phù hợp.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal gửi phản hồi */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Gửi phản hồi / Đơn từ mới</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <Input
                            placeholder="Loại đơn, ví dụ: Đăng ký, Khiếu nại, ... "
                            value={type}
                            onChange={e => setType(e.target.value)}
                        />
                        <Textarea
                            placeholder="Nhập nội dung phản hồi hoặc đơn từ..."
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            rows={5}
                        />
                        <div className="flex justify-end gap-2">
                            <Button variant="ghost" onClick={() => setOpen(false)}>Hủy</Button>
                            <Button onClick={handleSubmit} disabled={!type || !content}>Gửi</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

// Đừng quên khai báo Feedback interface hoặc import nếu tách file
interface Feedback {
    _id: string;
    type: string;
    content: string;
    createdAt: string;
    status: string;
    processNote: string;
    adminReply?: string;
    repliedAt?: string;
    file?: string;
}
