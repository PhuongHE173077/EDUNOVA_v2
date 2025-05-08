'use client';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';
import Discussion from './Dicussion';
import FeedBack from './FeedBack';

export const NavTabsLesson = ({ setIsLoading }: any) => {
    const [value, setValue] = useState<string>('one');
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setLoading(true);
        setValue(newValue);

        setTimeout(() => {
            setLoading(false);
        }, 500);
    };
    return (
        <Box sx={{ width: '100%' }}>
            <Tabs style={{ margin: '20px' }}
                textColor="secondary"
                indicatorColor="secondary"
                value={value}
                onChange={handleChange}
                aria-label="secondary tabs example"
            >
                <Tab value="one" label={'Discussion'} />
                <Tab value="two" label={'Feedback'} />
            </Tabs>

            {loading && <LinearProgress color="secondary" />}

            {!loading && (
                <Box sx={{ marginTop: '20px' }}>
                    {value === 'one' && (
                        <Discussion setIsLoading={setIsLoading} />
                    )}
                    {value == 'two' && (
                        <FeedBack />
                    )}
                </Box>
            )}
        </Box>
    )
}
