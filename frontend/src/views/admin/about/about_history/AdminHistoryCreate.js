import React, { Fragment, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import CreateImageTile from '../../utils/tiles/CreateImageTile';
import {
    Box,
    Card,
    Button,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    TextField,
    ImageList,
    Input,
    Grid,
    FormControl,
    Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {
    Link,
    useNavigate,
    createSearchParams,
    useSearchParams,
} from 'react-router-dom';

const AdminCreateHistory = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [imagedesc, setImagedesc] = useState('');
    const [imageForms, setImageForms] = useState([]);
    const navigate = useNavigate();

    const nextId = useRef(1);

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleChangeContent = (e) => {
        setContent(e.target.value);
    };

    const handleAddForm = (e) => {
        setImageForms(
            imageForms.concat({
                id: nextId.current,
                image: null,
                image_name: '',
                image_description: '',
            })
        );
        nextId.current += 1;

        console.log(imageForms);
    };

    const handleRemove = (id, original_image) => {
        setImageForms(imageForms.filter((imageForm) => imageForm.id !== id));
        setImages(
            images.filter(
                (image) => image.lastModified !== original_image.lastModified
            )
        );
    };

    const handleChangeImage = (id, image) => {
        console.log(image);
        setImages(images.concat(image));
    };

    const handleChangeImageName = (id, image_name) => {
        console.log(image_name);
        setImageForms(
            imageForms.map((imageForm) =>
                imageForm.id === id
                    ? {
                          ...imageForm,
                          image_name: image_name,
                      }
                    : imageForm
            )
        );
    };

    const handleChangeImageDesc = (id, value) => {
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
        setImagedesc(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();

        data.append('title', title);
        data.append('content', content);
        images.map((image) => {
            // console.log(image);
            // console.log(image.name);
            data.append('images', image, image.name);
        });
        data.append('image_description', JSON.stringify(imagedesc));

        console.log(title);
        console.log(content);
        console.log(images);
        console.log(imagedesc);
        console.log(imageForms);

        axios
            .post(`/api/about/history`, data, {
                body: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(function (response) {
                console.log(response, '성공');
                alert('작성 완료');
                navigate('/admin/about/history');
            })
            .catch(function (err) {
                console.log(err);
            });
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
                            onChangeImage={handleChangeImage}
                            onChangeImageName={handleChangeImageName}
                            onChangeImageDesc={handleChangeImageDesc}
                            onRemove={handleRemove}
                        ></CreateImageTile>
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default AdminCreateHistory;
