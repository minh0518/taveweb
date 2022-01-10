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

export default function AdminAboutHistory() {
    const [history, setAbouttave] = useState({ Images: [] });

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/about/history`).then((response) => {
            console.log('response', response);
            console.log('response', response.data);
            setAbouttave(response.data['history']);
        });
    }, []);

    const Nav = styled.nav`
        text-align: center;
        width: 70%;
        margin: auto;
        padding: 20px;
        border: 5px solid #c4d4e0;
        font-family: '"' Noto Sans KR ', sans-serif"';
    `;

    return (
        <Nav>
            <Fragment>
                <div>{history?.title}</div>
                <div style={{ whiteSpace: 'pre-line' }}>{history?.content}</div>
                <br />
                <Typography variant="body2">
                    {history?.Images.map((image) => {
                        return (
                            <div class="ImageWrap">
                                <div class="image">
                                    <img
                                        object-fit="contain"
                                        src={image.image_url}
                                        alt={image.image_description}
                                        loading="lazy"
                                    />
                                    <br />
                                    {image.image_description}
                                </div>
                            </div>
                        );
                    })}
                </Typography>
            </Fragment>
        </Nav>
    );
}
