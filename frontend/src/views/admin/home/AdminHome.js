import React, { Fragment } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AdminHomeNotice from './AdminHomeNotice';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
// import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';

const HomeAdmin = () => {
    return (
        <Fragment>
            <p>어드민 첫 화면</p>

            {/* <Box sx={{ display: 'flex' }}>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <AdminHomeNotice />
                </Box>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <AdminHomeNotice />
                </Box>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <AdminHomeNotice />
                </Box>
            </Box> */}
            {/* <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}> */}
            <Grid container spacing={1}>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        <AdminHomeNotice />
                    </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        <AdminHomeNotice />
                    </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <AdminHomeNotice />
                    </Paper>
                </Grid>
            </Grid>
            {/* <Copyright sx={{ pt: 4 }} /> */}
            {/* </Container> */}
        </Fragment>
    );
};

export default HomeAdmin;
