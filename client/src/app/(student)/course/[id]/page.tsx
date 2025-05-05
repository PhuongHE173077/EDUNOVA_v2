'use client'
import { fetchCoursesById } from '@/apis/course.apis';
import { Course } from '@/types';
import { HomeIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import HeaderCourseDetail from './components/Header';
import ContentCourseDetail from './components/Content';

export default function page() {
    const { id } = useParams();
    const [course, setCourse] = useState<Course>()
    useEffect(() => {
        fetchCoursesById(id).then(res => {
            setCourse(res.data)
        })
    }, [])
    return (
        <>
            <HeaderCourseDetail />

            <ContentCourseDetail />
            {/* <div className="">Header</div> */}
        </>
    )
}
