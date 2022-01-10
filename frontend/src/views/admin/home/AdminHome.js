import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

import AdminHomeNotice from './AdminHomeNotice';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
    Link,
    createSearchParams,
    useSearchParams,
    useNavigate,
} from 'react-router-dom';

const HomeAdmin = () => {
    const [password, setPassword] = useState({});
    const navigate = useNavigate();

    const AdminCheck = (e) => {
        const password = 'tave123';
        const pw_check = prompt('비밀번호를 입력하세요');
        if (pw_check != password) {
            if (pw_check == null) {
                //navigate('/');

                return false;
            } else {
                alert('비밀번호가 틀렸습니다.');
                //navigate('/');

                return false;
            }
        } else {
            return true;
            //navigate('/admin');
        }
    };
    useEffect(() => {
        if (AdminCheck() == true) {
            navigate('/admin');
        } else {
            navigate('/');
        }
    }, []);

    return (
        <Fragment>
            {/* <p>어드민 첫 화면</p> */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={6}>
                    <AdminHomeNotice />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <AdminHomeNotice />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <AdminHomeNotice />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <AdminHomeNotice />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <AdminHomeNotice />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <AdminHomeNotice />
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default HomeAdmin;
