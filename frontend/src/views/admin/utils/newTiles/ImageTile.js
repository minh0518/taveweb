import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ImageListItem from '@mui/material/ImageListItem';

export default function ImageTile({
    id,
    url,
    description,
    onUpdateImage,
    onRemoveImage,
}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const [edit, setEdit] = useState(false);
    const [image, setImage] = useState(null);
    const [thumbnail, setThumbnail] = useState('');
    const [newDescription, setNewDescription] = useState(description);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleRemove = () => {
        setAnchorEl(null);
        setEdit(!edit);
        onRemoveImage(id);
    };

    const handleToggleEdit = () => {
        setAnchorEl(null);

        setEdit(!edit);
    };

    const handleChange = (e) => {
        // console.log(e.target.value);
        setNewDescription(e.target.value);
    };

    const handleSubmit = () => {
        setEdit(!edit);

        onUpdateImage(id, image, newDescription);
    };

    const handleCancel = () => {
        setEdit(!edit);
    };

    const handleChangeImage = (e) => {
        const { files } = e.target;

        setImage(files[0]);
        setThumbnail(URL.createObjectURL(files[0]));
    };

    const handleDeleteThumbnail = () => {
        setEdit(!edit);
        URL.revokeObjectURL(thumbnail);
        setThumbnail('');
        setImage(null);
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
                    {edit ? (
                        <></>
                    ) : (
                        <>
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
                                <MenuItem onClick={handleToggleEdit}>
                                    수정
                                </MenuItem>
                                <MenuItem onClick={handleRemove}>삭제</MenuItem>
                            </Menu>
                        </>
                    )}
                </Grid>

                <Grid item xs={12} sx={{ p: 1 }}>
                    {image ? (
                        <ImageListItem>
                            <img
                                src={thumbnail}
                                alt={thumbnail}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ) : (
                        <ImageListItem>
                            <img
                                src={`${url}`}
                                alt={description}
                                loading="lazy"
                            />
                        </ImageListItem>
                    )}
                    {edit ? (
                        <Grid item xs={12} align={'left'} sx={{ p: 1 }}>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleChangeImage}
                            />
                        </Grid>
                    ) : (
                        <></>
                    )}
                </Grid>
                <br />
                <Grid item xs={12} align={'left'} sx={{ p: 1 }}>
                    <Typography
                        sx={{ fontSize: 14, pb: 1 }}
                        color="text.secondary"
                        gutterBottom
                    >
                        이미지 설명
                    </Typography>
                    {edit ? (
                        <>
                            <Grid item xs={12} sx={{ mb: 1 }}>
                                <FormControl fullWidth>
                                    <TextField
                                        label="수정할 제목을 입력하세요."
                                        multiline
                                        rows={4}
                                        defaultValue={description}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sx={{ mb: 1 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ mr: 1 }}
                                    onClick={handleSubmit}
                                >
                                    저장
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={handleDeleteThumbnail}
                                >
                                    취소
                                </Button>
                            </Grid>
                        </>
                    ) : (
                        <Typography variant="body1" component="div">
                            {description}
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </Paper>
    );
}
