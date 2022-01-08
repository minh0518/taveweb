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

import TitleTile from '../../utils/newTiles/TitleTile';
import ContentTile from '../../utils/newTiles/ContentTile';
import ImageTile from '../../utils/newTiles/ImageTile';

import {
    Link,
    useNavigate,
    createSearchParams,
    useSearchParams,
} from 'react-router-dom';

export default function AdminAboutManager() {
    const [about_admin, setAboutadmin] = useState({ Images: [] });

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/about/admin`).then((response) => {
            console.log('response', response);
            console.log('response', response.data);
            setAboutadmin(response.data['about_admin']);
        });
    }, []);

    const handleTitle = async (newTitle) => {
        const response = await axios.patch(`/api/about/admin`, {
            title: newTitle,
        });

        setAboutadmin({
            ...about_admin,
            title: response.data['title'],
        });
    };
    const handleContent = async (newContent) => {
        const response = await axios.patch(`/api/about/admin`, {
            content: newContent,
        });

        setAboutadmin({
            ...about_admin,
            content: response.data['content'],
        });
    };

    const onDelete = (event) => {
        axios
            .delete(`/api/about/admin`)
            .then(function (response) {
                if (window.confirm('삭제하시겠습니까?')) {
                    console.log(response, '삭제 성공');
                    window.location.reload();
                    //navigate(`/admin/about/admin`);
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
                    to={`create`}
                    variant="contained"
                    endIcon={<AddIcon />}
                >
                    새로 만들기
                </Button>
                &nbsp;
                <Button
                    onClick={onDelete}
                    variant="contained"
                    endIcon={<DeleteIcon />}
                >
                    삭제하기
                </Button>
            </Grid>
            <br />
            <TitleTile title={about_admin?.title} handleTitle={handleTitle} />
            <ContentTile
                content={about_admin?.content}
                handleContent={handleContent}
            />
            <br />
            <Typography variant="body2">
                {about_admin?.Images.map((image) => {
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
