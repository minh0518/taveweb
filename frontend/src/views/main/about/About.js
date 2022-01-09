import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

import styled from 'styled-components';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Paper from '@mui/material/Paper';
import ImageListItem from '@mui/material/ImageListItem';

import {
    Link,
    useNavigate,
    createSearchParams,
    useSearchParams,
} from 'react-router-dom';

export default function AdminAbout() {
    const [about_tave, setAbouttave] = useState({ Images: [] });

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/about/tave`).then((response) => {
            console.log('response', response);
            console.log('response', response.data);
            setAbouttave(response.data['about_tave']);
        });
        console.log();
    }, []);

    const Nav = styled.nav`
    text-align: center;
    width: 70%;
    margin: auto;
    padding: 20px;
    border: 5px solid #C4D4E0;
    font-family: '"' Noto Sans KR ', sans-serif"';
    `;

    return (
        <Nav>
        <Fragment>
            <div>{about_tave?.title}</div>
            <div style={{ whiteSpace: 'pre-line' }}>{about_tave?.content}</div>
            <br />
            <Typography variant="body2">
                {about_tave?.Images.map((image) => {
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
        </Nav>
    );
}
