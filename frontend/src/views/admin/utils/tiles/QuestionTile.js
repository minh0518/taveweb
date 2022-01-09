import React, { useState } from 'react';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

export default function QuestionTile({ question, handleQuestion }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const [edit, setEdit] = useState(false);

    const [newQuestion, setNewQuestion] = useState(question);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleToggleEdit = () => {
        setAnchorEl(null);

        setEdit(!edit);
    };

    const handleChange = (e) => {
        setNewQuestion(e.target.value);
    };

    const handleSubmit = () => {
        setEdit(!edit);

        handleQuestion(newQuestion);
    };

    const handleCancel = () => {
        setEdit(!edit);
    };

    return (
        <Paper elevation={3} sx={{ minWidth: 275, mb: 1 }}>
            <Grid container>
                <Grid item xs={10} align={'left'} sx={{ p: 1 }}>
                    <Typography
                        sx={{ fontSize: 14, pb: 1 }}
                        color="text.secondary"
                        gutterBottom
                    >
                        질문
                    </Typography>
                    {edit ? (
                        <>
                            <Grid item xs={12} sx={{ mb: 1 }}>
                                <FormControl fullWidth>
                                    <TextField
                                        label="수정할 질문을 입력하세요."
                                        multiline
                                        rows={4}
                                        defaultValue={question}
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
                                    onClick={handleCancel}
                                >
                                    취소
                                </Button>
                            </Grid>
                        </>
                    ) : (
                        <Typography variant="h6" component="div">
                            {question}
                        </Typography>
                    )}
                </Grid>
                <Grid item xs={2} align={'right'}>
                    {edit ? (
                        <></>
                    ) : (
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
                    )}
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleToggleEdit}>수정</MenuItem>
                    </Menu>
                </Grid>
            </Grid>
        </Paper>
    );
}
