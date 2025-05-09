'use client'
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

export default function page() {
    const searchParams = useSearchParams();
    const courseId = searchParams.get('courseId');
    const router = useRouter();
    return (
        <div>
            <Button onClick={() => router.push(`Exam/AddExam?courseId=${courseId}`)}>Add exam</Button>
        </div>
    )
}
