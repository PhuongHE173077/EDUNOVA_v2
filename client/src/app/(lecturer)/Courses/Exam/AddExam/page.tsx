'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TYPE_QUESTION_EXAM } from '@/lib/constants'
import { FormLabel, Tooltip } from '@mui/material'
import { cloneDeep } from 'lodash'
import { CirclePlus, EllipsisVertical, ImageIcon, Trash2Icon } from 'lucide-react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
export default function Page() {
    const [time, setTime] = useState('');
    const [questions, setQuestions] = useState([
        {
            id: uuidv4(),
            description: '',
            image: '',
            options: [
                { id: uuidv4(), content: '', isCorrect: false },
            ],
            type: TYPE_QUESTION_EXAM.MULTIPLE
        }
    ])
    const handleQuestion = (id: string, type: string) => {
        if (type === 'add') {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                image: '',
                options: [
                    { id: uuidv4(), content: '', isCorrect: false },
                ],
                type: TYPE_QUESTION_EXAM.MULTIPLE
            };
            setQuestions([...questions, newQuestion])
        } else if (type === 'delete') {
            setQuestions(questions.filter(q => q.id !== id));
        }
    }

    const handleUpdateQuestion = (id: string, type: string, value: string, aid: string) => {
        const index = questions.findIndex(q => q.id === id);
        if (index !== -1) {
            const updatedQuestions = cloneDeep(questions);
            if (type === 'description') {
                updatedQuestions[index].description = value;
            } else if (type === 'answerContent') {
                const answer = updatedQuestions[index].options.find((a: any) => a.id === aid);
                answer.content = value;
            } else if (type === 'type') {
                if (value === TYPE_QUESTION_EXAM.SINGLE) {
                    updatedQuestions[index].options.forEach(opt => {
                        opt.isCorrect = false;
                    });
                }
                updatedQuestions[index].type = value;
            }
            setQuestions(updatedQuestions);
        }
    }

    const handleAnswer = (qid: string, id: string, type: string, value: boolean) => {
        const index = questions.findIndex(q => q.id === qid);
        if (index !== -1) {
            const updatedQuestions = cloneDeep(questions);
            if (type === 'add') {
                updatedQuestions[index].options.push({ id: uuidv4(), content: '', isCorrect: false });
            } else if (type === 'delete') {
                updatedQuestions[index].options = updatedQuestions[index].options.filter((a: any) => a.id !== id);
            }
            else if (type === 'answerCorrect') {
                const answer = updatedQuestions[index].options.find((a: any) => a.id === id);
                if (updatedQuestions[index].type === TYPE_QUESTION_EXAM.SINGLE) {
                    updatedQuestions[index].options.forEach(opt => {
                        opt.isCorrect = opt.id === id ? value : false;
                    });
                } else {
                    answer.isCorrect = !answer.isCorrect;

                }
            }
            setQuestions(updatedQuestions);
        }
    }
    return (
        <div className="">

            {/**Header */}
            <div className=" border shadow-sm ">
                <div className="flex justify-between p-3" >
                    <div>Add Exam</div>
                    <div>
                        <Button>
                            Save
                        </Button>
                    </div>
                </div>
            </div>

            {/**Body */}
            <div className="w-full flex gap-10" style={{ padding: "20px 20px 0px 20px" }}>

                {/* Timer */}
                <div className="w-1/5">
                    <div className="w-full border-2  p-5 rounded-lg" style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                        <div className="">
                            <FormLabel className="text-black !text-black font-semibold">Timer:</FormLabel>
                            <Select >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Please select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="120">120 minutes</SelectItem>
                                    <SelectItem value="90">90 minutes</SelectItem>
                                    <SelectItem value="60">60 minutes</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                    </div>
                </div>

                {/* Questions */}
                <div className="w-4/5 flex flex-col gap-5 overflow-y-auto scrollbar-custom2" style={{ maxHeight: '77vh' }}>
                    {questions.map((qs, index) => (
                        <div className=" w-full border-2 rounded-lg" style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }} key={index}>

                            {/* Option type */}
                            <div className="flex p-3 justify-between items-center">
                                {/* Select option type */}
                                <Select
                                    value={qs.type}
                                    onValueChange={(value) => handleUpdateQuestion(qs.id, 'type', value, '')}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Please select " />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={TYPE_QUESTION_EXAM.MULTIPLE}>Multiple</SelectItem>
                                        <SelectItem value={TYPE_QUESTION_EXAM.SINGLE}>Single</SelectItem>
                                    </SelectContent>
                                </Select>

                                {/* Add or remove question */}
                                <div className="flex gap-5">
                                    {questions.length === 1 ?
                                        <Tooltip title="Delete Question" >
                                            <Trash2Icon size={20} className="cursor-pointer text-gray-500" />
                                        </Tooltip>
                                        : <Tooltip title="Delete Question" disableHoverListener={questions.length === 1} onClick={() => handleQuestion(qs.id, 'delete')} >
                                            <Trash2Icon size={20} className="cursor-pointer text-black hover:text-black" />
                                        </Tooltip>}


                                    <Tooltip title="Add question" onClick={() => handleQuestion(qs.id, 'add')}>
                                        <CirclePlus size={20} className="cursor-pointer text-black hover:text-black" />
                                    </Tooltip>
                                </div>
                            </div>

                            {/* Question content */}
                            <div style={{ padding: '10px 40px 40px 40px' }}>

                                {/* Description and image */}
                                <div className='flex gap-5 items-center'>
                                    <Input placeholder='Question title'
                                        className='w-full'
                                        value={qs.description}
                                        onChange={(e) => handleUpdateQuestion(qs.id, 'description', e.target.value, '1')} />

                                    <Tooltip title="Upload Image">
                                        <ImageIcon size={35} className="cursor-pointer text-gray-600 hover:text-black" />
                                    </Tooltip>
                                </div>
                                {qs.image &&
                                    <div className="flex justify-center my-2">
                                        <img src={'https://img-c.udemycdn.com/notices/featured_carousel_slide/image/3176d602-2cd3-456c-9f0e-fc8c710f22db.png'} style={{ maxHeight: '150px' }} />
                                    </div>}


                                {/* Answer Option */}
                                <div className="my-5">
                                    <div className="mb-2">Answer question:</div>
                                    <div className="flex flex-col gap-2">
                                        {qs.options.map((ans, index) => (
                                            <div className="flex gap-2" key={index}>

                                                <Input
                                                    type={qs.type === TYPE_QUESTION_EXAM.MULTIPLE ? 'checkbox' : 'radio'}
                                                    checked={ans.isCorrect ?? false} className='w-4'
                                                    onChange={(e: any) => handleAnswer(qs.id, ans.id, 'answerCorrect', e.target.checked)} />

                                                <Input
                                                    placeholder={'Answer ' + (index + 1)}
                                                    className='w-11/12' value={ans.content}
                                                    onChange={(e) => handleUpdateQuestion(qs.id, 'answerContent', e.target.value, ans.id)} />
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button variant="outline">
                                                            <EllipsisVertical className="h-5 w-5" />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-13" side='top' align="start">
                                                        <div className="grid gap-4">

                                                            <div className="grid gap-2">
                                                                <Button variant={'destructive'} onClick={() => handleAnswer(qs.id, ans.id, 'delete', false)} disabled={qs.options.length === 1}>
                                                                    Delete
                                                                </Button>
                                                                <Button variant={'outline'} onClick={() => handleAnswer(qs.id, ans.id, 'add', false)}>
                                                                    Add
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
