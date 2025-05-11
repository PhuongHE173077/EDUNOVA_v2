import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
export const QuestionTimer = ({ questions, setIndexQuestion, data, dueTime, handleSubmit }: any) => {
    const targetDate = new Date(dueTime).getTime();
    const router = useRouter();
    const searchLocation = useSearchParams()

    const getTimeRemaining = () => {
        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff <= 0) {
            return { hours: 0, minutes: 0, seconds: 0, isFinished: true };
        }

        return {
            hours: Math.floor(diff / (1000 * 60 * 60)),
            minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((diff % (1000 * 60)) / 1000),
            isFinished: false
        };
    }
    const [timeLeft, setTimeLeft] = useState(getTimeRemaining());
    useEffect(() => {
        const interval = setInterval(() => {
            const remaining = getTimeRemaining();
            setTimeLeft(remaining);

            if (remaining.isFinished) {
                clearInterval(interval);
                onSubmit(questions);

            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const onSubmit = (data: any) => {

        Swal.fire({
            title: "Are you sure finish the exam ?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                handleSubmit(data, "finish");
                toast.success("Your exam has been finished");
                router.push('/course/exam?courseId=' + searchLocation.get('courseId'))
            }
        });
    }

    return (
        <div className="border-2 p-10 rounded-lg w-3/4  shadow-2xl text-center">
            <div className="flex justify-center ">
                {timeLeft.hours > 0 && <div>
                    {timeLeft.hours} hours -
                </div>
                }
                {
                    timeLeft.minutes > 0 && <div>
                        {timeLeft.minutes} minutes -
                    </div>
                }
                {
                    timeLeft.seconds > 0 && <div>
                        {timeLeft.seconds} seconds
                    </div>
                }

            </div>
            <div className='text-gray-500'>
                Every 5 minutes the exam will be saved.
            </div>
            <div className="my-8">
                <div className="text-start">
                    Your Answer:
                </div>
                <div className='flex justify-center '>
                    <div className="flex my-4 gap-4 flex-wrap w-full 2lg:w-3/4 mx-auto justify-center max-h-[280px] overflow-x-hidden overflow-y-auto scrollbar-custom">

                        {questions.map((qs: any, index: number) => (
                            <div key={index}
                                className="border-2 border-black px-4 py-2 rounded-full cursor-pointer hover:bg-sky-400"
                                style={{
                                    backgroundColor: qs.options.find((a: any) => a.isChecked) && 'gray'
                                }}
                                onClick={() => setIndexQuestion(index)}
                            >
                                {index + 1}
                            </div>
                        ))}
                    </div>
                </div>



            </div>
            <div className="">
                <Button onClick={() => onSubmit(questions)}>
                    Submit
                </Button>
            </div>
        </div>
    )
}
