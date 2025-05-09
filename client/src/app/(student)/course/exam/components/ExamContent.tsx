import React from 'react'
import { QuestionExam } from './Question'
import { QuestionTimer } from './QuestionTimer'

export const ExamContent = () => {
    return (
        <div className="flex w-full h-full">
            <div className="w-full lg:w-3/5 ">
                <QuestionExam />
            </div>
            <div className="hidden lg:block lg:w-2/5">
                <QuestionTimer />
            </div>
        </div>
    )
}
