'use client'

import { fetchLessonById } from '@/apis/lession.apis';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, IconButton, Typography } from "@mui/material";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import TabSession from './components/TabSession';

export default function LessonPage() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [lesson, setLesson] = useState<any>(null);
    const [isLessonDialogOpen, setLessonDialogOpen] = useState(false);
    const [isQuestionDialogOpen, setQuestionDialogOpen] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState<any>(null);
    const [newLesson, setNewLesson] = useState({ title: '', description: '' });
    const [newQuestion, setNewQuestion] = useState({ title: '', description: '', type: 'question' });

    useEffect(() => {
        if (id) {
            fetchLessonById(id).then((res) => {
                setLesson(res.data);
                setNewLesson({ title: res.data.title, description: res.data.description });
            });
        }
    }, [id]);

    const handleUpdateLesson = async () => {
        // await updateLesson(id, newLesson);
        setLessonDialogOpen(false);
    };

    const handleSubmitQuestion = async () => {
        if (editingQuestion) {
            //   await updateQuestion(editingQuestion._id, newQuestion);
        } else {
            //   await addQuestion({ ...newQuestion, lessonId: id });
        }
        setQuestionDialogOpen(false);
        setEditingQuestion(null);
    };

    return (
        <Box
            sx={{
                width: "98%",
                mx: "auto",
                mt: 2,
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 1,
                p: 3,
            }}
        >
            <Box
                display="flex"
                alignItems="center"
                mb={2}
                sx={{
                    gap: 1,
                }}
            >
                <IconButton
                    onClick={() => window.history.back()}
                    size="small"
                    sx={{
                        bgcolor: "primary.light",
                        color: "primary.main",
                        "&:hover": { bgcolor: "primary.main", color: "white" },
                    }}
                >
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6" fontWeight="bold" color="primary.main">
                    Discussion Home
                </Typography>
            </Box>
            <div>
                <TabSession />
                <hr style={{ border: "1px solid lightgray", margin: "8px auto" }} />
                {/* <AddActivity /> */}
            </div>
        </Box>
    );
}
