import React, { Fragment, useState } from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import HomeRouter from './router/HomeRouter';
import AboutRouter from './router/AboutRouter';
import NoticeRouter from './router/NoticeRouter';
import ActivityRouter from './router/ActivityRouter';
import QnARouter from './router/QnARouter';
import ApplyRouter from './router/ApplyRouter';

import { Outlet } from 'react-router-dom';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

export default function AdminDrawer() {
    const [state, setState] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        console.log(state);

        setState(open);
    };

    const RouterList = () => {
        return (
            <Fragment>
                <HomeRouter toggleDrawer={toggleDrawer} />
                <AboutRouter toggleDrawer={toggleDrawer} />
                <NoticeRouter toggleDrawer={toggleDrawer} />
                <ActivityRouter toggleDrawer={toggleDrawer} />
                <QnARouter toggleDrawer={toggleDrawer} />
                <ApplyRouter toggleDrawer={toggleDrawer} />
            </Fragment>
        );
    };

    const CustomDrawer = () => {
        return (
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                    display: { xs: 'none', md: 'block' },
                }}
            >
                <Toolbar />
                <RouterList />
            </Drawer>
        );
    };

    const AppBarDrawer = () => {
        return (
            <Drawer anchor="top" open={state} onClose={toggleDrawer(false)}>
                <Toolbar />
                <RouterList />
            </Drawer>
        );
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBarDrawer />
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}
                        onClick={toggleDrawer(!state)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Tave Admin
                    </Typography>
                </Toolbar>
            </AppBar>
            <CustomDrawer />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Outlet />
            </Box>
        </Box>
    );
}
