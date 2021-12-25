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
import NewspaperIcon from '@mui/icons-material/Newspaper';

import { Link } from 'react-router-dom';

const NoticeRouter = ({ toggleDrawer }) => {
    const [openNotice, setOpenNotice] = React.useState(false);

    const handleNoticeListOpen = () => {
        setOpenNotice(!openNotice);
    };

    return (
        <Fragment>
            <List>
                <ListItemButton onClick={handleNoticeListOpen}>
                    <ListItemIcon>
                        <NewspaperIcon />
                    </ListItemIcon>
                    <ListItemText primary="Notice" />
                    {openNotice ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openNotice} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton
                            component={Link}
                            to="notice"
                            sx={{ pl: 4 }}
                            onClick={toggleDrawer(false)}
                            onKeyDown={toggleDrawer(false)}
                        >
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="공지사항" />
                        </ListItemButton>
                    </List>
                </Collapse>
                <Collapse in={openNotice} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton
                            component={Link}
                            to="news"
                            sx={{ pl: 4 }}
                            onClick={toggleDrawer(false)}
                            onKeyDown={toggleDrawer(false)}
                        >
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="테이비 뉴스" />
                        </ListItemButton>
                    </List>
                </Collapse>
            </List>
            <Divider />
        </Fragment>
    );
};

export default NoticeRouter;
