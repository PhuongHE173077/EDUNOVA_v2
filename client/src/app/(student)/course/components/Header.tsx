import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { FiTrendingUp } from "react-icons/fi";

export const HeaderCourse = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const CardItem = () => (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                border: "1px solid #ecf0f1",
                borderRadius: 3,
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.05)",
                padding: 2,
                width: "100%",
                minWidth: 260,
                height: 100,
                backgroundColor: "#fff",
            }}
        >
            <img src={"/images/rank.png"} alt="rank" width="50px" />
            <Box flex={1}>
                <Typography sx={{ fontSize: 14, color: "gray" }}>
                    Your Rank
                </Typography>
                <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                    9
                </Typography>
            </Box>
            <Box textAlign="center">
                <FiTrendingUp size={30} color="green" />
                <Typography sx={{ fontSize: 16, color: "green" }}>
                    +18
                </Typography>
            </Box>
        </Box>
    );

    return (
        <Box mb={4}>
            <Typography sx={{ fontSize: 24, fontWeight: 600 }}>Course</Typography>
            <Box
                display="flex"
                flexDirection={isMobile ? "column" : "row"}
                gap={3}
                mt={3}
                alignItems={isMobile ? "stretch" : "center"}
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    gap={2}
                    width={isMobile ? "100%" : "30%"}
                >
                    <CardItem />
                    <CardItem />
                </Box>
                <Box
                    width={isMobile ? "100%" : "70%"}
                    mt={isMobile ? 2 : 0}
                    display={isMobile ? "none" : "hidden"}
                >
                    <img
                        src={"/images/course_header.png"}
                        alt="course header"
                        style={{
                            width: "100%",
                            borderRadius: 10,
                            objectFit: "cover",
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
};
