'use client';

import { fetchCoursesById } from '@/apis/course.apis';
import { fetchLessonByCourseId } from '@/apis/lession.apis';
import { Course, lesson } from '@/types';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ContentCourseDetail from './components/Content';
import HeaderCourseDetail from './components/Header';

export default function CourseDetailPage() {
    const params = useParams();
    const id = typeof params.id === 'string' ? params.id : params.id?.[0]; // handle string[]

    const [course, setCourse] = useState<Course | null>(null);
    const [lessons, setLessons] = useState<lesson[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            try {
                const courseRes = await fetchCoursesById(id);
                const courseData = courseRes.data;
                setCourse(courseData);

                const lessonRes = await fetchLessonByCourseId(courseData._id);
                setLessons(lessonRes.data);
            } catch (error) {
                console.error('Error fetching course or lessons:', error);
            }
        };
        fetchData();
    }, [id]);



    return (
        <>
            {course && <HeaderCourseDetail course={course} />}
            {lessons && <ContentCourseDetail lesson={lessons} />}
        </>
    );
}
