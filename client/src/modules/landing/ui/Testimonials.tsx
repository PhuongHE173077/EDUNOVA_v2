'use client';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/system';
import { Grid2 } from '@mui/material';

const userTestimonials = [
    {
        avatar: <Avatar alt="Nguyễn Văn An" src="https://randomuser.me/api/portraits/men/32.jpg" />,
        name: 'Nguyễn Văn An',
        occupation: 'Kỹ sư cao cấp',
        testimonial:
            "Tôi rất ấn tượng với tính linh hoạt của trang web này! Dù học tập hay nghiên cứu, nó luôn đáp ứng nhu cầu đa dạng của tôi. Giao diện thân thiện giúp tôi tiếp thu kiến thức hiệu quả và thú vị hơn mỗi ngày.",
    },
    {
        avatar: <Avatar alt="Trần Thị Bình" src="https://randomuser.me/api/portraits/women/44.jpg" />,
        name: 'Trần Thị Bình',
        occupation: 'Trưởng nhóm thiết kế sản phẩm',
        testimonial:
            "Điểm nổi bật nhất của trang web này chính là dịch vụ hỗ trợ khách hàng tuyệt vời. Tôi luôn nhận được phản hồi nhanh chóng và sự giúp đỡ tận tình từ đội ngũ phát triển. Điều này tạo sự yên tâm khi sử dụng nền tảng.",
    },
    {
        avatar: <Avatar alt="Lê Minh Đức" src="https://randomuser.me/api/portraits/men/76.jpg" />,
        name: 'Lê Minh Đức',
        occupation: 'Giám đốc công nghệ',
        testimonial:
            "Mức độ đơn giản và dễ sử dụng của trang web đã giúp tôi học tập hiệu quả hơn rất nhiều. Tôi đánh giá cao đội ngũ sáng tạo đã xây dựng một giải pháp không chỉ đáp ứng mà còn vượt qua kỳ vọng của người dùng.",
    },
    {
        avatar: <Avatar alt="Phạm Thị Hương" src="https://randomuser.me/api/portraits/women/65.jpg" />,
        name: 'Phạm Thị Hương',
        occupation: 'Kỹ sư cao cấp',
        testimonial:
            "Tôi rất trân trọng sự chú ý đến từng chi tiết trong thiết kế của trang web. Những điểm nhỏ nhưng tinh tế đã tạo ra trải nghiệm học tập cao cấp và chuyên nghiệp.",
    },
    {
        avatar: <Avatar alt="Đặng Hoàng Nam" src="https://randomuser.me/api/portraits/men/12.jpg" />,
        name: 'Đặng Hoàng Nam',
        occupation: 'Nhà thiết kế sản phẩm',
        testimonial:
            "Tôi đã từng thử nhiều trang web giáo dục khác, nhưng đây là nền tảng nổi bật nhờ các tính năng đổi mới. Rõ ràng đội ngũ phát triển đã dành nhiều tâm huyết để đáp ứng đúng nhu cầu của người học.",
    },
    {
        avatar: <Avatar alt="Vũ Thị Lan" src="https://randomuser.me/api/portraits/women/53.jpg" />,
        name: 'Vũ Thị Lan',
        occupation: 'Giám đốc phát triển',
        testimonial:
            "Chất lượng của trang web vượt xa mong đợi của tôi. Giao diện đẹp, nội dung chất lượng và vận hành mượt mà. Đây thực sự là một đầu tư xứng đáng cho việc học tập và phát triển bản thân!",
    },
];


const whiteLogos = [
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628e8573c43893fe0ace_Sydney-white.svg',
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d520d0517ae8e8ddf13_Bern-white.svg',
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f46794c159024c1af6d44_Montreal-white.svg',
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e891fa22f89efd7477a_TerraLight.svg',
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a09d1f6337b1dfed14ab_colorado-white.svg',
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5caa77bf7d69fb78792e_Ankara-white.svg',
];

const darkLogos = [
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628889c3bdf1129952dc_Sydney-black.svg',
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d4d8b829a89976a419c_Bern-black.svg',
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f467502f091ccb929529d_Montreal-black.svg',
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e911fa22f2203d7514c_TerraDark.svg',
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a0990f3717787fd49245_colorado-black.svg',
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5ca4e548b0deb1041c33_Ankara-black.svg',
];

const logoStyle = {
    width: '64px',
    opacity: 0.3,
};

export default function Testimonials() {
    const theme = useTheme();
    const logos = theme.palette.mode === 'light' ? darkLogos : whiteLogos;

    return (
        <Container
            id="testimonials"
            sx={{
                pt: { xs: 4, sm: 12 },
                pb: { xs: 8, sm: 16 },
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
                <Typography
                    component="h2"
                    variant="h4"
                    gutterBottom
                    sx={{ color: 'text.primary' }}
                >
                    Đánh Giá về Chúng Tôi
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Xem khách hàng của chúng tôi yêu thích điều gì ở sản phẩm của chúng tôi. Khám phá cách chúng tôi vượt trội về
                    hiệu quả, độ bền và sự hài lòng. Tham gia cùng chúng tôi để có chất lượng, sự đổi mới,
                    và hỗ trợ đáng tin cậy.
                </Typography>
            </Box>
            <Grid2 container spacing={2}>
                {userTestimonials.map((testimonial, index) => (
                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index} sx={{ display: 'flex' }}>
                        <Card
                            variant="outlined"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                flexGrow: 1,
                            }}
                        >
                            <CardContent>
                                <Typography
                                    variant="body1"
                                    gutterBottom
                                    sx={{ color: 'text.secondary' }}
                                >
                                    {testimonial.testimonial}
                                </Typography>
                            </CardContent>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <CardHeader
                                    avatar={testimonial.avatar}
                                    title={testimonial.name}
                                    subheader={testimonial.occupation}
                                />
                                {/* <img
                                    src={logos[index]}
                                    alt={`Logo ${index + 1}`}
                                    style={logoStyle}
                                /> */}
                            </Box>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
        </Container>
    );
}