'use client';

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import * as React from "react";
import SendIcon from "@mui/icons-material/Send";
import { Grid, Alert } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
      {"Copyright © "}
      <Link color="text.secondary" href="https://edutrack.com/">
        EduTrack
      </Link>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}



export default function Footer() {
  const [statusMessage, setStatusMessage] = React.useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatusMessage(null);
    setIsSubmitting(true);
  };

  return (
    <Container

      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: "center", md: "left" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            minWidth: { xs: "100%", sm: "60%" },
          }}
        >
          {/* Create Account Form Section */}
          <Box sx={{ width: { xs: "100%", sm: "60%" } }}>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ fontWeight: 600, mt: 2 }}
            >
              Yêu cầu cấp tài khoản
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
              Vui lòng điền vào biểu mẫu bên dưới để yêu cầu cấp tài khoản.
              Chúng tôi sẽ xử lý và liên hệ lại với bạn trong thời gian sớm
              nhất.
            </Typography>

            <form onSubmit={sendEmail}>
              <Grid container spacing={1}>
                {/* Email Field */}
                <Grid item xs={12}>
                  <TextField
                    label={"Email "}
                    variant="outlined"
                    name="email_from"
                    placeholder="person@example.com"
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        backgroundColor: "#f7f7f7",
                        "&:hover": { backgroundColor: "#eeeeee" },
                      },
                      width: "95%",
                    }}
                  />
                </Grid>

                {/* Message Field */}
                <Grid item xs={12}>
                  <TextField
                    label={"Student messages"}
                    variant="outlined"
                    name="message"
                    placeholder="Your message for idStudent here..."
                    required
                    multiline
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        backgroundColor: "#f7f7f7",
                        "&:hover": { backgroundColor: "#eeeeee" },
                      },
                      width: "95%",
                    }}
                  />
                </Grid>
              </Grid>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                endIcon={<SendIcon />}
                disabled={isSubmitting}
                sx={{
                  marginTop: 3,
                  width: "100%",
                  padding: "12px 0",
                  fontSize: "14px",
                  fontWeight: "bold",
                  backgroundColor: "#007bff",
                  color: "#ffffff",
                  borderRadius: "6px",
                  textTransform: "none",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#0056b3",
                  },
                }}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>

            {/* Status Message */}
            {statusMessage && (
              <Alert
                severity={statusMessage.type}
                sx={{ width: "100%", marginTop: 2 }}
              >
                {statusMessage.message}
              </Alert>
            )}
          </Box>
        </Box>

        {/* Other Sections (Product, Company, Resources) */}
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: "medium" }}>
            Product
          </Typography>
          <Link color="text.secondary" variant="body2" href="#">
            Features
          </Link>
          <Link color="text.secondary" variant="body2" href="#">
            plans
          </Link>
          <Link color="text.secondary" variant="body2" href="#">
            tutorials
          </Link>
          <Link color="text.secondary" variant="body2" href="#">
            faqs
          </Link>
        </Box>

        {/* Footer Links */}
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: "medium" }}>
            Company
          </Typography>
          <Link color="text.secondary" variant="body2" href="#">
            about us
          </Link>
          <Link color="text.secondary" variant="body2" href="#">
            careers
          </Link>
          <Link color="text.secondary" variant="body2" href="#">
            contact
          </Link>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pt: { xs: 4, sm: 8 },
          width: "100%",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <div>
          <Link color="text.secondary" variant="body2" href="#">
            privacy policy
          </Link>
          <Typography sx={{ display: "inline", mx: 0.5, opacity: 0.5 }}>
            &nbsp;•&nbsp;
          </Typography>
          <Link color="text.secondary" variant="body2" href="#">
            terms of service
          </Link>
          <Copyright />
        </div>
        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{ justifyContent: "left", color: "text.secondary" }}
        >
          <IconButton
            color="inherit"
            size="small"
            href="https://github.com/PhamKien2803/EDUTRACK-CPL_04_Group03"
            aria-label="GitHub"
            sx={{ alignSelf: "center" }}
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            color="inherit"
            size="small"
            href="https://twitter.com/edutrack"
            aria-label="Twitter"
            sx={{ alignSelf: "center" }}
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            color="inherit"
            size="small"
            href="https://www.linkedin.com/company/edutrack"
            aria-label="LinkedIn"
            sx={{ alignSelf: "center" }}
          >
            <LinkedInIcon />
          </IconButton>
        </Stack>
      </Box>
    </Container>
  );
}
