'use client';
import { Box, Typography } from "@mui/material";
import { Colors } from "@/lib/colors";
import { useEffect, useState } from "react";
import { fetchSchedule } from "@/apis/schedule.apis";
import dayjs from "dayjs";
import "dayjs/locale/vi";

export const HomepageContent = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchSchedule().then((res) => {
      setSchedules(res.data.filter((item: any) => item.start > new Date().toISOString()));
    })
  }, [])
  return (
    <Box
      sx={{
        marginY: 3,
        padding: 4,
      }}
    >
      {/* week's schedule */}
      <Box
        sx={{
          width: "100%",
          border: "0.1px solid #ecf0f1",
          borderRadius: 5,
          boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
          padding: 2,
          transition: "transform 0.4s ease",
          "&:hover": {
            borderColor: Colors.PRIMARY,
            boxShadow: "0px 0px 10px 0px rgba(202, 30, 182, 0.2)",
            transform: "scale(1.01)",
          },
          backgroundColor: Colors.WHITE,
        }}
      >
        <Typography
          sx={{ fontSize: 18, fontWeight: 600, fontFamily: "inherit" }}
        >
          Lịch học kế tiếp
        </Typography>
        <Box
          sx={{
            margin: 2,
            display: "flex",
            gap: { xs: 2, sm: 5, md: 15 }, // Adjust gap for different screen sizes
            flexDirection: { xs: "column", md: "row" }, // Stack items vertically on small screens
            alignItems: "center",
          }}
        >
          {schedules.sort((a: any, b: any) => new Date(a.start).getTime() - new Date(b.start).getTime()).slice(0, 3).map((schedule: any, index: number) => (

            <Box display="flex" key={index} alignItems="center" gap={2}>
              <Box
                component="img"
                src={'/images/learning-to-learn.png'}
                alt=""
                style={{ width: "150px" }}

              />
              <Box >
                <Typography sx={{ fontSize: 16, fontWeight: 550 }}>{schedule.course?.subject?.name}</Typography>
                <Box
                  sx={{
                    marginTop: 4,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  {/* <Typography>Meeting Room</Typography> */}
                  <Typography
                    sx={{ display: "flex", gap: 1, color: "gray", fontSize: 14 }}
                  >
                    {(() => {
                      const str = dayjs(schedule.start).locale('vi').format('dddd, DD/MM/YYYY');
                      return str.charAt(0).toUpperCase() + str.slice(1);
                    })()}
                  </Typography>
                  <Typography sx={{ color: "gray", fontSize: 14 }}>{dayjs(schedule.start).format('HH:mm')}- {dayjs(schedule.end).format('HH:mm')}</Typography>
                </Box>
              </Box>
            </Box>
          ))}



        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography
            sx={{
              color: "green",
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            {/* see more <MdOutlineNavigateNext size={20} /> */}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          border: "0.1px solid #ecf0f1",
          borderRadius: 5,
          boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
          padding: 2,
          marginTop: 3,
          transition: "transform 0.4s ease",
          "&:hover": {
            borderColor: Colors.PRIMARY,
            boxShadow: "0px 0px 10px 0px rgba(202, 30, 182, 0.2)",
            transform: "scale(1.01)",
          },
          backgroundColor: Colors.WHITE,
        }}
      >
        <Typography
          sx={{ fontSize: 18, fontWeight: 600, fontFamily: "inherit" }}
        >
          Bài tập gần đây
        </Typography>

        <Box sx={{ margin: 2 }}>
          {Array.from({ length: 3 }).map((_, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
                border: "0.1px solid #ecf0f1",
                borderRadius: 5,
                boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
                padding: 2,
                transition: "transform 0.4s ease",
                cursor: "pointer",
                "&:hover": {
                  borderColor: Colors.SECONDARY,
                  boxShadow: "0px 0px 10px 0px rgba(202, 30, 182, 0.2)",
                  transform: "scale(1.01)",
                },
              }}
            >
              <Box>
                <Typography sx={{ fontSize: 16, fontWeight: 550 }}>
                  Math Assignment #3
                </Typography>
                <Typography sx={{ color: "gray", fontSize: 14 }}>
                  Due: 2025/04/10
                </Typography>
              </Box>
              <Typography
                sx={{
                  backgroundColor: "#e74c3c20",
                  color: "#e74c3c",
                  padding: "4px 12px",
                  borderRadius: 2,
                  fontSize: 14,
                }}
              >
                Due soon
              </Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography
            sx={{
              color: "green",
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >see all assignments
            {/*  <MdOutlineNavigateNext size={20} /> */}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
