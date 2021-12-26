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
import DescriptionIcon from '@mui/icons-material/Description';

import { Link } from 'react-router-dom';

const ApplyRouter = ({ toggleDrawer }) => {
    const [openApply, setOpenApply] = React.useState(false);

    const handleApplyListOpen = () => {
        setOpenApply(!openApply);
    };

    return (
        <Fragment>
            <List>
                <ListItemButton onClick={handleApplyListOpen}>
                    <ListItemIcon>
                        <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText primary="Apply" />
                    {openApply ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openApply} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton
                            component={Link}
                            to="apply"
                            sx={{ pl: 4 }}
                            onClick={toggleDrawer(false)}
                            onKeyDown={toggleDrawer(false)}
                        >
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="신청 페이지" />
                        </ListItemButton>
                    </List>
                </Collapse>
                <Collapse in={openApply} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton
                            component={Link}
                            to="apply/form"
                            sx={{ pl: 4 }}
                            onClick={toggleDrawer(false)}
                            onKeyDown={toggleDrawer(false)}
                        >
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="신청서" />
                        </ListItemButton>
                    </List>
                </Collapse>
                <Collapse in={openApply} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton
                            component={Link}
                            to="apply/check"
                            sx={{ pl: 4 }}
                            onClick={toggleDrawer(false)}
                            onKeyDown={toggleDrawer(false)}
                        >
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="지원 확인" />
                        </ListItemButton>
                    </List>
                </Collapse>
                <Collapse in={openApply} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton
                            component={Link}
                            to="apply/result"
                            sx={{ pl: 4 }}
                            onClick={toggleDrawer(false)}
                            onKeyDown={toggleDrawer(false)}
                        >
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="지원 결과" />
                        </ListItemButton>
                    </List>
                </Collapse>
            </List>
            <Divider />
        </Fragment>
    );
};

export default ApplyRouter;
