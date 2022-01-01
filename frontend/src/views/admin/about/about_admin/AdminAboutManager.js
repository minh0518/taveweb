import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';

import {
    Link,
    useNavigate,
    createSearchParams,
    useSearchParams,
} from 'react-router-dom';

export default function AdminAboutManager() {
    const [about_admin, setAbouttave] = useState({ Images: [] });

    useEffect(() => {
        axios.get(`/api/about/admin`).then((response) => {
            console.log('response', response);
            console.log('response', response.data);
            setAbouttave(response.data['about_admin']);
        });
    }, []);

    return (
        <Fragment>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                    ></Typography>
                    <Grid item xs={4} align={'right'}>
                        <Button
                            component={Link}
                            to={`create`}
                            variant="contained"
                            endIcon={<AddIcon />}
                        >
                            작성
                        </Button>
                    </Grid>
                    <Typography variant="h5" component="div">
                        {about_admin.title}
                    </Typography>
                    <Typography variant="body2">
                        {about_admin.content}
                        <br />
                        {about_admin.Images.map((image) => {
                            return (
                                <Fragment>
                                    <img
                                        src={`${image.image_url}`}
                                        alt={image.image_description}
                                        loading="lazy"
                                    />
                                    <br />
                                    {image.image_description}
                                    <br />
                                </Fragment>
                            );
                        })}
                    </Typography>
                </CardContent>
            </Card>
        </Fragment>
    );
}
