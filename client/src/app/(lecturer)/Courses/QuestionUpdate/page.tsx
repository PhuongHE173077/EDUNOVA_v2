'use client'
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, IconButton, Typography } from "@mui/material";
import TabSession from './components/TabSession';

export default function LessonPage() {

    return (
        <Box
            sx={{
                width: "98%",
                mx: "auto",
                mt: 2,
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 1,
                p: 3,
            }}
        >
            <Box
                display="flex"
                alignItems="center"
                mb={2}
                sx={{
                    gap: 1,
                }}
            >
                <IconButton
                    onClick={() => window.history.back()}
                    size="small"
                    sx={{
                        bgcolor: "primary.light",
                        color: "primary.main",
                        "&:hover": { bgcolor: "primary.main", color: "white" },
                    }}
                >
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6" fontWeight="bold" color="primary.main">
                    Discussion Home
                </Typography>
            </Box>
            <div>
                <TabSession />
                <hr style={{ border: "1px solid lightgray", margin: "8px auto" }} />

            </div>
        </Box>
    );
}
