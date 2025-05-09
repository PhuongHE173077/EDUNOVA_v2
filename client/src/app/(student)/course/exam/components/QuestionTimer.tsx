import { Button } from '@/components/ui/button'
import React from 'react'

export const QuestionTimer = () => {
    return (
        <div className="border-2 p-10 rounded-lg w-3/4  shadow-2xl text-center">
            <div className="">
                20s
            </div>
            <div className="my-8">
                <div className="text-start">
                    Your Answer:
                </div>
                <div className='flex justify-center '>
                    <div className="flex my-4 gap-4 flex-wrap w-full 2lg:w-3/4 mx-auto justify-center max-h-[280px] overflow-x-hidden overflow-y-auto scrollbar-custom">

                        {Array.from({ length: 26 }).map((_, index) => (
                            <div key={index} className="border-2 border-black px-4 py-2 rounded-full cursor-pointer hover:bg-sky-400">
                                1
                            </div>
                        ))}
                    </div>
                </div>



            </div>
            <div className="">
                <Button>
                    Submit
                </Button>
            </div>
        </div>
    )
}
