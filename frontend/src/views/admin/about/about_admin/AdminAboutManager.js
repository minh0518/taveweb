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
    const [visible, setVisible] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/about/admin`).then((response) => {
            console.log('response', response);
            console.log('response', response.data);
            if (response.data['about_admin'] == null) {
                setVisible(true);
            } else {
                setVisible(false);
            }
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

    const handleUpdateImage = async (id, image, description) => {
        const data = new FormData();

        data.append('image', image);
        data.append('image_description', description);

        const response = await axios.patch(
            `/api/about/admin/image/${id}`,
            data,
            {
                body: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        console.log(response.data);

        if (response.status === 200) {
            setAboutadmin({
                ...about_admin,
                Images: about_admin.Images?.map((image) =>
                    image.id === id
                        ? {
                              ...image,
                              image_url: response.data['image_url'],
                              image_description:
                                  response.data['image_description'],
                          }
                        : image
                ),
            });
        }
    };

    const handleRemoveImage = async (id) => {
        const response = await axios.delete(`/api/about/admin/${id}`);

        console.log(response.data);

        if (response.status === 200) {
            setAboutadmin({
                ...about_admin,
                Images: about_admin.Images?.filter((image) => image.id !== id),
            });
        }
    };

    const onDelete = (event) => {
        axios
            .delete(`/api/about/admin`)
            .then(function (response) {
                if (window.confirm('?????????????????????????')) {
                    console.log(response, '?????? ??????');
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
                {visible && (
                    <Button
                        component={Link}
                        to={`create`}
                        variant="contained"
                        endIcon={<AddIcon />}
                    >
                        ?????? ?????????
                    </Button>
                )}
                &nbsp;
                {!visible && (
                    <Button
                        onClick={onDelete}
                        variant="contained"
                        endIcon={<DeleteIcon />}
                    >
                        ????????????
                    </Button>
                )}
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
                            id={image.id}
                            url={image.image_url}
                            description={image.image_description}
                            onUpdateImage={handleUpdateImage}
                            onRemoveImage={handleRemoveImage}
                        />
                    );
                })}
            </Typography>
        </Fragment>
    );
}
