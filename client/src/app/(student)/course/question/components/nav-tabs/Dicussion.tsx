import { createNewAnswer, fetchAnswerByQuestionId } from "@/apis/answer.lesson.apis";
import { Loading } from "@/components/ui/loading";
import { DEFAULT_ITEMS_PER_PAGE, TYPE_QUESTION } from "@/lib/constants";
import { answerLesson } from "@/types";
import SendIcon from "@mui/icons-material/Send";
import {
    Box,
    Button,
    Pagination,
    PaginationItem,
    Typography,
    useColorScheme
} from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import { useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import rehypeSanitize from "rehype-sanitize";
import { Comment } from "./Comment";
import remarkBreaks from 'remark-breaks';
import Link from "next/link";
export default function Discussion({ setIsLoading }: any) {
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
    }, [id, page])

    const handleSubmit = async () => {
        if (!value) {
            toast.error("Please enter your comment");
        } else {
            setIsLoading(true);
            const data = {
                answer: value,
                questionId: id,
                type: TYPE_QUESTION.QUESTION
            }
            await createNewAnswer(data)
            await fetchAnswerByQuestionId(id, page).then((res) => {
                setAnswers(res.data.answers);
                setTotalAnswer(res.data.totalAnswers);
            })
            setValue("");
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);

        }
    }


    return (
        <Fragment>
            <Box>
                <Box
                    sx={{

                        margin: "20px auto",
                        padding: "30px",
                        border: "1px solid #e0e0e0",
                        borderRadius: "12px",
                        backgroundColor: "#ffffff",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Typography variant="h6" sx={{ marginBottom: "12px", fontWeight: "600" }}>
                        Add a comment
                    </Typography>
                    <Box
                        data-color-mode={mode}
                        sx={{
                            backgroundColor: "#f4f6f8",
                            borderRadius: "12px",
                            p: 2,
                            mb: 3,
                            transition: "box-shadow 0.3s ease",
                            "& .w-md-editor-toolbar": {
                                backgroundColor: "#f4f6f8",

                                '& button': {
                                    color: "#1c1e21",
                                }
                            },
                            "& ul:nth-of-type(2)": {
                                display: "none",
                            },
                        }}
                    >
                        <MDEditor
                            value={value}
                            onChange={setValue}
                            previewOptions={{
                                rehypePlugins: [[rehypeSanitize]],
                                remarkPlugins: [remarkBreaks]
                            }}
                            preview="edit"
                            style={{
                                backgroundColor: "transparent",
                                border: "none",
                                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                                color: "#1c1e21",
                            }}
                        />
                    </Box>


                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "15px" }}>
                        {/* {editingCommentId ? (
                            <>
                                <Button >{t('cancel1')}</Button>
                                <Button
                                    onClick={handleSubmit}
                                    disabled={isCommentDisabled}
                                    color="secondary"
                                    variant="contained"
                                    startIcon={<SaveIcon />}
                                >
                                    save
                                </Button>
                            </>
                        ) : ( */}
                        <Button

                            variant="contained"
                            sx={{
                                backgroundColor: "#fd9644",
                            }}
                            endIcon={<SendIcon />}
                            onClick={() => handleSubmit()}
                        >
                            Send
                        </Button>

                    </Box>
                </Box>

            </Box>

            <Typography variant="h6" sx={{ margin: "1rem", fontWeight: "bold", color: "#3f51b5" }}>
                Your Comments
            </Typography>
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
                                href={`question?id=${id}&courseId=${courseId}&lessonId=${lessonId}${item.page === 1 ? '' : `&page=${item.page}`}`}
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
                    />
                </Box>
            ))}
        </Fragment>
    )
}
