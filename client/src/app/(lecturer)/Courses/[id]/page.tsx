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
                <div className=" p-7 pt-3 pl-1  bg-white rounded-md">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-1 pl-1">
                        <div className="flex items-center gap-1 text-gray-500 cursor-pointer hover:text-black">
                            <Home className='h-4 w-4' />
                            <span>Home</span>
                        </div>
                        <div className="text-gray-500">/</div>
                        <div className="text-gray-500 cursor-pointer hover:text-black">Course</div>
                        <div className="text-gray-500">/</div>
                        <div>{courses?.subject.name}</div>
                    </div>

                    {/* Info và Buttons */}
                    <div className="mt-4 pl-6 flex items-center lg:gap-20 gap-4 flex-wrap">
                        <div className="border-2 shadow-2xl p-2 rounded bg-white">
                            <strong>Class</strong>: {courses?.id}
                        </div>
                        <div className="border-2 shadow-2xl p-2 rounded bg-white">
                            <strong>Subject</strong>: {courses?.subject.name}
                        </div>

                        <Button
                            onClick={() => router.push(`Exam?courseId=${id}`)}
                            className="bg-purple-100 border border-purple-400 text-purple-700 hover:bg-purple-200 font-semibold py-2 px-4 rounded-lg mr-2 transition-colors duration-200"
                        >
                            EXAM
                        </Button>

                        <Button
                            className="bg-teal-100 border border-teal-400 text-teal-700 hover:bg-teal-200 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                        >
                            MATERIAL
                        </Button>
                    </div>
                </div>
            )}

            <div className=' overflow-y-auto scrollbar-custom2' style={{ maxHeight: showHeader ? '66vh' : '90vh' }} >
                <ContentCourseDetail lesson={lessons} />
            </div>




        </div>
    )
}
