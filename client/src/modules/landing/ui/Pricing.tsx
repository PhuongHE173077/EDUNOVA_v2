'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { Grid2 } from '@mui/material';
import InfoDialog from '@/components/dialog/InfoDialog';

const tiers = [
    {
        title: '6 tháng',
        price: '7,999',
        description: [
            'Tạo & quản lý lớp học dễ dàng',
            'Giao bài tập – chấm điểm tự động',
            'Theo dõi tiến độ học tập',
            'Tích hợp học trực tuyến',
            'Tương tác nhanh chóng – tiện lợi',
            'Giao diện thân thiện, hỗ trợ tiếng Việt',
            'Thông báo điểm danh tự động đến phụ huynh',
        ],
        buttonText: 'Đăng Ký Ngay',
        buttonVariant: 'outlined',
        buttonColor: 'primary',
    },
    {
        title: '12 tháng',
        subheader: 'Recommended',
        price: '14,999',
        description: [
            'Tạo & quản lý lớp học dễ dàng',
            'Giao bài tập – chấm điểm tự động',
            'Theo dõi tiến độ học tập',
            'Đồng bộ lịch học',
            'Tích hợp học trực tuyến',
            'Tương tác nhanh chóng – tiện lợi',
            'Giao diện thân thiện, hỗ trợ tiếng Việt',
            'Thông báo điểm danh tự động đến phụ huynh',
        ],
        buttonText: 'Đăng Ký Ngay',
        buttonVariant: 'contained',
        buttonColor: 'secondary',
    },
    {
        title: 'Nâng cao',
        price: 'Tùy chỉnh theo khách hàng',
        description: [
            'Tạo & quản lý lớp học dễ dàng',
            'Giao bài tập – chấm điểm tự động',
            'Theo dõi tiến độ học tập',
            'Tích hợp học trực tuyến',
            'Tương tác nhanh chóng – tiện lợi',
            'Giao diện thân thiện, hỗ trợ tiếng Việt',
            'Thông báo điểm danh tự động đến phụ huynh',
        ],
        buttonText: 'Đăng Ký Ngay',
        buttonVariant: 'outlined',
        buttonColor: 'primary',
    },
];

export default function Pricing() {
    const [open, setOpen] = React.useState(false);
    return (
        <>
            <Container
                id="pricing"
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
                        Bảng giá
                        Dịch vụ
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        Nhanh chóng xây dựng bảng giá hiệu quả cho khách hàng tiềm năng của bạn bằng
                        bố cục này. <br />
                        It&apos;s built with default Material UI components with little
                        customization.
                    </Typography>
                </Box>
                <Grid2
                    container
                    spacing={3}
                    sx={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}
                >
                    {tiers.map((tier) => (
                        <Grid2
                            size={{ xs: 12, sm: tier.title === 'Enterprise' ? 12 : 6, md: 4 }}
                            key={tier.title}
                        >
                            <Card
                                sx={[
                                    {
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 4,
                                    },
                                    tier.title === 'Professional' &&
                                    ((theme) => ({
                                        border: 'none',
                                        background:
                                            'radial-gradient(circle at 50% 0%, hsl(220, 20%, 35%), hsl(220, 30%, 6%))',
                                        boxShadow: `0 8px 12px hsla(220, 20%, 42%, 0.2)`,
                                        ...theme.applyStyles('dark', {
                                            background:
                                                'radial-gradient(circle at 50% 0%, hsl(220, 20%, 20%), hsl(220, 30%, 16%))',
                                            boxShadow: `0 8px 12px hsla(0, 0%, 0%, 0.8)`,
                                        }),
                                    })),
                                ]}
                            >
                                <CardContent>
                                    <Box
                                        sx={[
                                            {
                                                mb: 1,
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                gap: 2,
                                            },
                                            tier.title === 'Professional'
                                                ? { color: 'grey.100' }
                                                : { color: '' },
                                        ]}
                                    >
                                        <Typography component="h3" variant="h6">
                                            {tier.title}
                                        </Typography>
                                        {tier.title === '12 tháng' && (
                                            <Chip icon={<AutoAwesomeIcon />} label={tier.subheader} />
                                        )}
                                    </Box>
                                    <Box
                                        sx={[
                                            {
                                                display: 'flex',
                                                alignItems: 'baseline',
                                            },
                                            tier.title === 'Professional'
                                                ? { color: 'grey.50' }
                                                : { color: null },
                                        ]}
                                    >
                                        {tier.title !== 'Nâng cao' ? <><Typography component="h3" variant="h2" >
                                            {tier.price}
                                        </Typography>
                                            <Typography component="h3" variant="h6">
                                                &nbsp; K VND
                                            </Typography></> :
                                            <>
                                                <Typography component="h5" variant="h5" >
                                                    {tier.price}
                                                </Typography>

                                            </>
                                        }
                                    </Box>
                                    <Divider sx={{ my: 2, opacity: 0.8, borderColor: 'divider' }} />
                                    {tier.description.map((line) => (
                                        <Box
                                            key={line}
                                            sx={{ py: 1, display: 'flex', gap: 1.5, alignItems: 'center' }}
                                        >
                                            <CheckCircleRoundedIcon
                                                sx={[
                                                    {
                                                        width: 20,
                                                    },
                                                    tier.title === 'Professional'
                                                        ? { color: 'primary.light' }
                                                        : { color: 'primary.main' },
                                                ]}
                                            />
                                            <Typography
                                                variant="subtitle2"
                                                component={'span'}
                                                sx={[
                                                    tier.title === 'Professional'
                                                        ? { color: 'grey.50' }
                                                        : { color: null },
                                                ]}
                                            >
                                                {line}
                                            </Typography>
                                        </Box>
                                    ))}
                                </CardContent>
                                <CardActions>
                                    <Button
                                        fullWidth
                                        variant={tier.buttonVariant as 'outlined' | 'contained'}
                                        color={tier.buttonColor as 'primary' | 'secondary'}
                                        onClick={() => setOpen(true)}
                                    >
                                        {tier.buttonText}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid2>
                    ))}
                </Grid2>
            </Container>
            <InfoDialog open={open} setOpen={setOpen} />
        </>
    );
}