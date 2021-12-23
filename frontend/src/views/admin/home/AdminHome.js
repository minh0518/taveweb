import React, { Fragment } from 'react';

import AdminHomeNotice from './AdminHomeNotice';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const HomeAdmin = () => {
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
