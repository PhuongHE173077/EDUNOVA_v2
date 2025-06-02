'use client'

import { useState } from "react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function AddAssignmentDialog({ open, setOpen, id, fetchData }: any) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [deadline, setDeadline] = useState("")
    const [file, setFile] = useState<File | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0])
        }
    }

    const handleAdd = () => {
        const formData = new FormData()
        formData.append("title", title)
        formData.append("description", description)
        formData.append("deadline", deadline)
        if (file) formData.append("file", file)

        console.log("Form Data:", { title, description, deadline, file })

        // TODO: Gửi formData đến API xử lý upload
        // fetch('/api/upload', { method: 'POST', body: formData })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>

            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Thêm Bài Tập</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div>
                        <Label htmlFor="title">Tiêu đề</Label>
                        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Nhập tiêu đề..." />
                    </div>
                    <div>
                        <Label htmlFor="description">Mô tả</Label>
                        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Chi tiết bài tập..." />
                    </div>
                    <div>
                        <Label htmlFor="deadline">Hạn chót</Label>
                        <Input type="datetime-local" id="deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="file">Tệp đính kèm</Label>
                        <Input type="file" id="file" onChange={handleFileChange} />
                        {file && <p className="text-sm mt-1 text-gray-500">Đã chọn: {file.name}</p>}
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleAdd} className="bg-green-600 hover:bg-green-700 text-white">Lưu Assignment</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
