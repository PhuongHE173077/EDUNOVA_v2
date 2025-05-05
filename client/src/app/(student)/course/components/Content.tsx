'use client'
import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    Icon,
    Menu,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
import Confetti from "react-confetti";
import dayjs from "dayjs";
import { Course, Semesters } from "@/types";
import { Colors } from "@/lib/colors";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const CourseContent = ({ courses, semester, currentSemester }: { courses: Course[], semester: Semesters[], currentSemester: Semesters }) => {
    const [selectedSemester, setSelectedSemester] = useState<Semesters>(currentSemester);
    const [filteredCourses, setFilteredCourses] = useState<Course[]>(
        courses.filter((course) => course.semester._id === selectedSemester._id)
    );

    const router = useRouter();
    const handleSemesterChange = (e: string) => {
        const selectedSemester = semester.find((sem) => sem._id === e);
        if (selectedSemester) {
            setSelectedSemester(selectedSemester);
            setFilteredCourses(
                courses.filter((course) => course.semester._id === selectedSemester._id)
            );
        }
    }
    return (
        <Box>
            <Box>
                <TextField
                    variant="outlined"
                    select
                    size="small"
                    value={selectedSemester?._id}
                    label="Semester"
                    sx={{
                        width: "200px",
                        marginRight: "16px",
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                            backgroundColor: "white",
                        },
                        "& .MuiInputLabel-root": {
                            color: "#666",
                        },
                        mb: 2,
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        "&:hover": {
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                        },
                        borderRadius: "8px",
                    }}
                    onChange={(e) => handleSemesterChange(e.target.value)}
                >
                    {semester.map((sem, index) => (
                        <MenuItem key={index} value={sem._id}>
                            {sem.name}
                        </MenuItem>
                    ))}

                </TextField>
            </Box>
            <Box>
                {filteredCourses.map((course, index) => (
                    <Card
                        key={`course-${index}`}
                        sx={{
                            transition: "transform 0.4s, box-shadow 0.3s",
                            "&:hover": {
                                transform: "scale(1.01)",
                                boxShadow: `0 10px 20px ${Colors.SHADOW}`,
                            },
                            background: "linear-gradient(135deg, #f9f9f9, #ffffff)",
                            borderRadius: "12px",
                            padding: "15px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                            mt: 2,
                        }}
                        variant="outlined"
                    >
                        <CardContent>
                            <Grid
                                sx={{
                                    animation: "fadeIn 0.8s ease-in-out",
                                    "@keyframes fadeIn": {
                                        from: { opacity: 0, transform: "translateY(20px)" },
                                        to: { opacity: 1, transform: "translateY(0)" },
                                    },
                                }}
                                container
                                spacing={2}
                                alignItems="center"
                            >
                                {/* Title */}
                                <Grid item xs={12} md={4}>
                                    <Typography variant="h6" fontWeight="bold" mb={1}>
                                        {course.subject.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" mb={2}>
                                        {course.subject.id}
                                    </Typography>
                                </Grid>
                                {/* Progress Circle */}

                                <Grid item xs={12} md={4}>
                                    <Box
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            borderRadius: "50%",
                                            position: "relative",
                                            margin: "0 auto",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <>
                                            <Box
                                                sx={{
                                                    position: "absolute",
                                                    top: "-40px",
                                                    left: "50%",
                                                    transform: "translateX(-50%)",
                                                    zIndex: 3,
                                                    fontSize: "20px",
                                                    fontWeight: "bold",
                                                    color: "black",
                                                    textAlign: "center",
                                                    whiteSpace: "nowrap",
                                                }}
                                            >
                                                completion message
                                            </Box>

                                            {/* Confetti*/}
                                            {/* <Confetti
                      width={200}
                      height={200}
                      recycle={false}
                      numberOfPieces={150}
                      gravity={0.4}
                      initialVelocityY={10}
                      colors={["#f59c0b", "#ff6347", "#ffd700", "#adff2f"]}
                      confettiSource={{ x: 38, y: 45, w: 0, h: 0 }}
                    /> */}
                                        </>

                                        {/* Background Circle */}
                                        <svg
                                            width={80}
                                            height={80}
                                            style={{
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                            }}
                                        >
                                            <circle
                                                cx={40}
                                                cy={40}
                                                r={36}
                                                fill="none"
                                                stroke="#e0e0e0"
                                                strokeWidth={6}
                                            />
                                        </svg>

                                        {/* Progress Circle */}
                                        <svg
                                            width={80}
                                            height={80}
                                            style={{
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                            }}
                                        >
                                            <circle
                                                cx={40}
                                                cy={40}
                                                r={36}
                                                fill="none"
                                                stroke="#f59c0b"
                                                strokeWidth={6}
                                                strokeDasharray={2 * Math.PI * 36}
                                                strokeDashoffset={
                                                    2 * Math.PI * 36 - 2 * Math.PI * 36 * 0.75
                                                }
                                                strokeLinecap="round"
                                                transform="rotate(-90 40 40)"
                                                style={{
                                                    animation: "progress 1s ease-out forwards",
                                                }}
                                            />
                                        </svg>

                                        {/* Progress Text */}
                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                            sx={{
                                                position: "absolute",
                                                top: "50%",
                                                left: "50%",
                                                transform: "translate(-50%, -50%)",
                                                color: "black",
                                                zIndex: 2,
                                            }}
                                        >
                                            1
                                        </Typography>
                                    </Box>

                                    <style>
                                        {`
                   @keyframes shake {
                       0% {
                transform: translateX(-50%) rotate(0deg);
                    }
                 25% {
                 transform: translateX(-50%) rotate(10deg);
                      }
                         50% {
                 transform: translateX(-50%) rotate(-10deg);
                      }
                    75% {
                 transform: translateX(-50%) rotate(10deg);
                 }
                      100% {
                 transform: translateX(-50%) rotate(0deg);
                 }  
                      }
                  `}
                                    </style>
                                </Grid>

                                <Grid item xs={12} md={1}></Grid>
                                {/* Course Info */}
                                <Grid item xs={12} md={3}>
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="flex-start"
                                        justifyContent="center"
                                        gap={1}
                                    >
                                        {/* Slot */}
                                        <Typography
                                            variant="body2"
                                            style={{ display: "flex", alignItems: "center" }}
                                        >
                                            <span
                                                style={{
                                                    display: "inline-block",
                                                    width: "8px",
                                                    height: "8px",
                                                    backgroundColor: "#f59c0b",
                                                    borderRadius: "50%",
                                                    marginRight: "8px",
                                                    flexShrink: 0,
                                                }}
                                            ></span>
                                            Lecturer: &nbsp;
                                            <span style={{ fontWeight: "bold" }}>
                                                {course.lecturer.displayName}
                                            </span>
                                        </Typography>

                                        {/* Visit */}
                                        <Typography
                                            variant="body2"
                                            style={{ display: "flex", alignItems: "center" }}
                                        >
                                            <span
                                                style={{
                                                    display: "inline-block",
                                                    width: "8px",
                                                    height: "8px",
                                                    backgroundColor: "#16a28b",
                                                    borderRadius: "50%",
                                                    marginRight: "8px",
                                                    flexShrink: 0,
                                                }}
                                            ></span>
                                            Attendance: &nbsp;
                                            <span style={{ fontWeight: "bold" }}>
                                                1/{course.subject.curriculums.length} Lesson
                                            </span>
                                        </Typography>

                                        {/* Start Date */}
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            style={{ display: "flex", alignItems: "center" }}
                                        >
                                            <span
                                                style={{
                                                    display: "inline-block",
                                                    width: "8px",
                                                    height: "8px",
                                                    backgroundColor: "transparent",
                                                    borderRadius: "50%",
                                                    marginRight: "8px",
                                                    flexShrink: 0,
                                                }}
                                            ></span>
                                            start date: &nbsp;
                                            <span style={{ fontWeight: "bold" }}>
                                                {dayjs(course.startDate).format("DD/MM/YYYY")}
                                            </span>
                                        </Typography>

                                        {/* End Date */}
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            style={{ display: "flex", alignItems: "center" }}
                                        >
                                            <span
                                                style={{
                                                    display: "inline-block",
                                                    width: "8px",
                                                    height: "8px",
                                                    backgroundColor: "transparent",
                                                    borderRadius: "50%",
                                                    marginRight: "8px",
                                                    flexShrink: 0,
                                                }}
                                            ></span>
                                            end date: &nbsp;
                                            <span style={{ fontWeight: "bold" }}>
                                                {dayjs(course.endDate).format("DD/MM/YYYY")}
                                            </span>
                                        </Typography>

                                        {/* Button */}
                                        <Button
                                            variant="contained"
                                            startIcon={<Icon>open_in_new</Icon>}
                                            onClick={() => router.push(`/course/${course._id}`)}
                                            size="medium"
                                            sx={{
                                                background: "linear-gradient(90deg, #16a28b, #20c997)",
                                                color: "#fff",
                                                borderRadius: "20px",
                                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                                                transition: "all 0.3s ease",
                                                "&:hover": {
                                                    background: "linear-gradient(90deg, #20c997, #16a28b)",
                                                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
                                                },
                                                "&:active": {
                                                    transform: "scale(0.95)",
                                                    boxShadow: "inset 0 4px 8px rgba(0, 0, 0, 0.2)",
                                                },
                                            }}
                                        >
                                            See all activity
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>

    );
};
