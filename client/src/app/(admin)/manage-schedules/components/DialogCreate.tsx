import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { createSchedule } from "@/apis/schedule.apis";

const daysOfWeek = [
    { label: "Thứ 2", value: "monday" },
    { label: "Thứ 3", value: "tuesday" },
    { label: "Thứ 4", value: "wednesday" },
    { label: "Thứ 5", value: "thursday" },
    { label: "Thứ 6", value: "friday" },
    { label: "Thứ 7", value: "saturday" },
    { label: "Chủ nhật", value: "sunday" },
];

export default function ScheduleDialog({ open, setOpen, course }: any) {
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [selectedDays, setSelectedDays] = useState<string[]>([]);

    const handleToggleDay = (day: string) => {
        setSelectedDays((prev) =>
            prev.includes(day)
                ? prev.filter((d) => d !== day)
                : [...prev, day]
        );
    };

    const handleSubmit = async () => {
        const scheduleData = {
            startTime,
            endTime,
            days: selectedDays,
            courseId: course._id
        };
        await createSchedule(scheduleData);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tạo lịch học</DialogTitle>
                    <DialogDescription>
                        Chọn thời gian và các ngày trong tuần.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <Label>Thời gian bắt đầu</Label>
                        <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                    </div>
                    <div>
                        <Label>Thời gian kết thúc</Label>
                        <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                    </div>

                    <div>
                        <Label>Chọn các ngày học</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            {daysOfWeek.map((day) => (
                                <div key={day.value} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={day.value}
                                        checked={selectedDays.includes(day.value)}
                                        onCheckedChange={() => handleToggleDay(day.value)}
                                    />
                                    <label htmlFor={day.value} className="text-sm">
                                        {day.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-2 mt-4">
                    <Button variant="outline">Hủy</Button>
                    <Button onClick={handleSubmit}>Lưu</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
