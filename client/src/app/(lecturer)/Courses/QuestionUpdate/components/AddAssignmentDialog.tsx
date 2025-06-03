'use client'

import { useState } from "react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "react-toastify"
import { createNewAssignment } from "@/apis/question.lesion.apis"
import { uploadFileAPIs } from "@/apis/image.apis"

export default function AddAssignmentDialog({ open, setOpen, id, fetchData }: any) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [deadline, setDeadline] = useState("")
    const [file, setFile] = useState<File | null>(null)
    const [fileUrl, setFileUrl] = useState("")

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const formData = new FormData()
            formData.append("file", e.target?.files[0])
            await toast.promise(
                uploadFileAPIs(formData),
                {
                    pending: 'Loading',
                    success: 'Success',
                    error: 'Error',
                }
            ).then((res) => {
                setFile(e.target.files[0])
                setFileUrl(res.data)
            })

        }
    }

    const handleAdd = async () => {
        const formData = new FormData()



        await toast.promise(
            uploadFileAPIs(formData),
            {
                pending: 'Loading',
                success: 'Success',
                error: 'Error',
            }
        ).then(async (res) => {
            await createNewAssignment({
                title,
                description,
                deadline,
                file: res.data.url,
                courseId: id
            }).then(() => {
                setOpen(false)
                fetchData()
            })
        })

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
