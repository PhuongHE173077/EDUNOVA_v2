'use client'

import { fetchCoursesById } from '@/apis/course.apis'
import { fetchLessonByCourseId } from '@/apis/lession.apis'
import { Button } from '@/components/ui/button'
import { Course, lesson } from '@/types'
import { ChevronsDownIcon, ChevronsUpIcon, Home } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ContentCourseDetail from './components/Content'

export default function Page() {
    const params = useParams()
    const id = params.id
    const router = useRouter()

    const [courses, setCourses] = useState<Course>()
    const [lessons, setLessons] = useState<lesson[]>([]);

    const [showHeader, setShowHeader] = useState<boolean>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("showHeader")
            return saved !== null ? JSON.parse(saved) : true
        }
        return true
    })

    useEffect(() => {
        localStorage.setItem("showHeader", JSON.stringify(showHeader))
    }, [showHeader])

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            try {
                const courseRes = await fetchCoursesById(id);
                const courseData = courseRes.data;
                setCourses(courseData);

                const lessonRes = await fetchLessonByCourseId(courseData._id);
                setLessons(lessonRes.data);
            } catch (error) {
                console.error('Error fetching course or lessons:', error);
            }
        };
        fetchData();
    }, [])

    return (
        <div className="relative p-1">
            <Button
                onClick={() => setShowHeader(!showHeader)}
                className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1 px-3 rounded-md shadow"
            >
                {showHeader ?
                    <ChevronsUpIcon className='h-4 w-4' />

                    : <ChevronsDownIcon className='h-4 w-4' />}
            </Button>

            {showHeader && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 pl-1">
                        <div className="flex items-center gap-1 cursor-pointer hover:text-black transition-colors">
                            <Home className="h-4 w-4" />
                            <span>Home</span>
                        </div>
                        <span>/</span>
                        <span className="cursor-pointer hover:text-black transition-colors">Course</span>
                        <span>/</span>
                        <span className="font-medium text-black">{courses?.subject.name}</span>
                    </div>

                    {/* Info & Actions */}
                    <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4 pl-1">
                        <div className="border p-3 rounded-lg bg-gray-50 text-sm font-medium">
                            <span className="text-gray-600">Class:</span>{' '}
                            <span className="text-gray-800">{courses?.id}</span>
                        </div>
                        <div className="border p-3 rounded-lg bg-gray-50 text-sm font-medium">
                            <span className="text-gray-600">Subject:</span>{' '}
                            <span className="text-gray-800">{courses?.subject.name}</span>
                        </div>

                        <div className="flex gap-3 flex-wrap">
                            <Button
                                onClick={() => router.push(`Exam?courseId=${id}`)}
                                className="bg-purple-100 text-purple-700 border border-purple-300 hover:bg-purple-200 rounded-lg px-4 py-2 text-sm font-semibold transition"
                            >
                                Kiểm Tra
                            </Button>
                            <Button
                                onClick={() => router.push(`Material?courseId=${id}`)}
                                className="bg-purple-100 text-purple-700 border border-purple-300 hover:bg-purple-200 rounded-lg px-4 py-2 text-sm font-semibold transition"
                            >
                                Tài Liệu
                            </Button>
                            <Button
                                onClick={() => router.push(`Student?courseId=${id}`)}
                                className="bg-purple-100 text-purple-700 border border-purple-300 hover:bg-purple-200 rounded-lg px-4 py-2 text-sm font-semibold transition"
                            >
                                Danh sách học sinh
                            </Button>
                        </div>
                    </div>
                </div>
            )}


            {lessons.length > 0 ? <div className=' overflow-y-auto scrollbar-custom2' style={{ maxHeight: showHeader ? '66vh' : '90vh' }} >
                <ContentCourseDetail lesson={lessons} />
            </div> :
                <div className="">
                    <div className="flex items-center justify-center h-full">
                        <div className="text-gray-500 text-lg">No lessons available for this course.</div>
                    </div>
                </div>
            }




        </div>
    )
}
