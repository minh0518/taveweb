import React, { Fragment, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import TitleTile from '../../utils/tiles/TitleTile';
import ContentTile from '../../utils/tiles/ContentTile';
import ImageTile from '../../utils/tiles/ImageTile';
import DatetimeTile from '../../utils/tiles/DatetimeTile';
import { useConfirm } from '../../utils/alert/confirm';
import QuestionTile from '../../utils/tiles/QuestionTile';
import FAQAnswerTile from '../../utils/tiles/FAQAnswerTile';

export default function AdminFaqDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [faq, setFaq] = useState({});

    useEffect(() => {
        axios.get(`/api/faqs/${id}`).then((response) => {
            console.log('response', response.data);
            setFaq(response.data['faq']);
        });
    }, [id]);

    const deleteConfirm = async () => {
        console.log('삭제했습니다.');
        try {
            const response = await axios.delete(`/api/faqs/${id}`);
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
                createdAt={faq?.created_at}
                updatedAt={faq?.updated_at}
            />
            <TitleTile title={faq.title} />
            <QuestionTile question={faq.question} />
            <FAQAnswerTile answer={faq.answer} />
        </Fragment>
    );
}
