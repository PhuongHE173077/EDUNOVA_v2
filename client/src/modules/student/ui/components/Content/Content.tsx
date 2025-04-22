import { Box, Typography } from "@mui/material";
import { Colors } from "@/lib/colors";

export const HomepageContent = () => {
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
          Week's schedule
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
          <Box display="flex" alignItems="center" gap={2}>
            <Box
              component="img"
              src={'/images/learning-to-learn.png'}
              alt=""
              style={{ width: "150px" }}

            />
            <Box >
              <Typography sx={{ fontSize: 16, fontWeight: 550 }}>Math 02</Typography>
              <Box
                sx={{
                  marginTop: 4,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Typography>Meeting Room</Typography>
                <Typography
                  sx={{ display: "flex", gap: 1, color: "gray", fontSize: 14 }}
                >
                  2025/04/06
                </Typography>
                <Typography sx={{ color: "gray", fontSize: 14 }}>10:00 - 12:00</Typography>
              </Box>
            </Box>
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <img src={'/images/learning-to-learn.png'} alt="" width="150px" />
            <Box>
              <Typography sx={{ fontSize: 16, fontWeight: 550 }}>Math 02</Typography>
              <Box
                sx={{
                  marginTop: 4,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Typography>Meeting Room</Typography>
                <Typography
                  sx={{ display: "flex", gap: 1, color: "gray", fontSize: 14 }}
                >
                  2025/04/06
                </Typography>
                <Typography sx={{ color: "gray", fontSize: 14 }}>10:00 - 12:00</Typography>
              </Box>
            </Box>
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <img src={'/images/learning-to-learn.png'} alt="" width="150px" />
            <Box>
              <Typography sx={{ fontSize: 16, fontWeight: 550 }}>Math 02</Typography>
              <Box
                sx={{
                  marginTop: 4,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Typography>Meeting Room</Typography>
                <Typography
                  sx={{ display: "flex", gap: 1, color: "gray", fontSize: 14 }}
                >
                  2025/04/06
                </Typography>
                <Typography sx={{ color: "gray", fontSize: 14 }}>10:00 - 12:00</Typography>
              </Box>
            </Box>
          </Box>
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
          Upcoming Assignments
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
