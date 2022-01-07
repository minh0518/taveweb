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

import TitleTile from '../../utils/tiles/TitleTile';
import ContentTile from '../../utils/tiles/ContentTile';
import ImageTile from '../../utils/tiles/ImageTile';

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

    const onDelete = (event) => {
        axios
            .delete(`/api/about/tave`)
            .then(function (response) {
                if (window.confirm('삭제하시겠습니까?')) {
                    console.log(response, '삭제 성공');
                    window.location.reload();
                    //navigate('/admin/about');
                }
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    return (
        <Fragment>
            <Grid container justify="flex-end">
                <Button
                    component={Link}
                    to={`update`}
                    variant="contained"
                    endIcon={<AddIcon />}
                >
                    수정
                </Button>
                &nbsp;
                <Button
                    component={Link}
                    to={`create`}
                    variant="contained"
                    endIcon={<AddIcon />}
                >
                    새로 만들기
                </Button>
                &nbsp;
                <Button
                    //component={Link}
                    onClick={onDelete}
                    variant="contained"
                    endIcon={<DeleteIcon />}
                >
                    삭제하기
                </Button>
            </Grid>
            <br />
            <TitleTile title={about_tave?.title} />
            <ContentTile content={about_tave?.content} />
            <br />
            <Typography variant="body2">
                {about_tave?.Images.map((image) => {
                    return (
                        <ImageTile
                            url={image.image_url}
                            description={image.image_description}
                        />
                    );
                })}
            </Typography>
        </Fragment>
    );
}
