import React from 'react'

export const QuestionExam = () => {
    return (
        <div className="rounded-xl p-10 w-3/4 mx-auto text-center border-2 shadow-2xl">
            <div className="mb-4">
                <strong>Câu 1:</strong> Bước đầu tiên để tạo khóa học khi làm việc với Gnomio là?
            </div>
            <div className='flex items-center justify-center '>
                <img
                    src={'https://res.cloudinary.com/dl3ucqngx/image/upload/v1737726636/users/lhmjydx5zmh0msohikr8.jpg'}
                    style={{
                        maxHeight: '150px'
                    }}
                />
            </div>

            <div className="">
                <div className="text-start">
                    Your answer
                </div>
                <ul className="my-8">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <li key={index} className="answer w-3/4 my-2 mx-auto text-center text-black  rounded-xl shadow-lg bg-white hover:bg-cyan-200">
                            <button className="w-full py-2 rounded-xl">
                                123
                            </button>
                        </li>
                    ))}

                </ul>

            </div>
        </div>
    )
}
