import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
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
} from '@mui/material';
import {
    Link,
    useNavigate,
    createSearchParams,
    useSearchParams,
} from 'react-router-dom';

const AdminCreateAboutTave = () => {
    const [TitleValue, setTitleValue] = useState({ Images: [] });
    const [ContentValue, setContentValue] = useState({ Images: [] });
    const [ImagesValue, setImagesValue] = useState({ Images: [] });
    const [ImageDescriptionValue, setImageDescriptionValue] = useState({
        Images: [],
    });
    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value);
    };
    const onContentChange = (event) => {
        setContentValue(event.currentTarget.value);
    };
    const onImagesChange = (event) => {
        //console.log('event.target.value:' + event.target.value);
        //console.log('event.target.files:' + event.target.files);
        //console.log('event.target.files[0]:' + event.target.files[0]);
        setImagesValue(event.target.files);
    };
    const onImageDescriptionChange = (event) => {
        setImageDescriptionValue(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const Data = new FormData();

        const title = TitleValue;
        const content = ContentValue;
        const images = ImagesValue;
        const image_description = ImageDescriptionValue;
        console.log('images:' + images);
        console.log('image_des:' + image_description);

        Data.append('title', title);
        Data.append('content', content);
        for (let image of images) {
            Data.append('images', image);
        }
        Data.append('image_description', image_description);

        axios
            .post(`/api/about/tave`, Data, {
                body: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(function (response) {
                console.log(response, '성공');
                alert('작성 완료');
                window.location.href = '/admin/about';
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    return (
        <Fragment>
            <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 3 }}>
                <List
                    component="nav"
                    aria-label="mailbox folders"
                    alignment="center"
                >
                    <Typography component="h1" variant="h5">
                        TAVE 소개 작성
                    </Typography>
                    <Divider />
                    <ListItem>
                        제목: &nbsp;
                        <TextField
                            id="title"
                            //label="제목"
                            variant="outlined"
                            value={TitleValue.title}
                            onChange={onTitleChange}
                        />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        내용: &nbsp;
                        <TextField
                            fullWidth
                            id="content"
                            //label="내용"
                            variant="outlined"
                            value={ContentValue.content}
                            onChange={onContentChange}
                        />
                    </ListItem>
                    <Divider light />
                    <ListItem>
                        <Button
                            variant="contained"
                            component="label"
                            onChange={onImagesChange}
                        >
                            <input multiple type="file" name="images" hidden />
                            Upload
                        </Button>
                    </ListItem>
                    <ListItem>
                        이미지 설명: &nbsp;
                        <TextField
                            fullWidth
                            id="image_description"
                            variant="outlined"
                            value={ImageDescriptionValue.image_description}
                            onChange={onImageDescriptionChange}
                        />
                    </ListItem>
                </List>
                <Button type="submit" variant="contained">
                    저장하기
                </Button>
            </Box>
        </Fragment>
    );
};

export default AdminCreateAboutTave;
