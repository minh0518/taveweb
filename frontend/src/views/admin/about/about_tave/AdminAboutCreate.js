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

const AdminNewAboutTave = () => {
    const [about_tave, setAbouttave] = useState({ Images: [] });

    useEffect(() => {
        axios.get(`/api/about/tave`).then((response) => {
            console.log('response', response);
            console.log('response', response.data);
            setAbouttave(response.data['about_tave']);
        });
    }, []);

    const {title, content, images, image_description } = about_tave;


    // const onhandlePost = async (data) => {
    //     const { title, content, images, image_description } = data;
    //     const postData = { title, content, images, image_description };

    const handleSubmit = (e) => {

        const Data = new FormData();
        data.append(title, content, images, image_description);

        // post
        axios
            .post(`/api/about/tave`, Data)
            .then(function (response) {
                console.log(response, '성공');
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    const onChangetitle = (e)=>{
        e.preventDefault();
        title = e.target.
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     const data = new FormData(e.currentTarget);
    //     const AboutTaveData = {
    //         title: data.get('title'),
    //         content: data.get('content'),
    //         images: data.get('images'),
    //         image_description: data.get('image_description'),
    //     };
    //     const { title, content, images, image_description } = AboutTaveData;

    //     onhandlePost(AboutTaveData);

    //     // const handleChange = (event) => {
    //     //     setAbouttave(event.target.value);
    // };

    return (
        <Fragment>
            <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
            >
                <FormControl component="fieldset" variant="standard">
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
                                value={about_tave.title}
                                onChange={handleChange}
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
                                value={about_tave.content}
                                //onChange={handleChange}
                            />
                        </ListItem>
                        <Divider light />
                        <ListItem>
                            {about_tave.Images &&
                                about_tave.Images.map((image) => {
                                    return (
                                        <Fragment>
                                            <Grid container spacing={2}>
                                                <Grid>
                                                    <img
                                                        id="images"
                                                        src={`${image.image_url}`}
                                                        loading="lazy"
                                                        width="350"
                                                        height="150"
                                                    />
                                                </Grid>
                                                <Grid>
                                                    <TextField
                                                        id="image_description"
                                                        //label="이미지 설명"
                                                        variant="outlined"
                                                        value={
                                                            image.image_description
                                                        }
                                                        //onChange={handleChange}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <br />
                                            &nbsp;
                                            <br />
                                        </Fragment>
                                    );
                                    <br />;
                                })}
                        </ListItem>
                        <ListItem>
                            <Button variant="contained" component="label">
                                Upload File
                                <input type="file" hidden />
                            </Button>
                        </ListItem>
                    </List>
                    <Button variant="contained">저장하기</Button>
                </FormControl>
            </Box>
        </Fragment>
    );
    // 스낵바
    // return (
    //     <Card sx={{ minWidth: 275 }}>
    //         <CardContent>
    //             <Typography
    //                 sx={{ fontSize: 14 }}
    //                 color="text.secondary"
    //                 gutterBottom
    //             >
    //                 Word of the Day
    //             </Typography>
    //             <Typography variant="h5" component="div">
    //                 안녕
    //             </Typography>
    //             <Typography sx={{ mb: 1.5 }} color="text.secondary">
    //                 adjective
    //             </Typography>
    //             <Typography variant="body2">
    //                 well meaning and kindly.
    //                 <br />
    //                 {'"a benevolent smile"'}
    //             </Typography>
    //         </CardContent>
    //         <CardActions>
    //             <Button size="small">Learn More</Button>
    //         </CardActions>
    //     </Card>
    // );
};

export default AdminNewAboutTave;
