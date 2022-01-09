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

const AdminUsersCreate = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');

    const nextId = useRef(1);

    const handleChangeName = (e) => {
        setName(e.target.value);
    };

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleChangeRepassword = (e) => {
        setRepassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: name,
            email: email,
            password: password,
        };

        if (password !== repassword) {
            alert('비밀번호가 일치하지 않습니다.');
            e.preventDefault();
        } else {
            axios
                .post(`/api/users`, data, {
                    body: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(function (response) {
                    console.log(response, '성공');
                    alert('작성 완료');
                    navigate(`/admin/users`);
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
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
                            이름
                        </Typography>
                        <FormControl fullWidth>
                            <TextField
                                id="outlined-basic"
                                label="이름을 입력하세요."
                                variant="outlined"
                                value={name}
                                onChange={handleChangeName}
                                required
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
                            이메일
                        </Typography>
                        <FormControl fullWidth>
                            <TextField
                                id="outlined-basic"
                                label="이메일을 입력하세요."
                                variant="outlined"
                                type="email"
                                multiline
                                rows={5}
                                value={email}
                                onChange={handleChangeEmail}
                                required
                            />
                        </FormControl>
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
                                <FormControl fullWidth>
                                    <TextField
                                        id="outlined-basic"
                                        label="비밀번호를 입력하세요."
                                        variant="outlined"
                                        type="password"
                                        value={password}
                                        onChange={handleChangePassword}
                                        required
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} align={'left'} sx={{ p: 1 }}>
                                <Typography
                                    sx={{ fontSize: 16, mb: 2 }}
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    비밀번호 확인
                                </Typography>
                                <FormControl fullWidth>
                                    <TextField
                                        id="outlined-basic"
                                        label="비밀번호를 한 번 더 입력하세요."
                                        variant="outlined"
                                        type="password"
                                        required
                                        value={repassword}
                                        onChange={handleChangeRepassword}
                                    />
                                </FormControl>
                            </Grid>
                        </Paper>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default AdminUsersCreate;
