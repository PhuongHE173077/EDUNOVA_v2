import { answerLesson } from '@/types';
import { Avatar, Box, Button, Paper, Rating, Typography, useColorScheme } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MDEditor from '@uiw/react-md-editor';
import dayjs from 'dayjs';
import { EllipsisIcon } from 'lucide-react';
import React, { useState } from 'react';
import remarkBreaks from 'remark-breaks';
export const Comment = ({ answer }: { answer: answerLesson }) => {
  const mode = useColorScheme();
  const [replying, setReplying] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Paper elevation={5} sx={{ padding: 2, marginBottom: 2, width: '100%', maxWidth: '860px' }}>
      <Box >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <Avatar sx={{ marginRight: 2, width: 40, height: 40 }}>{(answer.user?.displayName || 'U').charAt(0).toUpperCase()}</Avatar>
            <div>
              <Typography variant="h6">{answer.user?.displayName}</Typography>
              <Typography variant="body2" color="text.secondary">{dayjs(answer.answerAt).format('dddd, MMMM D, YYYY h:mm A')}</Typography>
            </div>

          </Box>
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <EllipsisIcon color='gray' />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>Edit</MenuItem>
              <MenuItem onClick={handleClose}>Delete</MenuItem>
            </Menu>
          </div>
        </Box>


        <Box flexGrow={1} sx={{ ml: 2 }}>

          <Typography
            variant="body2"
            component="div"
            color="text.secondary"
          >
            <Box sx={{ mt: 2 }} data-color-mode={mode}>
              <MDEditor.Markdown source={answer.answer || ''}
                style={{
                  backgroundColor: '#dfe6e9',
                  color: 'black',
                  padding: '10px',
                  borderRadius: '10px'

                }}
                remarkPlugins={[remarkBreaks]}
              />
            </Box>
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
        <Rating
          name="read-only"
          value={answer.star}
          readOnly
        />

      </Box>

      <Box>

      </Box>


      <Box sx={{ marginTop: 2 }}>
        <Button variant="outlined" size="small" >
          {replying ? 'Cancle' : 'Reply'}
        </Button>
      </Box>




    </Paper>
  )
}
