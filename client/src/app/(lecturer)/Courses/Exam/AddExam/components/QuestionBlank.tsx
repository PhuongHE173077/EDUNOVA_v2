import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchQuestionBank } from "@/apis/question.bank";
import { set } from "date-fns";

const mockQuestions = [
    { id: 1, title: "Đề thi giữa kỳ Toán 2025" },
    { id: 2, title: "Đề ôn tập hình học lớp 11" },
    { id: 3, title: "Đề kiểm tra đại số chương 3" },
    { id: 4, title: "Đề tổng hợp ôn tập toán học" },
    { id: 5, title: "Đề kiểm tra định kỳ học kỳ 1" },
    { id: 6, title: "Đề kiểm tra học kỳ 2" },
    { id: 7, title: "Đề ôn thi cuối năm" },
];

const ITEMS_PER_PAGE = 4;

export default function QuestionDialog({ open, setOpen, setQs }: { open: boolean; setOpen: (open: boolean) => void, setQs: any }) {
    const [questions, setQuestions] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchQuestionBank().then((res) => {
            setQuestions(res.data);
        });
    }, [open]);

    const handleApply = (id: number) => alert(`Áp dụng đề ID: ${id}`);
    const handleEdit = (id: number) => alert(`Sửa đề ID: ${id}`);
    const handleDelete = (id: number) => {
        if (confirm("Bạn chắc chắn muốn xóa đề này?")) {
            setQuestions((prev) => prev.filter((q) => q.id !== id));
        }
    };

    const filteredQuestions = questions.filter((q) =>
        q.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedQuestions = filteredQuestions.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    const totalPages = Math.ceil(filteredQuestions.length / ITEMS_PER_PAGE);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-3xl rounded-2xl border p-6 shadow-xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-primary mb-4">
                        📚 Danh sách đề thi
                    </DialogTitle>
                </DialogHeader>

                <Input
                    placeholder="Tìm kiếm theo tiêu đề..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setPage(1);
                    }}
                    className="mb-4"
                />

                <ScrollArea className="max-h-[55vh] pr-2">
                    <div className="space-y-4">
                        {paginatedQuestions.map((question) => (
                            <div
                                key={question._id}
                                className="flex items-center justify-between rounded-xl border px-6 py-4 bg-muted hover:bg-muted/60 transition-all duration-200 shadow-sm"
                            >
                                <span className="text-base font-semibold text-gray-800">
                                    {question.title}
                                </span>
                                <div className="flex items-center gap-2">
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="hover:bg-green-100"
                                        onClick={() => { setQs(question.questions); setOpen(false) }}
                                    >
                                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="hover:bg-blue-100"
                                        onClick={() => handleEdit(question.id)}
                                    >
                                        <Pencil className="h-5 w-5 text-blue-600" />
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="hover:bg-red-100"
                                        onClick={() => handleDelete(question.id)}
                                    >
                                        <Trash2 className="h-5 w-5 text-red-600" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                {totalPages > 1 && (
                    <div className="mt-4 flex justify-center gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            disabled={page === 1}
                            onClick={() => setPage((p) => p - 1)}
                        >
                            Trước
                        </Button>
                        <span className="text-sm font-medium self-center">
                            Trang {page} / {totalPages}
                        </span>
                        <Button
                            size="sm"
                            variant="outline"
                            disabled={page === totalPages}
                            onClick={() => setPage((p) => p + 1)}
                        >
                            Sau
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}