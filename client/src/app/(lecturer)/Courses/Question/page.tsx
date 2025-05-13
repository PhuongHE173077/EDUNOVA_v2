'use client'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { use, useEffect, useState } from 'react'
import { QuestionLesion } from './components/question/Question';
import { questionLesson } from '@/types';
import { fetchQuestionById } from '@/apis/question.lesion.apis';
import { Loading } from '@/components/ui/loading';
import Answer from './components/answer/Answer';
import ProgressTracker from './components/progress-tracking/ProgressTracker';

export default function page() {
    const params = useSearchParams();
    const id = params.get('id');
    const courseId = params.get('courseId');
    const router = useRouter();
    const [question, setQuestion] = useState<questionLesson>();
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetchQuestionById(id!);
            setQuestion(res.data);
        };
        fetchData();
    }, [id])

    if (isLoading) return <Loading />;
    return (
        <div className='p-7 relative'>
            <Button variant='outline' className='mb-3' onClick={() => router.push(`/Courses/${courseId}`)}>
                <ArrowLeftIcon />
                Back
            </Button>
            <div className="text-2xl font-bold mb-3 font-semibold">
                Question
            </div>
            <div className='w-full  flex gap-5'>

                <div className='w-full lg:w-3/5'>
                    {question && <QuestionLesion question={question} />}
                    <Answer />
                </div>
                <div className="hidden lg:block w-2/5 ">
                    <ProgressTracker />
                </div>
            </div>
        </div>
    )
}
