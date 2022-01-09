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

import ImageTile from '../../admin/utils/tiles/ImageTile';

import {
    Link,
    useNavigate,
    createSearchParams,
    useSearchParams,
} from 'react-router-dom';

export default function AdminAboutManager() {
    const [about_admin, setAbouttave] = useState({ Images: [] });

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/about/admin`).then((response) => {
            console.log('response', response);
            console.log('response', response.data);
            setAbouttave(response.data['about_admin']);
        });
    }, []);

    const Nav = styled.nav`
    position: relative;
    text-align: center;
    width: 850px;
    margin: auto;
    padding: 20px;
    border: 5px solid #C4D4E0;
`;
    const container = styled.div`
    position: relative;
    text-align: center;
    font-family: '"' Noto Sans KR ', sans-serif"';
    `;

    const ImageWrap = styled.div`
    width : 25%
    `
    const image= styled.div`
    max-width : 50%
    height: auto;
    `;
    return (
        <Fragment>
            <Nav>
            <div class="container">{about_admin?.title}</div>
            <br />
            <div class="container">{about_admin?.content}</div>
            <br /><br />
            <div class="container">
            <Typography variant="body2">
                {about_admin?.Images.map((image) => {
                    return (
                        <ImageListItem>
                            <div class="ImageWrap">
                            <div class="image">
                            <img
                                src={image.image_url}
                                alt={image.image_description}
                                loading="lazy"
                                width="600"
                            />
                            </div>
                            </div>
                        </ImageListItem>
                    );
                })}
            </Typography>
            </div>
            <br />
            <br />
            </Nav>
        </Fragment>
    );
}
