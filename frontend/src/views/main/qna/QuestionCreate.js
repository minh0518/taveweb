import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

const QuestionCreate = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [password, setPassword] = useState('');

    const nextId = useRef(1);

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleChangeContent = (e) => {
        setContent(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            title: title,
            content: content,
            password: password,
        };

        axios
            .post(`/api/questions`, data, {
                body: {
                    'Content-Type': 'application/json',
                },
            })
            .then(function (response) {
                console.log(response, '성공');
                alert('작성 완료');
                navigate(`/qna`);
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} align={'right'}>
                <Button
                    variant="contained"
                    endIcon={<AddIcon />}
                    onClick={handleSubmit}
                >
                    저장
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Paper elevation={3} sx={{ minWidth: 275 }}>
                    <Grid item xs={12} align={'left'} sx={{ p: 1 }}>
                        <Typography
                            sx={{ fontSize: 16, mb: 2 }}
                            color="text.secondary"
                            gutterBottom
                        >
                            제목
                        </Typography>
                        <FormControl fullWidth>
                            <TextField
                                id="outlined-basic"
                                label="제목을 입력하세요."
                                variant="outlined"
                                value={title}
                                onChange={handleChangeTitle}
                            />
                        </FormControl>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper elevation={3} sx={{ minWidth: 275 }}>
                    <Grid item xs={12} align={'left'} sx={{ p: 1 }}>
                        <Typography
                            sx={{ fontSize: 16, mb: 2 }}
                            color="text.secondary"
                            gutterBottom
                        >
                            질문
                        </Typography>
                        <FormControl fullWidth>
                            <TextField
                                id="outlined-basic"
                                label="질문을 입력하세요."
                                variant="outlined"
                                multiline
                                rows={5}
                                value={content}
                                onChange={handleChangeContent}
                            />
                        </FormControl>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper elevation={3} sx={{ minWidth: 275 }}>
                    <Grid item xs={12} align={'left'} sx={{ p: 1 }}>
                        <Typography
                            sx={{ fontSize: 16, mb: 2 }}
                            color="text.secondary"
                            gutterBottom
                        >
                            비밀번호
                        </Typography>
                        <FormControl>
                            <input
                                type="password"
                                id="outlined-basic"
                                label="비밀번호를 입력하세요."
                                variant="outlined"
                                value={password}
                                onChange={handleChangePassword}
                            />
                        </FormControl>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default QuestionCreate;
