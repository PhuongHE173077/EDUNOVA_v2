'use client'
import { createNewExam } from '@/apis/exam.apis'
import { uploadImageAPIs } from '@/apis/image.apis'
import { UploadFileDialog } from '@/components/dialog/upload.file.xlsx'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useIsMobile } from '@/hooks/use-mobile'
import { TYPE_QUESTION_EXAM } from '@/lib/constants'
import { singleFileValidator } from '@/lib/validators'
import { FormLabel, Tooltip } from '@mui/material'
import { cloneDeep } from 'lodash'
import { CirclePlus, Download, EllipsisVertical, ImageIcon, ImagePlus, Trash2, Trash2Icon, Upload } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'
import * as XLSX from 'xlsx';
export default function Page() {
    const [viewAnswer, setViewAnswer] = useState(true);
    const [viewDate, setViewDate] = useState(false);
    const [date, setDate] = useState('');
    const [imageCover, setImageCover] = useState('');
    const [error, setError] = useState<any[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const fileQuestionRef = useRef<{ [key: string]: HTMLInputElement | null }>({});
    const questionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const [file, setFile] = useState(null);

    const handleFileChangeF = (e: any) => {
        setFile(e.target.files[0]);

    };

    const handleUpload = () => {
        if (!file) {
            alert("Vui lòng chọn một file trước khi tải lên.");
            return;
        }
        const reader = new FileReader();

        reader.onload = (event: any) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            const newQuestions = jsonData.map((item: any) => ({
                id: uuidv4(),
                description: item.Question,
                image: item.Image || '',
                options: [
                    item.Option_A && { id: uuidv4(), content: item.Option_A, isCorrect: item.Correct_Answer.split(',').includes('A') },
                    item.Option_B && { id: uuidv4(), content: item.Option_B, isCorrect: item.Correct_Answer.split(',').includes('B') },
                    item.Option_C && { id: uuidv4(), content: item.Option_C, isCorrect: item.Correct_Answer.split(',').includes('C') },
                    item.Option_D && { id: uuidv4(), content: item.Option_D, isCorrect: item.Correct_Answer.split(',').includes('D') },
                    item.Option_E && { id: uuidv4(), content: item.Option_D, isCorrect: item.Correct_Answer.split(',').includes('E') },
                    item.Option_F && { id: uuidv4(), content: item.Option_D, isCorrect: item.Correct_Answer.split(',').includes('F') },
                    item.Option_G && { id: uuidv4(), content: item.Option_D, isCorrect: item.Correct_Answer.split(',').includes('G') },
                ].filter((option: any) => option !== undefined),
                type: item.Type
            }));
            setQuestions(newQuestions);
            setOpen2(false)
            setHasChanges(true);
        };
        reader.readAsArrayBuffer(file);

    };
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            title: '',
            time: '',
        }
    });
    const searchParams = useSearchParams();
    const courseId = searchParams.get('courseId');
    const [open2, setOpen2] = useState(false);

    const router = useRouter();

    const isMobile = useIsMobile();

    const [open, setOpen] = useState(false);

    const handleIconClick = () => {
        fileInputRef.current?.click();
    };
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

    const [hasChanges, setHasChanges] = useState(false);
    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (hasChanges) {
                event.preventDefault();
                event.returnValue = ''; // Chrome yêu cầu để hiện popup cảnh báo
            }
        };

        const handlePopState = (event: PopStateEvent) => {
            if (hasChanges) {
                const confirmLeave = window.confirm('Bạn có thay đổi chưa lưu. Bạn có chắc muốn rời khỏi trang?');
                if (!confirmLeave) {
                    history.pushState(null, '', window.location.href);
                }
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('popstate', handlePopState);
        };
    }, [hasChanges]);

    const handleQuestion = (id: string, type: string) => {
        if (type === 'add') {
            const newId = uuidv4();
            const newQuestion = {
                id: newId,
                description: '',
                image: '',
                options: [
                    { id: uuidv4(), content: '', isCorrect: false },
                ],
                type: TYPE_QUESTION_EXAM.MULTIPLE
            };
            setQuestions([...questions, newQuestion])
            setTimeout(() => {
                questionRefs.current[newId]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        } else if (type === 'delete') {
            setQuestions(questions.filter(q => q.id !== id));
        }
        setHasChanges(true);
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
                    updatedQuestions[index].options.forEach((opt: any) => {
                        opt.isCorrect = false;
                    });
                }
                updatedQuestions[index].type = value;
            }
            else if (type === 'image') {
                updatedQuestions[index].image = '';
            }
            setQuestions(updatedQuestions);
        }
        setHasChanges(true);
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
                    updatedQuestions[index].options.forEach((opt: any) => {
                        opt.isCorrect = opt.id === id ? value : false;
                    });
                } else {
                    answer.isCorrect = !answer.isCorrect;

                }
            }
            setQuestions(updatedQuestions);
        }
        setHasChanges(true);
    }

    const save = () => {
        alert('Save')
    }



    const handleFileChange = async (e: any) => {
        const image = await uploadImage(e);

        if (image) setImageCover(image);
    };

    const uploadImage = async (e: any) => {
        const file = e.target?.files?.[0];
        const error = singleFileValidator(file);
        if (error) {
            toast.error(error);
            return null;
        }

        let reqData = new FormData();
        reqData.append('image', file);

        try {
            const response = await toast.promise(
                uploadImageAPIs(reqData),
                { pending: 'Uploading...' }
            );
            e.target.value = '';
            return response.data;
        } catch (err) {
            toast.error("Upload failed");
            return null;
        }
    };

    const handleImageInQuestion = async (qid: string, e: any) => {
        const image = await uploadImage(e);
        const updatedQuestions = cloneDeep(questions);
        const index = updatedQuestions.findIndex(q => q.id === qid);
        if (index !== -1) {
            updatedQuestions[index].image = image;
            setQuestions(updatedQuestions);
        }
        setHasChanges(true);
    }


    const onSubmit = async (data: any) => {
        // console.log("🚀 ~ onSubmit ~ onSubmit:", courseId)
        const { title, time } = data;
        const newExam = {
            title,
            time,
            imageCover,
            date,
            viewAnswer,
            questions
        }
        try {
            await createNewExam(newExam, courseId).then(() => {
                setHasChanges(false);
                toast.success('Success');
                setTimeout(() => {
                    router.replace('/Courses/Exam?courseId=' + courseId);
                }, 1000);

            })
        } catch (error) {
            console.error('Login failed:', error);
        }


    }

    const handleCheckError = () => {
        setError([])
        const invalidQuestionIds = questions
            .filter((question) => {
                const hasValidDescription = question.description.trim() !== '';
                const allOptionsHaveContent = question.options.every(option => option.content.trim() !== '');
                const hasAtLeastOneCorrect = question.options.some(option => option.isCorrect === true);

                return !(hasValidDescription && allOptionsHaveContent && hasAtLeastOneCorrect);
            })
            .map((question) => question.id);

        if (invalidQuestionIds.length > 0) {
            setError(invalidQuestionIds);
            setTimeout(() => {
                questionRefs.current[invalidQuestionIds[0]]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
            setOpen(false);
        } else {
            setOpen(true);
        }

    }
    const handleDownloadTemplate = () => {
        // Thay link này bằng link thực tế đến file template
        window.open("/templates/template_exam.xlsx", "_blank");
    };


    return (
        <Dialog open={open} onOpenChange={setOpen}>

            {/**Header */}
            <div className=" border shadow-sm ">
                <div className="flex justify-between p-3" >
                    <div>Add Exam</div>
                    <div className='flex gap-2'>
                        <Button variant={'outline'} onClick={save}>Save</Button>

                        <Button onClick={handleCheckError}>Create</Button>

                    </div>
                </div>
            </div>

            {/**Body */}
            <div className="w-full flex gap-10" style={{ padding: "20px 20px 0px 20px" }}>

                {/* Timer */}
                <div className="hidden lg:block lg:w-1/5 md:block md:w-1/4">
                    <div className="w-full border-2  p-5 rounded-lg" style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                        <div className="">
                            <FormLabel className="text-black !text-black font-semibold">Timer:</FormLabel>
                            <Controller
                                name="time"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <FormLabel className="text-black !text-black font-semibold">Timer:</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
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
                                    </>
                                )}
                            />
                        </div>

                    </div>
                    <div className="text-center mt-5 ">
                        <Button className='bg-[#1dd1a1] hover:bg-[#1dd1a1]/80 text-black' onClick={() => setOpen2(true)}>
                            Add File (.xlsx)
                        </Button>
                    </div>
                </div>

                {/* Questions */}
                <div className="w-full lg:w-4/5 flex flex-col gap-5 overflow-y-auto scrollbar-custom2" style={{ maxHeight: '77vh' }}>
                    {questions.map((qs, index) => (
                        <div
                            className=" w-full border-2 rounded-lg"
                            style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}
                            key={index}
                            ref={(el) => (questionRefs.current[qs.id] = el)}
                        >

                            {/* Option type */}
                            <div className="flex p-3 justify-between items-center">
                                {/* Select option type */}
                                <div className="flex  items-center">
                                    {!isMobile ? <strong>Question </strong> : <strong>Q </strong>}
                                    <strong className='ml-2 mr-2'>{index + 1}:</strong>
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
                                    {
                                        error.includes(qs.id) && !isMobile && <span className='text-red-600'>* This question has no title or no options or no correct answer</span>
                                    }
                                </div>

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
                            {
                                error.includes(qs.id) && isMobile && <span className='text-red-600 px-3'>* This question has no title or no options or no correct answer</span>
                            }

                            {/* Question content */}
                            <div style={{ padding: '10px 40px 40px 40px' }}>

                                {/* Description and image */}
                                <div className='flex gap-5 items-center'>
                                    <Input placeholder='Question title'
                                        className='w-full'
                                        value={qs.description}
                                        onChange={(e) => handleUpdateQuestion(qs.id, 'description', e.target.value, '1')} />

                                    <Tooltip title="Upload Image">
                                        <div className="" onClick={() => fileQuestionRef.current[qs.id]?.click()}>
                                            <ImageIcon size={35} className="cursor-pointer text-gray-600 hover:text-black"

                                            />
                                            <Input type='file' ref={(el) => (fileQuestionRef.current[qs.id] = el)} onChange={(e) => handleImageInQuestion(qs.id, e)} className='hidden' />
                                        </div>
                                    </Tooltip>
                                </div>
                                {qs.image &&
                                    <div className="flex justify-center my-2 relative group">
                                        <img
                                            src={qs.image}
                                            style={{ maxHeight: '150px' }}
                                            className="rounded object-cover"
                                        />

                                        <button
                                            className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                            onClick={() => handleUpdateQuestion(qs.id, 'image', '', '1')}
                                        >
                                            Xóa
                                        </button>
                                    </div>

                                }


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
            </div >
            <DialogContent className="max-w-2xl bg-white">
                <DialogHeader>
                    <DialogTitle>Exam Settings</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className='flex gap-5 items-center'>
                        <div className="w-1/2">

                            <div className="mb-2">
                                <FormLabel className="text-black !text-black font-semibold">Title exam</FormLabel>
                                <Input
                                    type="text"
                                    {...register("title", { required: "Title is required" })}
                                    placeholder="Title exam"
                                    className="w-full" />
                                {errors.title && (
                                    <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                                )}
                            </div>

                            {/* Timer */}
                            <div className="mb-2">
                                <FormLabel className="text-black !text-black font-semibold">Timer:</FormLabel>
                                <Controller
                                    control={control}
                                    name="time"
                                    rules={{ required: 'Please select a time' }}
                                    render={({ field, fieldState }) => (
                                        <>
                                            <FormLabel className="text-black font-semibold">Timer:</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
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
                                            {fieldState.error && (
                                                <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                            )}
                                        </>
                                    )}

                                />
                            </div>

                            {/* View Answer */}

                            <div className="mb-2">
                                <FormLabel className="text-black !text-black font-semibold">View Answer:</FormLabel>
                                <Select
                                    value={viewAnswer.toString()}
                                    onValueChange={(e) => setViewAnswer(e === "true")}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Please select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="true">Yes</SelectItem>
                                        <SelectItem value="false">No</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Set Working Date */}
                            <div className="mb-2">
                                <FormLabel className="text-black !text-black font-semibold">Do you want to set working date:</FormLabel>
                                <Select
                                    value={viewDate.toString()}
                                    onValueChange={(e) => {
                                        if (e === "false") {
                                            setDate('')
                                            setViewDate(false)
                                        } else {
                                            setViewDate(true)
                                        }

                                    }}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Please select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="true">Yes</SelectItem>
                                        <SelectItem value="false">No</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            {viewDate && <div className="mb-2">
                                <FormLabel className="text-black !text-black font-semibold">Working Date:</FormLabel>
                                <Input type={'date'} value={date} onChange={(e) => setDate(e.target.value)} />
                            </div>}
                        </div>
                        {
                            imageCover ?
                                <div className="w-1/2 relative group">
                                    <img src={imageCover} alt="" className="h-3/4 object-cover rounded-lg" />

                                    <button
                                        className="absolute top-2 right-2 bg-gray-500 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                        onClick={() => setImageCover('')}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                : <div className="border-2 p-10 h-full w-1/2 rounded-lg flex items-center justify-center" onClick={handleIconClick}>
                                    <Tooltip title="Upload Image">
                                        <ImagePlus className="w-8 h-8 text-gray-500 cursor-pointer" />
                                    </Tooltip>

                                    <Input type={'file'} ref={fileInputRef} className="hidden" onChange={handleFileChange} />
                                </div>
                        }
                    </div>
                    <div className='flex justify-end'>
                        <Button type="submit">Save</Button>
                    </div>
                </form>
            </DialogContent>


            <UploadFileDialog
                open={open2}
                setOpen={setOpen2}
                handleChange={handleFileChangeF}
                handleDownload={handleDownloadTemplate}
                handleUpload={handleUpload}
                required={'Question, Type, Answer(A,B,...), Answer correct'}
            />
        </Dialog >
    )
}
