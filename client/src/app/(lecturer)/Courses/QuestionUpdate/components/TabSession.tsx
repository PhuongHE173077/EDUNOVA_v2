import { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import ListStudent from './List';
import ContentSes from './ContentSes';

function TabSession() {
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
    <Box sx={{ width: '100%', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)', marginTop: "2rem", backgroundColor: '#fff' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Tab navigation"
        textColor="secondary"
        indicatorColor="secondary"
        sx={{
          backgroundColor: '#f5f5f5',
          borderBottom: '1px solid #ddd',
          padding: '10px 20px',
          '& .MuiTab-root': {
            fontWeight: '600',
            textTransform: 'none',
          },
          '& .Mui-selected': {
            color: 'secondary.main',
          },
        }}
      >
        <Tab value="one" label={'Content'} />
        <Tab value="two" label={'Students'} />
      </Tabs>

      {/* Loading State */}
      {loading && (
        <Box sx={{ padding: '10px 20px' }}>
          <LinearProgress color="secondary" />
        </Box>
      )}

      {/* Content Area */}
      {!loading && (
        <Box sx={{ padding: '20px' }}>
          {/* Content Session */}
          {value === 'one' && (
            <Box sx={{ backgroundColor: '#fafafa', borderRadius: '8px', padding: '20px' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px', color: 'secondary.main' }}>Content Session</Typography>
              <ContentSes />
            </Box>
          )}

          {/* Students List */}
          {value === 'two' && (
            <Box sx={{ backgroundColor: '#fafafa', borderRadius: '8px', padding: '20px' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px', color: 'secondary.main' }}>Students</Typography>
              <ListStudent />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default TabSession;
