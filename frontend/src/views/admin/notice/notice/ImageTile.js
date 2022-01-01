import React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ImageListItem from '@mui/material/ImageListItem';

export default function ImageTile({ url, description }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Paper elevation={3} sx={{ minWidth: 275, mb: 1 }}>
            <Grid container>
                <Grid item xs={11} align={'left'} sx={{ p: 1 }}>
                    <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                    >
                        이미지
                    </Typography>
                </Grid>
                <Grid item xs={1} align={'right'}>
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
                        <MenuItem onClick={handleClose}>수정</MenuItem>
                        <MenuItem onClick={handleClose}>삭제</MenuItem>
                    </Menu>
                </Grid>
                <Grid item xs={12} sx={{ p: 1 }}>
                    <ImageListItem>
                        <img src={`${url}`} alt={description} loading="lazy" />
                    </ImageListItem>
                </Grid>
                <br />
                <Grid item xs={12} align={'left'} sx={{ p: 1 }}>
                    <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                    >
                        이미지 설명
                    </Typography>
                    <Typography variant="body1" component="div">
                        {description}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
}
