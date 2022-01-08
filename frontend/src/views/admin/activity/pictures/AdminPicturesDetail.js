import React, { Fragment, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import TitleTile from '../../utils/newTiles/TitleTile';
import ContentTile from '../../utils/newTiles/ContentTile';
import ImageTile from '../../utils/newTiles/ImageTile';
import DatetimeTile from '../../utils/newTiles/DatetimeTile';
import { useConfirm } from '../../utils/alert/confirm';

export default function AdminPicturesDetail() {
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

    const handleTitle = async (newTitle) => {
        const response = await axios.patch(`/api/activity/picture/${id}`, {
            title: newTitle,
        });

        setPicture({
            ...picture,
            title: response.data['title'],
        });
        // alert('수정 완료');
        // window.location.reload();
    };
    const handleContent = async (newContent) => {
        const response = await axios.patch(`/api/activity/picture/${id}`, {
            content: newContent,
        });

        setPicture({
            ...picture,
            content: response.data['content'],
        });
    };

    const deleteConfirm = async () => {
        console.log('삭제했습니다.');
        try {
            const response = await axios.delete(`/api/activity/picture/${id}`);
            console.log(response.data);
        } catch (e) {
            console.log(e);
        }
        navigate(-1);
    };
    const cancelConfirm = () => {
        console.log('취소했습니다.');
    };

    const confirmDelete = useConfirm(
        '삭제하시겠습니까?',
        deleteConfirm,
        cancelConfirm
    );

    return (
        <Fragment>
            <Grid item xs={12} align={'right'} sx={{ mb: 1 }}>
                <Button
                    variant="contained"
                    color="error"
                    endIcon={<DeleteForeverIcon />}
                    onClick={confirmDelete}
                >
                    삭제
                </Button>
            </Grid>
            <DatetimeTile
                createdAt={picture?.created_at}
                updatedAt={picture?.updated_at}
            />
            <TitleTile title={picture.title} handleTitle={handleTitle} />
            <ContentTile
                content={picture.content}
                handleContent={handleContent}
            />
            <Typography variant="body2">
                {picture.Images?.map((image) => {
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
