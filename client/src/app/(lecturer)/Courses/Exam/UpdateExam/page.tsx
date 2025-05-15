'use client'

import { fetchExamDetailHasResult, updateExamById } from '@/apis/exam.apis'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Loading } from '@/components/ui/loading'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TYPE_QUESTION_EXAM } from '@/lib/constants'
import { FormLabel, Tooltip } from '@mui/material'
import { set } from 'date-fns'
import { CheckIcon, EditIcon, EllipsisVertical, Image, Move, MoveLeftIcon, SaveIcon, Trash2Icon, XIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

export default function page() {
    const searchLocation = useSearchParams()
    const examId = searchLocation.get('examId')
    const [open, setOpen] = React.useState(false)

    const [exam, setExam] = React.useState<any>({})
    const [loading, setLoading] = React.useState(true)
    const questionRefs = React.useRef<(HTMLDivElement | null)[]>([])
    const [searchTerm, setSearchTerm] = React.useState('')
    const [selectedQuestion, setSelectedQuestion] = React.useState<any>({})
    const [title, setTitle] = React.useState('')
    const [time, setTime] = React.useState(0)
    const [viewAnswer, setViewAnswer] = React.useState(true)
    const [status, setStatus] = React.useState('')


    const router = useRouter()

    useEffect(() => {
        fetchExamDetailHasResult(examId).then((res) => {
            setExam(res.data)
            setTitle(res.data.title)
            setTime(res.data.time)
            setStatus(res.data.status)
            setViewAnswer(res.data.viewAnswer)
            setLoading(false)
        })
    }, [examId])

    const handleSearch = () => {
        if (!searchTerm) return;

        const index = exam.questions.findIndex((q: any) =>
            q.description?.toLowerCase().includes(searchTerm.toLowerCase())
        )

        if (index !== -1 && questionRefs.current[index]) {
            questionRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    if (loading) return <Loading />

    const handleModelToggle = (question: any) => {
        if (open) {
            setSelectedQuestion({})
        } else {
            setSelectedQuestion(question)
        }
        setOpen(!open)
    }

    const onSubmit = async () => {
        const newData = {
            title,
            time,
            status,
            viewAnswer,
            numberCorrectAnswer: exam.numberCorrectAnswer,
            question: exam.questions.map((q: any) => {
                return {
                    ...q,
                    numberCorrectAnswer: q.options.filter((opt: any) => opt.isCorrect).length
                }
            })
        }

        await updateExamById(examId, newData).then((res) => {
            if (res.data) {
                router.push('/Courses/Exam?courseId=' + exam.courseId)
            }
        })

    }

    const updateQuestion = (type: string, value: any) => {
        const examClone = { ...exam };

        const questionIndex = examClone.questions.findIndex((q: any) => q.id === selectedQuestion.id);
        if (questionIndex !== -1) {
            if (type === 'type') {
                examClone.questions[questionIndex].type = value;
                examClone.questions[questionIndex].options.forEach((opt: any) => {
                    opt.isCorrect = false;
                });
            } else if (type === 'description') {
                examClone.questions[questionIndex].description = value;
            }
        }
        setExam(examClone);

    }
    const handleUpdateAnswer = (id: string, value: any, type: string) => {
        const examClone = { ...exam };

        const questionIndex = examClone.questions.findIndex((q: any) => q.id === selectedQuestion.id);

        if (questionIndex !== -1) {
            if (type === 'isCorrect') {
                if (examClone.questions[questionIndex].type === TYPE_QUESTION_EXAM.SINGLE) {
                    examClone.questions[questionIndex].options.forEach((opt: any) => {
                        opt.isCorrect = opt.id === id ? value : false;
                    });
                } else {
                    const answer = examClone.questions[questionIndex].options.find((a: any) => a.id === id);
                    answer.isCorrect = !answer.isCorrect;
                }

            } else if (type === 'content') {
                examClone.questions[questionIndex].options.find((a: any) => a.id === id).content = value;
            }
        }
        setExam(examClone);
    }

    return (
        <Dialog open={open} onOpenChange={handleModelToggle}>
            <div className=" border shadow-sm " style={{ marginBottom: '2px' }}>
                <div className="flex justify-between p-3" >
                    <div>
                        <Button onClick={() => router.back()}>
                            <MoveLeftIcon className=' h-4 w-3' />
                            Back
                        </Button>
                    </div>
                    <div className='flex gap-2'>
                        <Input
                            placeholder='Search...'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleSearch() }}
                        />
                        <Button variant={'warning'} onClick={onSubmit}> <SaveIcon /> Save</Button>
                    </div>
                </div>
            </div>
            <div className="flex p-5 ">
                <div className="w-4/12">
                    <div className="border-2 shadow-2xl rounded-lg w-3/4 mx-auto p-10">
                        <div className="flex flex-col items-center justify-center">
                            <div className="mb-4 flex items-center gap-5">
                                <div className="font-semi">Title:</div>
                                <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div className="flex items-center gap-5 w-full ">
                                <FormLabel className="text-black !text-black font-semibold">Timer:</FormLabel>
                                <Select value={time} onValueChange={(e: any) => setTime(e)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Please select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="180">180 minutes</SelectItem>
                                        <SelectItem value="120">120 minutes</SelectItem>
                                        <SelectItem value="90">90 minutes</SelectItem>
                                        <SelectItem value="60">60 minutes</SelectItem>
                                        <SelectItem value="45">45 minutes</SelectItem>
                                        <SelectItem value="30">30 minutes</SelectItem>
                                        <SelectItem value="15">15 minutes</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center gap-5 w-full mt-5">
                                <FormLabel className="text-black !text-black font-semibold">Result:</FormLabel>
                                <Select value={viewAnswer.toString()} onValueChange={(e) => setViewAnswer(e === 'true')}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Please select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="false">Private</SelectItem>
                                        <SelectItem value="true">Public</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center gap-5 w-full mt-5">
                                <FormLabel className="text-black !text-black font-semibold">Status:</FormLabel>
                                <Select value={status} onValueChange={(e) => setStatus(e)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Please select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="start">Start</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="finished">Finish</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                        </div>

                    </div>
                </div>
                <div className="w-3/5 flex flex-col gap-5 scrollbar-custom2 overflow-y-auto" style={{ maxHeight: '77vh' }}>
                    {exam.questions.map((question: any, index: number) => (
                        <div className=" w-full border-2 rounded-lg"
                            style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}
                            ref={(el) => (questionRefs.current[index] = el)}
                            key={index}
                        >
                            <div className="flex p-3 justify-between items-center">
                                <div className="flex gap-5 items-center">
                                    <div className="font-bold ">Questions {index + 1}:</div>
                                    <div className="pointer-events-none">
                                        <Select value={question.type} >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Please select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="multiple">Multiple choice</SelectItem>
                                                <SelectItem value="single">Single choice</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Tooltip title="Delete">
                                        <button>
                                            <Trash2Icon className="h-5 w-5" />
                                        </button>
                                    </Tooltip>
                                    <Tooltip title="Edit" onClick={() => handleModelToggle(question)}>
                                        <button>
                                            <EditIcon className="h-5 w-5" />
                                        </button>
                                    </Tooltip>
                                </div>
                            </div>

                            <div style={{ padding: '10px 40px 40px 40px' }}>
                                <div className="">
                                    {question.image &&
                                        <div className="flex justify-center my-2 relative group">
                                            <img
                                                src={question.image}
                                                style={{ maxHeight: '150px' }}
                                                className="rounded object-cover"
                                            />


                                        </div>

                                    }
                                </div>
                                <div className='text-semibold font-bold'>
                                    {question.description}
                                </div>
                                {question.options.map((option: any, index: number) => (
                                    <div className="flex gap-5 items-center my-3" key={index}>
                                        {
                                            option.isCorrect ? (
                                                <CheckIcon className="h-5 w-5 text-green-500" />
                                            ) : (
                                                <XIcon className="h-5 w-5 text-red-500" />
                                            )
                                        }
                                        <div className="font-semibold">{String.fromCharCode(65 + index)}:</div>
                                        <div>{option.content}</div>
                                    </div>
                                ))}

                            </div>

                        </div>
                    ))}

                </div>
            </div>
            {selectedQuestion && <DialogContent className="max-w-2xl bg-white">
                <DialogHeader>
                    <DialogTitle>Update Exam</DialogTitle>
                </DialogHeader>
                <div className="flex  items-center justify-between">

                    <Select
                        value={selectedQuestion.type}
                        onValueChange={(value) => updateQuestion('type', value)}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Please select " />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={TYPE_QUESTION_EXAM.MULTIPLE}>Multiple</SelectItem>
                            <SelectItem value={TYPE_QUESTION_EXAM.SINGLE}>Single</SelectItem>
                        </SelectContent>
                    </Select>
                    <Image />
                </div>
                {selectedQuestion.image &&
                    <div className="flex justify-center my-2 relative group">
                        <img
                            src={selectedQuestion.image}
                            style={{ maxHeight: '150px' }}
                            className="rounded object-cover"
                        />

                        <button
                            className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        // onClick={() => handleUpdateQuestion(qs.id, 'image', '', '1')}
                        >
                            Xóa
                        </button>
                    </div>
                }

                <div className="flex flex-col gap-3">

                    <Input
                        value={selectedQuestion.description || ''}
                        onChange={(e) => updateQuestion('description', e.target.value)}
                        placeholder="Enter question description"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <div className="">
                            Answer
                        </div>
                        <div className="">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline">
                                        <EllipsisVertical className="h-5 w-5" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-13" side='top' align="start">
                                    <div className="grid gap-4">

                                        <div className="grid gap-2">
                                            <Button variant={'destructive'} disabled={selectedQuestion?.options?.length === 1}>
                                                Delete
                                            </Button>
                                            <Button variant={'outline'}>
                                                Add
                                            </Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    {selectedQuestion?.options?.map((option: any, index: number) => (
                        <div className="flex gap-5 items-center" key={index}>
                            <Input
                                type={selectedQuestion.type === TYPE_QUESTION_EXAM.SINGLE ? 'radio' : 'checkbox'}
                                checked={option.isCorrect ?? false} className='w-4'
                                onChange={(e) => handleUpdateAnswer(option.id, e.target.value, 'isCorrect')} />
                            <Input
                                value={option.content || ''}
                                onChange={(e) => handleUpdateAnswer(option.id, e.target.value, 'content')}
                                placeholder={`Option ${String.fromCharCode(65 + index)}`}
                            />
                        </div>
                    ))}
                </div>
            </DialogContent>}
        </Dialog>
    )
}
