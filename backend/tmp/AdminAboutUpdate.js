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
import ImageTile from '../../utils/tiles/ImageTile';
import {
    Link,
    useNavigate,
    createSearchParams,
    useSearchParams,
} from 'react-router-dom';

const AdminAboutUpdate = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState({ Images: [] });
    const [imageForms, setImageForms] = useState([]);
    const navigate = useNavigate();

    const nextId = useRef(1);

    useEffect(() => {
        axios.get(`/api/about/tave`).then((response) => {
            console.log('response:', response.data);
            console.log('imageForms:' + imageForms);
            console.log('asas:' + response.data['about_tave'].Images.files);
            setTitle(response.data['about_tave'].title);
            setContent(response.data['about_tave'].content);
            setImages(response.data['about_tave'].Images);
            // images.map((image) => {
            //     //console.log('_image:' + image);
            //     //console.log('_image.name:' + image.name);
            //     setImageForms(
            //         imageForms.concat({
            //             id: response.data['about_tave'].Images[0].id,
            //             image: image,
            //             image_name: image.name,
            //             image_description:
            //                 response.data['about_tave'].Images[0]
            //                     .image_description,
            //         })
            //     );
            //     //data.append('images', image, image.name);
            // });
            //const image = response.data['about_tave'].Images[0].image_url;
            // setImageForms(
            //     imageForms.concat({
            //         id: response.data['about_tave'].Images[0].id,
            //         image: response.data['about_tave'].Images[0].image_url,
            //         image_name:
            //             response.data['about_tave'].Images[0].image_name,
            //         image_description:
            //             response.data['about_tave'].Images[0].image_description,
            //     })
            // );

            // setImageForms({
            //     id: response.data['about_tave'].Images,
            //     image: response.data['about_tave'].Images,
            //     image_name: response.data['about_tave'].Images,
            //     image_description: response.data['about_tave'].Images,
            // });
        });
    }, []);

    console.log('title:' + title);
    console.log('content:' + content);
    console.log('imageForms:' + imageForms);
    console.log('images:' + images);

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

        console.log('handleAddForm_imageForm:' + imageForms);
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
        console.log('hadleimage:' + image);
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
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        console.log('??????:' + images);

        data.append('title', title);
        data.append('content', content);
        images.map((image) => {
            console.log('mapimage:' + image);
            console.log('mapimage.name:' + image.name);
            data.append('images', image, image.name);
        });
        data.append('image_description', '{}');

        console.log(title);
        console.log(content);
        console.log(images);
        console.log(imageForms);

        axios
            .patch(`/api/about/tave`, data, {
                body: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(function (response) {
                console.log(response, '??????');
                alert('?????? ??????');
                navigate('/admin/about');
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
                    ????????? ??? ??????
                </Button>{' '}
                <Button
                    variant="contained"
                    endIcon={<AddIcon />}
                    onClick={handleSubmit}
                >
                    ??????
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
                            ??????
                        </Typography>
                        <FormControl fullWidth>
                            <TextField
                                id="outlined-basic"
                                //label="????????? ???????????????."
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
                            ??????
                        </Typography>
                        <FormControl fullWidth>
                            <TextField
                                id="outlined-basic"
                                label="????????? ???????????????."
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
            {/* <Typography variant="body2">
                {images?.product.map((image) => {
                    return (
                        <ImageTile
                            url={image.image_url}
                            description={image.image_description}
                        />
                    );
                })}
            </Typography> */}
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

export default AdminAboutUpdate;
