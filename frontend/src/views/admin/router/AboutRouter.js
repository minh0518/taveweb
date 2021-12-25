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
import InfoIcon from '@mui/icons-material/Info';

import { Link } from 'react-router-dom';

const AboutRouter = () => {
    const [openAbout, setOpenAbout] = React.useState(false);

    const handleAboutListOpen = () => {
        setOpenAbout(!openAbout);
    };

    return (
        <Fragment>
            <List>
                <ListItemButton onClick={handleAboutListOpen}>
                    <ListItemIcon>
                        <InfoIcon />
                    </ListItemIcon>
                    <ListItemText primary="About" />
                    {openAbout ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openAbout} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton
                            component={Link}
                            to="about"
                            sx={{ pl: 4 }}
                        >
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="TAVE 소개" />
                        </ListItemButton>
                    </List>
                </Collapse>
                <Collapse in={openAbout} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton
                            component={Link}
                            to="about/history"
                            sx={{ pl: 4 }}
                        >
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="연혁" />
                        </ListItemButton>
                    </List>
                </Collapse>
                <Collapse in={openAbout} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton
                            component={Link}
                            to="about/manager"
                            sx={{ pl: 4 }}
                        >
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="운영진 소개" />
                        </ListItemButton>
                    </List>
                </Collapse>
            </List>
            <Divider />
        </Fragment>
    );
};

export default AboutRouter;
