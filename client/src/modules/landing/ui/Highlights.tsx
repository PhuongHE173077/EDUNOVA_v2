import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import { Grid2 } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const items = [
  {
    icon: <SettingsSuggestRoundedIcon />,
    title: 'Hiệu suất linh hoạt',
    description:
      'Trang web của chúng tôi dễ dàng điều chỉnh phù hợp với nhu cầu học tập đa dạng, giúp bạn học tập hiệu quả và tiết kiệm thời gian.',
  },
  {
    icon: <ConstructionRoundedIcon />,
    title: 'Nền tảng ổn định bền bỉ',
    description:
      'Trải nghiệm một hệ thống vận hành ổn định, đáng tin cậy, giúp bạn yên tâm sử dụng lâu dài mà không gặp gián đoạn.',
  },
  {
    icon: <ThumbUpAltRoundedIcon />,
    title: 'Trải nghiệm người dùng tuyệt vời',
    description:
      'Giao diện thân thiện, dễ dùng giúp bạn nhanh chóng làm quen và tận dụng tối đa các tính năng học tập trên trang.',
  },
  {
    icon: <AutoFixHighRoundedIcon />,
    title: 'Tính năng sáng tạo, tiên tiến',
    description:
      'Luôn cập nhật những công cụ và tính năng mới nhất, giúp bạn học tập và phát triển kỹ năng một cách hiệu quả và hiện đại.',
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: 'Hỗ trợ khách hàng tận tâm',
    description:
      'Đội ngũ hỗ trợ chuyên nghiệp, phản hồi nhanh chóng và luôn sẵn sàng giải đáp mọi thắc mắc của bạn trong quá trình sử dụng.',
  },
  {
    icon: <QueryStatsRoundedIcon />,
    title: 'Chú trọng chi tiết tỉ mỉ',
    description:
      'Mỗi tính năng đều được thiết kế cẩn thận, tạo nên trải nghiệm học tập trọn vẹn và chất lượng cho người dùng.',
  },
];


export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: 'grey.900',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4" gutterBottom>
            Hỗ Trợ
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
            Chúng tôi có nhưng sự hỗ trợ khách hàng 1 cách tối ưu nhất về mọi mặt
          </Typography>
        </Box>
        <Grid2 container spacing={2}>
          {items.map((item, index) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Stack
                direction="column"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  color: 'inherit',
                  p: 3,
                  height: '100%',
                  borderColor: 'hsla(220, 25%, 25%, 0.3)',
                  backgroundColor: 'grey.800',
                }}
              >
                <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                <div>
                  <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Box>
  );
}