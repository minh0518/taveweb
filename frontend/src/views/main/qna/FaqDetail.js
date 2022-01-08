import React, { Fragment, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ImageListItem from '@mui/material/ImageListItem';

export default function FaqsDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [faq, setFaq] = useState({});

    useEffect(() => {
        axios.get(`/api/faqs/${id}`).then((response) => {
            console.log('response', response.data);
            setFaq(response.data['faq']);
        });
    }, [id]);

    return (
        <Fragment>
            <div>제목: {faq?.title}</div>
            <div>질문: {faq?.question}</div>
            <div>답변: {faq?.answer}</div>
        </Fragment>
    );
}
