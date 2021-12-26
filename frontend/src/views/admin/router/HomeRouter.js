import React, { Fragment } from 'react';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';

import { Link } from 'react-router-dom';

const HomeRouter = ({ toggleDrawer }) => {
    return (
        <Fragment>
            <List>
                <Link
                    to=""
                    style={{
                        color: 'inherit',
                        textDecoration: 'inherit',
                    }}
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <ListItem button>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                </Link>
            </List>
            <Divider />
        </Fragment>
    );
};

export default HomeRouter;
