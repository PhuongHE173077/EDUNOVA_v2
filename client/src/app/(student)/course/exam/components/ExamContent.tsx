import React, { useEffect } from 'react'
import { QuestionExam } from './Question'
import { QuestionTimer } from './QuestionTimer'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
export const ExamContent = ({ questions, data, setQuestions, dueTime, handleSubmit, examId }: any) => {
    const [indexQuestion, setIndexQuestion] = React.useState(0)

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            handleSubmit(questions);
        }, 5 * 60 * 1000);

        return () => clearTimeout(timeoutId);
    }, [handleSubmit]);

    return (
        <div className="flex w-full h-full">
            <div className="w-full lg:w-3/5 ">
                <QuestionExam question={questions[indexQuestion]} indexQuestion={indexQuestion} setQuestions={setQuestions} questions={questions} />
                <div className="flex justify-between w-3/4 mx-auto mt-5">
                    <Button variant={'outline'} disabled={indexQuestion === 0} onClick={() => setIndexQuestion(indexQuestion - 1)}>
                        <ChevronLeftIcon />
                        Prev
                    </Button>
                    <Button variant={'warning'} disabled={indexQuestion === questions.length - 1} onClick={() => setIndexQuestion(indexQuestion + 1)}>
                        Next
                        <ChevronRightIcon />
                    </Button>
                </div>
            </div>
            <div className="hidden lg:block lg:w-2/5">
                <QuestionTimer questions={questions} setIndexQuestion={setIndexQuestion} data={data} dueTime={dueTime} handleSubmit={handleSubmit} />
            </div>
        </div>
    )
}
