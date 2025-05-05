import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Typography,
    Button,
    Collapse,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    Pagination,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AssignmentIcon from '@mui/icons-material/Assignment';

export default function ContentCourseDetail() {
    const [visibleSlots, setVisibleSlots] = useState<{ [key: string]: boolean }>({});
    return (
        <Box>

            <Box
                // key={`slot-${index}`}
                mb={2}
                p={2}
                borderRadius={2}
                sx={{
                    border: visibleSlots[1] ? '2px solid purple' : '1px solid #ddd',
                    boxShadow: visibleSlots[1]
                        ? '0 6px 12px rgba(0, 0, 0, 0.1)'
                        : '0 2px 4px rgba(0, 0, 0, 0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                        borderColor: 'purple',
                        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
                    },
                }}
            // ref={(el: HTMLDivElement | null) => (slotRefs.current[sl] = el)}
            // onClick={() => toggleVisibility(sl)}
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
                                {/* {currentSlot?.SlotName || `Slot ${index + 1}`} */}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={2}>
                            <Typography variant="body2" color="textSecondary">
                                {/* {currentSlot?.TimeStart} - {currentSlot?.TimeEnd} */}2025
                            </Typography>
                            <Button
                                // component={Link}
                                // to={`/lession-infor/`}
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
                        {/* {currentSlot?.Description.split('\n').map((line, index) => (
                            <React.Fragment key={index}>
                                {line}
                                <br />
                            </React.Fragment>
                        ))} */}
                    </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Questions and Assignments */}
                <Collapse in={visibleSlots[1]}>
                    <Typography variant="subtitle1" color="primary" gutterBottom>
                        Questions
                    </Typography>
                    <List>
                        {/* {questionSlot
                            .filter((qs) => qs.Slotid === sl)
                            .map((qs, qIndex) => ( */}
                        <ListItem
                            // key={`qs-${qIndex}`}
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
                                primary={`Q1: as`}
                                secondary={
                                    'onGoing'
                                }
                                secondaryTypographyProps={{
                                    color: 'error',
                                    fontWeight: 'bold',
                                }}
                            />
                            {/* {qs.Status !== 0 && ( */}
                            <ArrowForwardIosIcon
                                fontSize="small"
                                color="action"
                            />
                            {/* )} */}
                        </ListItem>
                        {/* ))} */}

                        {/* {assignmentSlot
                                ?.filter((as) => as?.Slotid === sl)
                                ?.map((as, index) => ( */}
                        <ListItem
                            // key={`as-${index}`}
                            // onClick={() =>
                            //     as.Status !== 0 &&
                            //     handleClickToAssignment(as.AssignmentID, sl)
                            // }
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
                        >
                            <ListItemIcon>
                                <AssignmentIcon color="action" />
                            </ListItemIcon>
                            <ListItemText
                                primary={`Assignment 1: `}
                                secondary={
                                    'Not started'
                                }
                                secondaryTypographyProps={{
                                    color: 'success',
                                    fontWeight: 'bold',
                                }}
                            />
                            {/* {as.Status !== 0 && (
                                            <ArrowForwardIosIcon
                                                fontSize="small"
                                                color="action"
                                            />
                                        )} */}
                        </ListItem>
                        {/* ))} */}
                    </List>
                </Collapse>
            </Box>
        </Box>

    )
}
