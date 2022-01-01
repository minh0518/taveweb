import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

import CreateImageTile from '../../utils/tiles/CreateImageTile';

const AdminNewNotice = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageForms, setImageForms] = useState([]);

    const nextId = useRef(1);

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleChangeContent = (e) => {
        setContent(e.target.value);
    };

    const handleAddForm = (e) => {
        setImageForms(
            imageForms.concat({ id: nextId.current, image_description: '' })
        );
        nextId.current += 1;

        console.log(imageForms);
    };

    const handleRemove = (id) => {
        setImageForms(imageForms.filter((imageForm) => imageForm.id !== id));
    };

    const handleChange = (id, value) => {
        setImageForms(
            imageForms.map((imageForm) =>
                imageForm.id === id
                    ? {
                          ...imageForm,
                          image_description: value,
                      }
                    : imageForm
            )
        );
    };

    const handleSubmit = (e) => {
        console.log(title);
        console.log(content);
        console.log(imageForms);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} align={'right'}>
                <Button
                    variant="outlined"
                    endIcon={<AddIcon />}
                    onClick={handleAddForm}
                >
                    이미지 폼 추가
                </Button>{' '}
                <Button
                    variant="contained"
                    endIcon={<AddIcon />}
                    onClick={handleSubmit}
                >
                    저장
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Paper elevation={3} sx={{ minWidth: 275 }}>
                    <Grid item xs={12} align={'left'} sx={{ p: 1 }}>
                        <Typography
                            sx={{ fontSize: 16, mb: 2 }}
                            color="text.secondary"
                            gutterBottom
                        >
                            제목
                        </Typography>
                        <FormControl fullWidth>
                            <TextField
                                id="outlined-basic"
                                label="제목을 입력하세요."
                                variant="outlined"
                                value={title}
                                onChange={handleChangeTitle}
                            />
                        </FormControl>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper elevation={3} sx={{ minWidth: 275 }}>
                    <Grid item xs={12} align={'left'} sx={{ p: 1 }}>
                        <Typography
                            sx={{ fontSize: 16, mb: 2 }}
                            color="text.secondary"
                            gutterBottom
                        >
                            내용
                        </Typography>
                        <FormControl fullWidth>
                            <TextField
                                id="outlined-basic"
                                label="내용을 입력하세요."
                                variant="outlined"
                                multiline
                                rows={5}
                                value={content}
                                onChange={handleChangeContent}
                            />
                        </FormControl>
                    </Grid>
                </Paper>
            </Grid>
            {imageForms?.map((imageForm, index) => {
                return (
                    <Grid key={index} item xs={12}>
                        <CreateImageTile
                            imageForm={imageForm}
                            onChange={handleChange}
                            onRemove={handleRemove}
                        ></CreateImageTile>
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default AdminNewNotice;
