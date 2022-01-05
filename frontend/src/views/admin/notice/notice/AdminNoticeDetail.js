import React, { Fragment, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import TitleTile from './TitleTile';
import ContentTile from './ContentTile';
import ImageTile from './ImageTile';
import DatetimeTile from './DatetimeTile';
import { useConfirm } from '../../utils/alert/confirm';

export default function AdminNotice() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [notice, setNotice] = useState({});

    useEffect(() => {
        axios.get(`/api/notices/${id}`).then((response) => {
            console.log('response', response);
            console.log('response', response.data);
            setNotice(response.data['notice']);
        });
    }, [id]);

    const deleteConfirm = async () => {
        console.log('삭제했습니다.');
        try {
            const response = await axios.delete(`/api/notices/${id}`);
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
                createdAt={notice?.created_at}
                updatedAt={notice?.updated_at}
            />
            <TitleTile title={notice.title} />
            <ContentTile content={notice.content} />
            <Typography variant="body2">
                {notice.Images?.map((image) => {
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