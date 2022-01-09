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

export default function AdminAbout() {
    const [about_tave, setAbouttave] = useState({ Images: [] });
    const [visible, setVisible] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/about/tave`).then((response) => {
            console.log('response', response);
            console.log('response', response.data);
            if (response.data['about_tave'] == null) {
                setVisible(true);
            } else {
                setVisible(false);
            }
            setAbouttave(response.data['about_tave']);
        });
        console.log();
    }, []);

    const handleTitle = async (newTitle) => {
        const response = await axios.patch(`/api/about/tave`, {
            title: newTitle,
        });

        setAbouttave({
            ...about_tave,
            title: response.data['title'],
        });
    };
    const handleContent = async (newContent) => {
        const response = await axios.patch(`/api/about/tave`, {
            content: newContent,
        });

        setAbouttave({
            ...about_tave,
            content: response.data['content'],
        });
    };

    const handleUpdateImage = async (id, image, description) => {
        const data = new FormData();

        data.append('image', image);
        data.append('image_description', description);

        const response = await axios.patch(
            `/api/about/tave/image/${id}`,
            data,
            {
                body: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        console.log(response.data);

        if (response.status === 200) {
            setAbouttave({
                ...about_tave,
                Images: about_tave.Images?.map((image) =>
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
        const response = await axios.delete(`/api/about/tave/image/${id}`);

        console.log(response.data);

        if (response.status === 200) {
            setAbouttave({
                ...about_tave,
                Images: about_tave.Images?.filter((image) => image.id !== id),
            });
        }
    };

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
                {visible && (
                    <Button
                        component={Link}
                        to={`create`}
                        variant="contained"
                        endIcon={<AddIcon />}
                    >
                        새로 만들기
                    </Button>
                )}

                {!visible && (
                    <Button
                        onClick={onDelete}
                        variant="contained"
                        endIcon={<DeleteIcon />}
                    >
                        삭제하기
                    </Button>
                )}
            </Grid>
            <br />
            <TitleTile title={about_tave?.title} handleTitle={handleTitle} />
            <ContentTile
                content={about_tave?.content}
                handleContent={handleContent}
            />
            <br />
            <Typography variant="body2">
                {about_tave?.Images.map((image) => {
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
