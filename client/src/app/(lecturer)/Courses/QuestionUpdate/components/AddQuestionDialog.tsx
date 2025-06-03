'use client'

import { useState } from "react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { createNewQuestion } from "@/apis/question.lesion.apis"
import { toast } from "react-toastify"

export default function AddQuestionDialog({ open, setOpen, id, fetchData }: any) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [timeStart, setTimeStart] = useState("")
    const [timeEnd, setTimeEnd] = useState("")


    const handleAdd = async () => {
        if (!title || !description || !timeStart || !timeEnd) {
            alert("Vui lòng nhập đầy đủ thông tin")
            return
        }

        const question = {
            title,
            description,
            timeStart,
            timeEnd,
            status: "pendding",
            type: "question",
            lessonId: id
        }

        await createNewQuestion(question).then(() => {
            fetchData(id)
            setOpen(false)

        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>

            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Thêm Câu Hỏi Mới</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div>
                        <Label htmlFor="title">Tiêu đề</Label>
                        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Nhập tiêu đề..." />
                    </div>
                    <div>
                        <Label htmlFor="description">Mô tả</Label>
                        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Nhập mô tả chi tiết..." />
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <Label htmlFor="timeStart">Thời gian bắt đầu</Label>
                            <Input type="date" id="timeStart" value={timeStart} onChange={(e) => setTimeStart(e.target.value)} />
                        </div>
                        <div className="flex-1">
                            <Label htmlFor="timeEnd">Thời gian kết thúc</Label>
                            <Input type="date" id="timeEnd" value={timeEnd} onChange={(e) => setTimeEnd(e.target.value)} />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleAdd} className="bg-green-600 hover:bg-green-700 text-white">Lưu</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
