import { questionLesson } from '@/types';
import { Card, CardContent, Typography, Box } from '@mui/material';

export const QuestionLesion = ({ question }: { question: questionLesson }) => {
    return (
        <Card style={{
            border: "1px solid lightgray",
            borderRadius: "20px",
            maxWidth: "850px",
            marginBottom: "1rem",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s ease-in-out",
            overflow: "hidden"
        }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
            <CardContent style={{
                backgroundColor: "rgb(250, 246, 246)",
                padding: "16px",
                fontFamily: "'Poppins', sans-serif"
            }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" component="div" style={{ color: '#3a3a3a', marginBottom: '8px' }}>
                        {question.title}
                    </Typography>
                    <Typography variant="body2" style={{ color: 'red', fontSize: "20px", marginTop: "8px" }}>
                        start
                        {/* {status === 0
                    ? t('status_not_started')
                    : status === 1
                      ? `${t('status_time_remaining')} ${formatTime(timeRemaining ?? 0)}`
                      : t('status_time_over')} */}
                    </Typography>
                </Box>
                <hr style={{ border: "1px solid lightgray", margin: "8px auto" }} />

                <Typography variant="body2" style={{ color: "#555", fontSize: "14px", marginBottom: "8px" }}>
                    {question.description}
                </Typography>
            </CardContent>
        </Card>
    )
}
