'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import visuallyHidden from '@mui/utils/visuallyHidden';
import { styled } from '@mui/material/styles';


const Card = styled(Box)(() => ({
  width: "300px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  position: "relative",
  backgroundColor: "#fff",
  marginRight: "16px",
  marginBottom: "16px",
  cursor: "pointer",
  flexShrink: 0,
  textAlign: "center",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "scale(1.03)",
    boxShadow: "0 4px 20px rgba(173, 216, 230, 0.9)",
  },
}));

interface HeroProps {
  scrollToFooter: () => void;
}

const CardImage = styled(Box)({
  height: "180px",
  backgroundSize: "cover",
  backgroundPosition: "center",
});

const CarouselWrapper = styled(Box)({
  width: "100%",
  overflow: "hidden",
  position: "relative",
});

const Carousel = styled(Box)({
  display: "flex",
  transition: "transform 0.5s ease-in-out",
});


const courses = [
  {
    id: 1,
    title: "Theo dõi quá trình ",
    description:
      "Bảng thông tin được cá nhân hóa để theo dõi tiến độ học tập.",
    image:
      "https://www.shutterstock.com/image-photo/business-concept-attached-board-announcement-260nw-2160920239.jpg",
  },
  {
    id: 2,
    title: "Lên kế hoạch cho việc học của bạn",
    description: "Kế hoạch học tập hiệu quả phù hợp với mục tiêu của bạn.",
    image:
      "https://www.shutterstock.com/image-photo/steps-education-leading-success-goal-600nw-2309134389.jpg",
  },
  {
    id: 3,
    title: "Hỗ Trợ kiểm tra",
    description: "Truy cập các công cụ và tài nguyên để chuẩn bị cho kỳ thi.",
    image:
      "https://www.shutterstock.com/image-vector/exam-preparation-school-test-vector-260nw-1956280858.jpg",
  },
  {
    id: 4,
    title: "Hợp tác với đồng nghiệp",
    description: "Tham gia nhóm học tập và chia sẻ kiến ​​thức với bạn cùng lớp.",
    image:
      "https://www.shutterstock.com/image-photo/group-young-people-thinking-together-260nw-1185545020.jpg",
  }

];

export default function Hero() {

  const [currentIndex, setCurrentIndex] = React.useState(0);

  const extendedCards = [...courses, ...courses];
  const sentences = [
    "Welcome to EduTrack 🎉",
    "Manage Your Learning",
    "Ace Your Exams!",
    "Stay Organized",
    "Monitor Progress",
    "Achieve Goals",
  ];
  const [displayedText, setDisplayedText] = React.useState("");
  const [sentenceIndex, setSentenceIndex] = React.useState(0);

  const cardWidth = 316;

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex >= courses.length) {
          return 0;
        }
        return prevIndex + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    let index = 0;
    const fullText = sentences[sentenceIndex];
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setSentenceIndex((prevIndex) => (prevIndex + 1) % sentences.length);
        }, 1000);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, [sentenceIndex]);

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundRepeat: 'no-repeat',

        backgroundImage:
          'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)',
        ...theme.applyStyles('dark', {
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)',
        }),
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' } }}
        >
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              fontSize: 'clamp(3rem, 10vw, 3.5rem)',
            }}
          >
            EDUCATION&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={(theme) => ({
                fontSize: 'inherit',
                color: 'primary.main',
                ...theme.applyStyles('dark', {
                  color: 'primary.light',
                }),
              })}
            >
              Novation
            </Typography>
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              width: { sm: '100%', md: '80%' },
            }}
          >
            Trang web giáo dục hỗ trợ học sinh và giáo viên, cung cấp các giải pháp chất lượng cao
            . Nâng cao trải nghiệm của bạn với các tính năng và dịch vụ hàng đầu.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: '350px' } }}
          >
            <InputLabel htmlFor="email-hero" sx={visuallyHidden}>
              Email
            </InputLabel>
            <TextField
              id="email-hero"
              hiddenLabel
              size="small"
              variant="outlined"
              aria-label="Enter your email address"
              placeholder="Nhập địa chỉ mail"
              fullWidth
              slotProps={{
                htmlInput: {
                  autoComplete: 'off',
                  'aria-label': 'Enter your email address',
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ minWidth: 'fit-content' }}
            >
              Bắt đầu
            </Button>
          </Stack>

        </Stack>


        <CarouselWrapper sx={{ marginTop: "1.5rem" }}>
          <Carousel
            sx={{
              width: `${extendedCards.length * cardWidth}px`,
              transform: `translateX(-${currentIndex * cardWidth}px)`,
              transition: "transform 0.5s ease-in-out",
            }}
          >
            {extendedCards.map((card, index) => (
              <Card key={index}>
                <CardImage
                  sx={{
                    backgroundImage: `url(${card.image})`,
                  }}
                />
                <Box sx={{ padding: "16px" }}>
                  <Typography variant="h6">{card.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.description}
                  </Typography>
                </Box>
              </Card>
            ))}
          </Carousel>
        </CarouselWrapper>
      </Container>
    </Box>
  );
}