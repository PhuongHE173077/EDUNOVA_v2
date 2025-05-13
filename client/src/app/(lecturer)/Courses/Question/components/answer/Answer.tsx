import { fetchAnswerByQuestionId, updateAnswer } from '@/apis/answer.lesson.apis';
import { DEFAULT_ITEMS_PER_PAGE } from '@/lib/constants';
import { answerLesson } from '@/types';
import { Box, Pagination, PaginationItem, useColorScheme } from '@mui/material';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Comment } from '../comment/Comment';

export default function Answer() {
    const [value, setValue] = useState<any>("");
    const [answers, setAnswers] = useState<answerLesson[]>([]);
    const { mode } = useColorScheme()
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const courseId = searchParams.get("courseId");
    const lessonId = searchParams.get("lessonId");
    const [totalAnswer, setTotalAnswer] = useState(0);
    const pageQuery = searchParams.get("page")

    const page = parseInt(pageQuery || "1")
    useEffect(() => {

        fetchAnswerByQuestionId(id, page).then((res) => {
            setAnswers(res.data.answers);
            setTotalAnswer(res.data.totalAnswers);
        })
    }, [page])

    const handleVote = async (answer: answerLesson, start: any) => {

        if (start) {
            await updateAnswer(answer._id, { star: start }).then((res) => {
                fetchAnswerByQuestionId(id, page).then((res) => {
                    setAnswers(res.data.answers);
                    setTotalAnswer(res.data.totalAnswers);
                })
            })
        }

    }
    return (
        <div >
            <div className="font-semibold text-blue-600 my-3 text-xl" >
                Student answer:
            </div>
            {(totalAnswer > 0) &&
                <Box sx={{
                    position: 'fixed',
                    bottom: 5,
                    left: 0,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    zIndex: 1000,
                    py: 1,

                }}>
                    <Pagination
                        size="small"
                        showFirstButton
                        showLastButton
                        variant="outlined"
                        shape="rounded"
                        count={Math.ceil(totalAnswer / DEFAULT_ITEMS_PER_PAGE)}
                        page={page}
                        renderItem={(item) => (
                            <PaginationItem
                                component={Link}
                                href={`Question?id=${id}&courseId=${courseId}&lessonId=${lessonId}${item.page === 1 ? '' : `&page=${item.page}`}`}
                                {...item}
                            />
                        )}
                    />
                </Box>
            }

            {answers.map((answer) => (
                <Box
                    key={answer._id}
                    sx={{ marginBottom: "10px" }}
                >
                    <Comment
                        answer={answer}
                        handleVote={handleVote}
                    />
                </Box>
            ))}
        </div>
    )
}
