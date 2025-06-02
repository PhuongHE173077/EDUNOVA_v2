'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ContentSes from "./components/ContentSes";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import AddQuestionDialog from "./components/AddQuestionDialog";
import AddAssignmentDialog from "./components/AddAssignmentDialog";
import { fetchLessonById } from "@/apis/lession.apis";

export default function LessonPage() {
    const router = useRouter();
    const [openAddQuestion, setOpenAddQuestion] = useState(false);
    const [openAddAssignment, setOpenAddAssignment] = useState(false);
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [lesson, setLesson] = useState<any>(null);
    useEffect(() => {
        fetchData(id);
    }, [id]);

    const fetchData = async (id: any) => {
        if (id) {
            await fetchLessonById(id).then((res) => {
                setLesson(res.data);
            });
        }
    };

    return (
        <div className="w-[98%] mx-auto mt-4 bg-white dark:bg-zinc-900 rounded-lg shadow p-5">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
                <button
                    onClick={() => router.back()}
                    className="p-2 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-xl font-bold text-blue-600">Khoá học</h1>
            </div>

            {/* Action Button */}
            <div className="flex justify-end mb-4" >
                <Popover>
                    <PopoverTrigger asChild>
                        <Button className="bg-primary text-white hover:bg-primary/90">
                            Thêm câu hỏi
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-56">
                        <div className="flex flex-col space-y-2">
                            <Button variant="outline" className="justify-start" onClick={() => setOpenAddQuestion(true)}>
                                ➕ Thêm câu hỏi
                            </Button>
                            <Separator />
                            <Button variant="outline" className="justify-start" onClick={() => setOpenAddAssignment(true)}>
                                📎 Thêm Assignment
                            </Button>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            {/* Content */}
            <div>
                <ContentSes lesson={lesson} setLesson={setLesson} />
                <hr className="my-4 border-gray-300" />
            </div>
            <AddQuestionDialog open={openAddQuestion} setOpen={setOpenAddQuestion} id={id} fetchData={fetchData} />
            <AddAssignmentDialog open={openAddAssignment} setOpen={setOpenAddAssignment} id={id} fetchData={fetchData} />
        </div>
    );
}
