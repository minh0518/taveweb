import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';

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

    return (
        <Fragment>
            <div>title={about_tave?.title}</div>
            <div>content={about_tave?.content}</div>
            <br />
            <Typography variant="body2">
                {about_tave?.Images.map((image) => {
                    return (
                        <div>
                            url={image.image_url}
                            description={image.image_description}
                        </div>
                    );
                })}
            </Typography>
        </Fragment>
    );
}
