'use client';

import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import ColorModeIconDropdown from "./theme/ColorModelconDropdown";
import Link from "next/link";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.shadows[1],
  padding: "8px 12px",

  opacity: 0,
  animation: "fadeIn 0.8s ease-out forwards",

  "@keyframes fadeIn": {
    "0%": { opacity: 0, transform: "translateY(-20px)" },
    "100%": { opacity: 1, transform: "translateY(0)" },
  },
}));

export default function AppAppBar() {
  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            <img
              src="https://res.cloudinary.com/dl3ucqngx/image/upload/v1742392283/EDUNOVA_LOGO_dtt6xz.png"
              alt="EduTrack logo"
              style={{
                marginRight: 8,
                width: 180,
                height: 40,
              }}
            />
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            <Link href="/sign-in" >
              <Button
                color="primary"
                variant="contained"
                size="large"
              >
                Sign In
              </Button>
            </Link>
            <ColorModeIconDropdown />
          </Box>
          {/* Fallback for smaller screens */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
            }}
          >
            <Button
              color="primary"
              variant="contained"
              size="small"
            >
              Sign In
            </Button>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}