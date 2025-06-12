'use client'
import { fetchCourseBySemesterId, fetchCourseBySemesterIdAndSubjectId } from '@/apis/course.apis'
import { fetchSemesters } from '@/apis/other.apis'
import { fetchCurrentSemester } from '@/apis/semester.apis'
import { Loading } from '@/components/ui/loading'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Semesters } from '@/types'
import { FormLabel } from '@mui/material'
import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ClipboardPlus, ClipboardPlusIcon, Pencil, Trash2 } from "lucide-react";
import ScheduleDialog from './components/DialogCreate'

export default function page() {
    const [currentSemester, setCurrentSemester] = useState<Semesters>()
    const [semesters, setSemesters] = useState<Semesters[]>([])
    const [loading, setLoading] = useState(true)
    const [courses, setCourses] = useState<any[]>([])

    const [openDialogCreate, setOpenDialogCreate] = useState(false);
    const [activeCourse, setActiveCourse] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [semRes, curSemRes] = await Promise.all([
                    fetchSemesters(),
                    fetchCurrentSemester(),

                ])
                setSemesters(semRes.data)
                setCurrentSemester(curSemRes.data)
            } catch (err) {
                console.error("Error fetching data:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    useEffect(() => {

        fetchData()

    }, [currentSemester])

    const fetchData = async () => {
        if (currentSemester) {

            await fetchCourseBySemesterId(currentSemester._id).then((res) => {
                setCourses(res.data)

            })
        }
    }

    if (loading) return <div className='max-h-[70vh]'><Loading /></div>


    return (
        <div className='p-7'>
            <div className="w-40">
                <FormLabel className='mb-2 !text-black'>Semester: </FormLabel>
                <Select
                    value={currentSemester?._id}
                    onValueChange={(value) => {
                        const selected = semesters.find((sem) => sem._id === value)
                        if (selected) setCurrentSemester(selected)
                    }}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                        {semesters.slice().reverse().map((semester) => (
                            <SelectItem key={semester._id} value={semester._id}>
                                {semester.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="rounded-2xl border shadow-md p-4 bg-white dark:bg-gray-950 mt-4">
                <h2 className="text-xl font-bold mb-4">Danh sách lớp học</h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Lớp</TableHead>
                            <TableHead>Giáo viên</TableHead>
                            <TableHead>Môn học</TableHead>
                            <TableHead>Học kỳ</TableHead>
                            <TableHead>Trạng thái</TableHead>
                            <TableHead className="text-right">Chức năng</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {courses.map((course) => (
                            <TableRow key={course._id}>
                                <TableCell className="font-medium">{course.id}</TableCell>
                                <TableCell>{course.lecturer?.displayName || "N/A"}</TableCell>
                                <TableCell>{course.subject?.name || "N/A"}</TableCell>
                                <TableCell>{course.semester?.name || "N/A"}</TableCell>
                                <TableCell>
                                    <Badge variant={course.status === "active" ? "default" : "destructive"}>
                                        {course.status === "active" ? "Đã tạo" : course.status === "pending" ? "Chưa tạo" : "Đã đóng"}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right space-x-2">
                                    {course.status === "pending" && <Button size="sm" variant="outline" onClick={() => { setOpenDialogCreate(true); setActiveCourse(course) }}>
                                        <ClipboardPlus className="w-4 h-4" />
                                    </Button>
                                    }

                                    {course.status === "active" && <Button size="sm" variant="outline">
                                        <Pencil className="w-4 h-4" />
                                    </Button>}

                                    <Button size="sm" variant="destructive">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <ScheduleDialog open={openDialogCreate} setOpen={setOpenDialogCreate} course={activeCourse} fetchData={fetchData} />
        </div>
    )
}
