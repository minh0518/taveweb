import React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export default function AnswerTile({ answer }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    //const [answer, setAnswer] = useState({});
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (e) => {
        setAnchorEl(null);
        //answer = e.currentTarget.value;
    };

    return (
        <Paper elevation={3} sx={{ minWidth: 275, mb: 1 }}>
            <Grid container>
                <Grid item xs={10} align={'left'} sx={{ p: 1 }}>
                    <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                    >
                        답변
                    </Typography>
                    <Typography variant="body1" component="div">
                        {answer?.map((value) => (
                            <div>{value.content}</div>
                        ))}
                    </Typography>
                </Grid>
                <Grid item xs={2} align={'right'}>
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls="long-menu"
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>작성 및 수정</MenuItem>
                    </Menu>
                </Grid>
            </Grid>
        </Paper>
    );
}
