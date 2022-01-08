import React, { useState } from 'react';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

export default function QuestionTile({ question, handleQuestion }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const [edit, setEdit] = useState(false);

    const [newQuestion, setNewQuestion] = useState(question);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleToggleEdit = () => {
        setAnchorEl(null);

        setEdit(!edit);
    };

    const handleChange = (e) => {
        setNewQuestion(e.target.value);
    };

    const handleSubmit = () => {
        setEdit(!edit);

        handleQuestion(newQuestion);
    };

    const handleCancel = () => {
        setEdit(!edit);
    };

    return (
        <Paper elevation={3} sx={{ minWidth: 275, mb: 1 }}>
            <Grid container>
                <Grid item xs={10} align={'left'} sx={{ p: 1 }}>
                    <Typography
                        sx={{ fontSize: 14, pb: 1 }}
                        color="text.secondary"
                        gutterBottom
                    >
                        질문
                    </Typography>
                    <Typography variant="h6" component="div">
                        {question}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
}
