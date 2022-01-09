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

const AdminLogin = () => {
    const [email, setEmail] = useState({});
    const [password, setPassword] = useState({});

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const handleSubmit = async (e) => {
        const master = await axios.get(`/api/users/login`).then((response) => {
            console.log('response', response);
            console.log('response', response.data);
        });
    };
    return (
        <Grid>
            <Grid item xs={12}>
                <Grid item xs={12} align={'center'} sx={{ p: 1 }}>
                    <Typography
                        sx={{ fontSize: 16, mb: 2 }}
                        color="text.secondary"
                        gutterBottom
                    >
                        이메일
                    </Typography>
                    <FormControl>
                        <TextField
                            id="outlined-basic"
                            label="이메일을 입력하세요."
                            variant="outlined"
                            type="email"
                            rows={5}
                            //value={email}
                            onChange={handleChangeEmail}
                            required
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Grid item xs={12} align={'center'} sx={{ p: 1 }}>
                        <Typography
                            sx={{ fontSize: 16, mb: 2 }}
                            color="text.secondary"
                            gutterBottom
                        >
                            비밀번호
                        </Typography>
                        <FormControl>
                            <TextField
                                id="outlined-basic"
                                label="비밀번호를 입력하세요."
                                variant="outlined"
                                type="password"
                                //value={password}
                                onChange={handleChangePassword}
                                required
                            />
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid item xs={12} align={'center'}>
                    <Button
                        variant="contained"
                        endIcon={<AddIcon />}
                        onClick={handleSubmit}
                    >
                        로그인
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default AdminLogin;
