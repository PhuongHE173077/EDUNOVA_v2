'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Download, Upload } from 'lucide-react'

export const UploadFileDialog = ({ open, setOpen, handleChange, handleDownload, handleUpload, required }: any) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px] min-w-[800px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Tải lên file Excel</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-4">
                    <div>
                        <label className="block mb-1 font-medium">Chọn file Excel:</label>
                        <Input type="file" accept=".xlsx, .xls" onChange={handleChange} />
                    </div>

                    <div className="text-sm text-gray-600 border rounded-md p-3 bg-gray-50">
                        <p><strong>Yêu cầu:</strong></p>
                        <ul className="list-disc list-inside">
                            <li>File phải có định dạng <strong>.xlsx</strong> hoặc <strong>.xls</strong></li>
                            <li>Các cột bắt buộc: <em>{required}</em></li>
                        </ul>
                    </div>

                    <div className="flex items-center justify-between">
                        <Button variant="outline" onClick={handleDownload}>
                            <Download className="w-4 h-4 mr-2" /> Tải file mẫu
                        </Button>

                        <div className="flex gap-2">
                            <Button variant="ghost" onClick={() => setOpen(false)}>Hủy</Button>
                            <Button onClick={handleUpload}>
                                <Upload className="w-4 h-4 mr-2" /> Tải lên
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
