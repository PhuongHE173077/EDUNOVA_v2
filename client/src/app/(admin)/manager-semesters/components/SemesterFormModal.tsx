"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Semesters } from "@/types";

interface Props {
    open: boolean;
    onClose: () => void;
    initial?: Semesters;
    onSubmit: (data: Partial<Semesters>) => void;
}

export default function SemesterFormModal({ open, onClose, initial, onSubmit }: Props) {
    const [name, setName] = useState(initial?.name || "");
    const [startDate, setStartDate] = useState(
        initial ? new Date(initial.startDate).toISOString().slice(0, 10) : ""
    );
    const [endDate, setEndDate] = useState(
        initial ? new Date(initial.endDate).toISOString().slice(0, 10) : ""
    );

    useEffect(() => {
        if (initial) {
            setName(initial.name);
            setStartDate(new Date(initial.startDate).toISOString().slice(0, 10));
            setEndDate(new Date(initial.endDate).toISOString().slice(0, 10));
        }
    }, [initial]);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{initial ? "Chỉnh sửa học kỳ" : "Tạo học kỳ mới"}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Tên học kỳ</label>
                        <Input
                            value={String(name)}  // ép kiểu an toàn
                            onChange={(e) => setName(e.target.value)}
                        />

                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1">Ngày bắt đầu</label>
                            <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1">Ngày kết thúc</label>
                            <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        </div>
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button variant="ghost" onClick={onClose}>Huỷ</Button>
                        <Button
                            onClick={() => {
                                onSubmit({
                                    name,
                                    startDate: new Date(startDate),
                                    endDate: new Date(endDate),
                                });
                            }}
                        >
                            {initial ? "Cập nhật" : "Tạo mới"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
