import React, { Fragment, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ImageListItem from '@mui/material/ImageListItem';

export default function QnADetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [question, setQuestion] = useState({});
    const [answer, setAnswer] = useState({});
    const [answerform, setAnswerform] = useState({});

    useEffect(() => {
        axios.get(`/api/questions/${id}`).then((response) => {
            console.log('response', response.data);
            setQuestion(response.data['question']);
        });
    }, [id]);

    return (
        <Fragment>
            <div>제목: {question?.title}</div>
            <div>질문: {question?.content}</div>
            <div>
                답변:
                {question.Answers?.map((answer) => (
                    <div>{answer.content}</div>
                ))}
            </div>
        </Fragment>
    );
}
