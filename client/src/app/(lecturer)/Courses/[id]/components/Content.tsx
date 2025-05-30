'use client';
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
    Typography,
} from '@mui/material';
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
        <Box sx={{ padding: 3 }}>
            {lesson?.map((ls, index) => (
                <Box
                    key={`slot-${index}`}
                    mb={3}
                    p={2}
                    borderRadius={3}
                    sx={{
                        border: `1px solid ${visibleSlots[ls._id] ? '#a29bfe' : '#e0e0e0'}`,
                        boxShadow: visibleSlots[ls._id]
                            ? '0 4px 12px rgba(155, 89, 182, 0.2)'
                            : '0 2px 6px rgba(0,0,0,0.05)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease-in-out',
                        backgroundColor: visibleSlots[ls._id] ? '#f8f0fc' : '#fff',
                        '&:hover': {
                            borderColor: '#a29bfe',
                            boxShadow: `0 6px 14px rgba(155, 89, 182, 0.3)`,
                        },
                    }}
                    ref={(el: HTMLDivElement | null) => (slotRefs.current[ls._id] = el)}
                    onClick={() => toggleVisibility(ls._id)}
                >
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Box
                            sx={{
                                backgroundColor: '#dfe6e9',
                                padding: '4px 12px',
                                borderRadius: 2,
                                fontWeight: 600,
                                fontSize: 14,
                            }}
                        >
                            Tiết {index + 1}
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                            <Typography variant="body2" color="text.secondary">
                                2025
                            </Typography>
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    router.push(`QuestionUpdate?id=${ls._id}`);
                                }}
                                variant="outlined"
                                size="small"
                                sx={{ borderRadius: 20, textTransform: 'none', fontSize: 13 }}
                            >
                                View Slots
                            </Button>
                        </Box>
                    </Box>

                    <Typography variant="subtitle1" fontWeight={600} color="text.primary">
                        {ls?.title.split('\n').map((line, idx) => (
                            <React.Fragment key={idx}>
                                {line}
                                <br />
                            </React.Fragment>
                        ))}
                    </Typography>

                    <Collapse in={visibleSlots[ls._id]}>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="subtitle1" color="primary" gutterBottom>
                            Questions
                        </Typography>
                        <List disablePadding>
                            {ls.questions.map((qs, qIndex) => (
                                <ListItem
                                    key={`qs-${qIndex}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        router.push(`/Courses/Question?id=${qs._id}&courseId=${ls.courseId}&lessonId=${ls._id}`);
                                    }}
                                    sx={{
                                        alignItems: 'flex-start',
                                        borderRadius: 2,
                                        px: 2,
                                        mb: 1,
                                        transition: 'all 0.2s',
                                        '&:hover': {
                                            backgroundColor: '#e3f2fd',
                                            transform: 'translateX(4px)',
                                        },
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: '36px', mt: 0.5 }}>
                                        <HelpOutlineIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={`Q${qIndex + 1}: ${qs.title}`}
                                        secondary={qs.description
                                            .split('\n')
                                            .map((line, i) => (
                                                <React.Fragment key={i}>
                                                    {line}
                                                    <br />
                                                </React.Fragment>
                                            ))}
                                        primaryTypographyProps={{
                                            fontWeight: 600,
                                            fontSize: 15,
                                        }}
                                        secondaryTypographyProps={{
                                            fontSize: 13,
                                            color: '#636e72',
                                        }}
                                    />
                                    {qs.status !== 'pending' && (
                                        <ArrowForwardIosIcon fontSize="small" sx={{ mt: 0.5 }} />
                                    )}
                                </ListItem>
                            ))}
                        </List>
                    </Collapse>
                </Box>
            ))}
        </Box>
    );
}
