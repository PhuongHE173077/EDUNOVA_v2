import { Colors } from '@/lib/colors';
import { lesson } from '@/types';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {
    Box,
    Button,
    Collapse,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';

export default function ContentCourseDetail({ lesson }: { lesson: lesson[] }) {
    const [visibleSlots, setVisibleSlots] = useState<{ [key: string]: boolean }>({});
    const slotRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const router = useRouter();
    const toggleVisibility = (slotId: string) => {
        setVisibleSlots((prev) => ({
            ...prev,
            [slotId]: !prev[slotId],
        }));
    };
    return (
        <Box sx={{ padding: 2 }}>
            {lesson?.map((ls, index) => (
                <Box
                    key={`slot-${index}`}
                    mb={2}
                    p={2}
                    borderRadius={2}
                    sx={{
                        border: visibleSlots[ls._id] ? `1px solid purple` : '1px solid #ddd',
                        boxShadow: visibleSlots[ls._id]
                            ? '0 6px 12px rgba(0, 0, 0, 0.1)'
                            : '0 2px 4px rgba(0, 0, 0, 0.1)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                            borderColor: 'purple',
                            boxShadow: `0 6px 12px ${Colors.SHADOW}`,
                        },
                    }}
                    ref={(el: HTMLDivElement | null) => (slotRefs.current[ls._id] = el)}
                    onClick={() => toggleVisibility(ls._id)}
                >
                    <Box bgcolor="grey.100" borderRadius="8px" p={2}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Box
                                sx={{
                                    display: 'inline-block',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    borderRadius: 2.5,
                                    padding: '8px 16px',
                                    backgroundColor: '#b39ddb',
                                }}
                            >
                                <Typography variant="subtitle2" color="black" fontSize={15}>
                                    Slot {index + 1}
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap={2}>
                                <Typography variant="body2" color="textSecondary">
                                    2025
                                </Typography>

                                <Button

                                    variant="outlined"
                                    color="secondary"
                                    size="small"
                                >
                                    View Slots
                                </Button>
                            </Box>
                        </Box>
                        <Typography
                            variant="body1"
                            color="textSecondary"
                            mt={1}
                            mb={1}
                            fontWeight="bold"
                        >
                            {ls?.title.split('\n').map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            ))}
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Questions and Assignments */}
                    <Collapse in={visibleSlots[ls._id]}>
                        <Typography variant="subtitle1" color="primary" gutterBottom>
                            Questions
                        </Typography>
                        <List>
                            {ls.questions
                                .map((qs, qIndex) => (

                                    <ListItem
                                        key={`qs-${qIndex}`}
                                        onClick={() => {
                                            router.push(`question?id=${qs._id}&courseId=${ls.courseId}&lessonId=${ls._id}`);
                                        }}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                            opacity: 1,
                                            '&:hover': {
                                                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                                                transform: 'scale(1.02)',
                                            },
                                            transition: 'background-color 0.3s, transform 0.3s',
                                        }}
                                    // onClick={() =>
                                    //     qs.Status !== 0 &&
                                    //     handleClicktoDiscussion(qs.QuestionID, sl)
                                    // }
                                    >
                                        <ListItemIcon>
                                            <HelpOutlineIcon color="action" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={`Q${qIndex + 1}: ${qs.title}`}
                                            secondary={
                                                qs.description.split('\n').map((line, index) => (
                                                    <React.Fragment key={index}>
                                                        {line}
                                                        <br />
                                                    </React.Fragment>
                                                ))
                                            }
                                            secondaryTypographyProps={{
                                                color: 'success',
                                                fontWeight: 'bold',
                                            }}
                                        />
                                        {qs.status !== 'pending' && (
                                            <ArrowForwardIosIcon
                                                fontSize="small"
                                                color="action"
                                            />
                                        )}
                                    </ListItem>

                                ))}
                        </List>
                    </Collapse>
                </Box>
            ))
            }

        </Box >

    )
}
