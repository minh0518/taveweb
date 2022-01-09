import React, { Fragment, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import styled from 'styled-components';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ImageListItem from '@mui/material/ImageListItem';

const Nav = styled.nav`
    position: relative;
    text-align: center;
    width: 850px;
    margin: auto;
    padding: 20px;
    border: 5px solid #c4d4e0;
`;
const container = styled.div`
    position: relative;
    text-align: center;
    font-family: '"' Noto Sans KR ', sans-serif"';
`;

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
            <Nav>
                <div class="container">{question?.title}</div>
                <div class="container">질문: {question?.content}</div>
                <div class="container">
                    답변:
                    {question.Answers?.map((answer) => (
                        <div>{answer.content}</div>
                    ))}
                </div>
            </Nav>
        </Fragment>
    );
}
