'use client'
import { fetchCoursesById } from '@/apis/course.apis';
import { fetchLessonByCourseId } from '@/apis/lession.apis';
import { Loading } from '@/components/ui/loading';
import { Course } from '@/types'
import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function page() {
    const [courses, setCourses] = useState<Course>()
    const searchLocation = useSearchParams();
    const id = searchLocation.get('courseId');
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const fetchData = async () => {
            if (!id) return;
            try {
                const courseRes = await fetchCoursesById(id);
                const courseData = courseRes.data;
                setCourses(courseData);
                setLoading(false)
            } catch (error) {
                console.error('Error fetching course or lessons:', error);
            }
        };
        fetchData();
    }, [])

    if (loading) return <Loading />

    return (
        <div>
            { }

        </div>
    )
}

