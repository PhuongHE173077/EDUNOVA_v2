
import { image } from '@uiw/react-md-editor'
import React from 'react'
import { cloneDeep } from 'lodash'

export const QuestionExam = ({ question, indexQuestion, setQuestions, questions }: { question: any, indexQuestion: number, setQuestions: any, questions: any }) => {
    const handleChoiceAnswer = (id: string) => {
        const clonedQuestions = cloneDeep(questions)
        const index = clonedQuestions.findIndex((q: any) => q._id === question._id)
        if (index !== -1) {
            const answer = clonedQuestions[index].options.find((a: any) => a.id === id)
            answer.isChecked = !answer.isChecked
            setQuestions(clonedQuestions)
        }
    }

    return (


        <div className="rounded-xl p-10 lg:w-3/4 w-11/12 mx-auto text-center border-2 shadow-2xl">
            <div className=" flex flex-col items-center justify-center">
                <div className="mb-4">
                    <strong>Câu {indexQuestion + 1}:</strong> {question.description}
                </div>
                <div className='flex items-center justify-center '>
                    {question.image && <img
                        src={question.image}
                        style={{
                            maxHeight: '150px'
                        }}
                    />}
                </div>
            </div>
            <div className="">
                <div className="text-start">
                    Choice the {question.numberCorrectAnswer} best answers:
                </div>
                <ul className="my-8">
                    {question.options.map((qs: any, index: number) => (
                        <li key={index}
                            className="answer w-3/4 my-2 mx-auto text-start text-black  rounded-xl shadow-lg bg-white hover:bg-cyan-200"
                            style={{
                                backgroundColor: qs.isChecked && '#fed330'
                            }}
                            onClick={() => { handleChoiceAnswer(qs.id) }}
                        >
                            <button className="w-full py-2 rounded-xl">
                                {qs.content}
                            </button>
                        </li>
                    ))}

                </ul>

            </div>
        </div>


    )
}
