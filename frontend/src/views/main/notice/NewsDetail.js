import React, { Fragment, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ImageListItem from '@mui/material/ImageListItem';

export default function NewsDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [news, setNews] = useState({});

    useEffect(() => {
        axios.get(`/api/news/${id}`).then((response) => {
            console.log('response', response);
            console.log('response', response.data);
            setNews(response.data['news']);
        });
    }, [id]);

    return (
        <Fragment>
            <div>{news?.title}</div>
            <div>{news?.content}</div>
            <br />
            <Typography variant="body2">
                {news.Images?.map((image) => {
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
