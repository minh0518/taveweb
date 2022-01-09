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
    margin: auto;
    width: 70%;
`;
const Info = styled.div``;
const Section = styled.div``;
const UnderLine = styled.hr`
    width: 80%;
    margin-left: 0px;
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
        <Nav>
            <Fragment>
                <Info>
                    <Section>
                        <div>
                            <h1>제목: {question?.title}</h1>
                        </div>{' '}
                        <UnderLine /> <br />
                        <div>질문: {question?.content}</div> <br />
                        <div style={{ whiteSpace: 'pre-line' }}>
                            답변: <br />
                            {question.Answers?.map((answer) => (
                                <div>{answer.content}</div>
                            ))}
                        </div>
                    </Section>
                </Info>
            </Fragment>
        </Nav>
    );
}
