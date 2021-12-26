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
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

import { Link } from 'react-router-dom';

const QnARouter = ({ toggleDrawer }) => {
    const [openQnA, setOpenQnA] = React.useState(false);

    const handleQnAListOpen = () => {
        setOpenQnA(!openQnA);
    };

    return (
        <Fragment>
            <List>
                <ListItemButton onClick={handleQnAListOpen}>
                    <ListItemIcon>
                        <QuestionMarkIcon />
                    </ListItemIcon>
                    <ListItemText primary="QnA" />
                    {openQnA ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openQnA} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton
                            component={Link}
                            to="qna"
                            sx={{ pl: 4 }}
                            onClick={toggleDrawer(false)}
                            onKeyDown={toggleDrawer(false)}
                        >
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="QnA" />
                        </ListItemButton>
                    </List>
                </Collapse>
                <Collapse in={openQnA} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton
                            component={Link}
                            to="faq"
                            sx={{ pl: 4 }}
                            onClick={toggleDrawer(false)}
                            onKeyDown={toggleDrawer(false)}
                        >
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="FAQ" />
                        </ListItemButton>
                    </List>
                </Collapse>
            </List>
            <Divider />
        </Fragment>
    );
};

export default QnARouter;
