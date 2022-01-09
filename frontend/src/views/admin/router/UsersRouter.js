import React, { Fragment } from 'react';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import StarBorder from '@mui/icons-material/StarBorder';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

import { Link } from 'react-router-dom';

const UsersRouter = ({}) => {
    return (
        <Fragment>
            <List>
                <ListItemButton component={Link} to="users">
                    <ListItemIcon>
                        <ContentPasteIcon />
                    </ListItemIcon>
                    <ListItemText primary="Users" />
                </ListItemButton>
            </List>
            <Divider />
        </Fragment>
    );
};

export default UsersRouter;
