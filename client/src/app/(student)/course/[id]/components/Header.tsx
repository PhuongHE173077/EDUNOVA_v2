import React, { useEffect, useState } from 'react';
import {
    Box,
    Breadcrumbs,
    Link,
    Typography,
    Select,
    MenuItem,
    Button,
    IconButton,
    Collapse,
    Tooltip,
    SelectChangeEvent
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';

export default function HeaderCourseDetail() {
    const [activityFilter, setActivityFilter] = useState('All Activities');
    console.log(activityFilter);
    const [isVisible, setIsVisible] = useState(true);
    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        setActivityFilter(event.target.value as string);
    };
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };
    return (
        <Box p={3}>
            {/* Breadcrumbs */}
            <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
                <Link href="/homePage" color="inherit" underline="hover" display="flex" alignItems="center">
                    <HomeIcon fontSize="small" sx={{ mr: 0.5 }} />
                    Home
                </Link>
                <Link href="/homePage" color="inherit" underline="hover" display="flex" alignItems="center">
                    <Typography color="text.secondary" display="flex" alignItems="center">
                        Course
                    </Typography>
                </Link>

                <Typography color="text.primary" display="flex" alignItems="center">
                    234
                </Typography>
            </Breadcrumbs>

            {/* Dropdowns and Exam Button in a collapsible container */}
            <Collapse in={isVisible}>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                    {/* Slot Select with SlotName */}
                    <Select
                        variant="outlined"
                        sx={{ minWidth: 120, color: "black", backgroundColor: "white" }}
                        size="small"
                        displayEmpty
                        // onChange={handleSlotChange}
                        defaultValue=""
                    >
                        <MenuItem value="">Select Slot</MenuItem>

                        <MenuItem key={`slt-1`} value={1}>
                            Slot 1
                        </MenuItem>

                    </Select>

                    {/* Class Select with "Select Class" placeholder */}
                    <Select
                        variant="outlined"
                        sx={{ minWidth: 160, color: "black", backgroundColor: "white" }}
                        size="small"
                        // displayEmpty
                        defaultValue="index"
                    >


                        <MenuItem value="index">
                            12


                        </MenuItem>
                    </Select>


                    {/* Exam Button */}
                    <Button
                        variant="contained"
                        color="secondary"
                        // onClick={navigateToExam}
                        size="medium"
                        sx={{ whiteSpace: 'nowrap' }}
                    >
                        EXAM
                    </Button>
                </Box>
            </Collapse>

            {/* Toggle Visibility Button */}
            <Tooltip title={isVisible ? 'Hide Options' : 'Show Options'} arrow>
                <IconButton onClick={toggleVisibility} color="primary" size="small">
                    {isVisible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
            </Tooltip>

            {/* Button Text Toggle */}
            <Button
                onClick={toggleVisibility}
                style={{
                    color: isVisible ? 'red' : 'green',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    marginTop: '8px',
                }}
            >
                {isVisible ? 'Hide Options' : 'Show Options'}
            </Button>

            {/* Teacher Information */}
            <Box mt={2} display="flex" alignItems="center" gap={1}>
                <SchoolIcon color="primary" />
                <Typography variant="body2" color="textSecondary">
                    Teacher Name:abc
                </Typography>
            </Box>
        </Box>
    )
}
