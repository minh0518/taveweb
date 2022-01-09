import React, { Fragment, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ImageListItem from '@mui/material/ImageListItem';

export default function PicturesDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [picture, setPicture] = useState({});

    useEffect(() => {
        axios.get(`/api/activity/picture/${id}`).then((response) => {
            //console.log('response', response);
            console.log('response', response.data);
            setPicture(response.data['activity_picture']);
        });
    }, [id]);

    return (
        <Fragment>
            <div>{picture?.title}</div>
            <div>{picture?.content}</div>
            <br />
            <Typography variant="body2">
                {picture.Images?.map((image) => {
                    return (
                        <ImageListItem>
                            <img
                                src={image.image_url}
                                alt={image.image_description}
                                loading="lazy"
                            />
                        </ImageListItem>
                    );
                })}
            </Typography>
        </Fragment>
    );
}
