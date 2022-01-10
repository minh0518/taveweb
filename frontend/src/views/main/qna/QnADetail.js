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
    const [answerid, setAnswerid] = useState('');
    const [answer, setAnswer] = useState('');
    const [answerform, setAnswerform] = useState({});

    useEffect(() => {
        axios.get(`/api/questions/${id}`).then((response) => {
            console.log('response', response.data);
            setQuestion(response.data['question']);
            if (response.data['question'].Answers[0]) {
                setAnswerid(response.data['question'].Answers[0]?.id);
            } else {
                setAnswerid(-1);
                setAnswer('아직 답변이 달리지 않았습니다.');
                console.log('답변이 없습니다.');
            }
        });
    }, [id]);

    return (
        <Nav>
            <Fragment>
                <Info>
                    <Section>
                        <div>
                            <h1>{question?.title}</h1>
                        </div>{' '}
                        <UnderLine /> <br />
                        <div>
                            <Typography
                                variant="h5"
                                component="div"
                                color="#0066ff"
                            >
                                Q
                            </Typography>
                            {question?.content}
                        </div>{' '}
                        <br />
                        <UnderLine />
                        <br />
                        <div style={{ whiteSpace: 'pre-line' }}>
                            {answerid && (
                                <Typography
                                    variant="h5"
                                    component="div"
                                    color="#0066ff"
                                >
                                    A
                                </Typography>
                            )}
                            {answerid &&
                                question.Answers?.map((answer) => (
                                    <div>{answer.content}</div>
                                ))}
                            {answerid == -1 && answer}
                        </div>
                    </Section>
                </Info>
            </Fragment>
        </Nav>
    );
}
