'use client'
import { fetchQuestionByLessonId } from '@/apis/questionLesion.apis';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { QuestionLesion } from './components/question/Question';
import { NavTabsLesson } from './components/nav-tabs/NavTabs';
import ProgressTracker from './components/progress-tracking/ProgressTracker';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, StepBackIcon } from 'lucide-react';
import { questionLesson } from '@/types';

export default function page() {
    const params = useSearchParams();
    const id = params.get('id');
    const [question, setQuestion] = useState<questionLesson>();
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetchQuestionByLessonId(id!);
            setQuestion(res.data);
        };
        fetchData();
    }, [])


    return (
        <div className='p-7'>
            <Button variant='outline' className='mb-3' onClick={() => router.back()}>
                <ArrowLeftIcon />
                Back
            </Button>
            <div className="text-2xl font-bold mb-3 font-semibold">
                Question
            </div>
            <div className='w-full  flex gap-5'>

                <div className='w-full lg:w-3/5'>
                    {question && <QuestionLesion question={question} />}
                    <NavTabsLesson />
                </div>
                <div className="hidden lg:block w-2/5 ">
                    <ProgressTracker />
                </div>
            </div>
        </div>

    )
}
