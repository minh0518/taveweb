import React, { Fragment, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import styled from 'styled-components';

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

    const Nav = styled.nav`
    margin:auto;
    width:70%;
    `;
    const Info = styled.div`
    `;
    const Section = styled.div``;
    const UnderLine = styled.hr`
    width: 80%;
    margin-left: 0px;
    `;
    return (
        <Nav>
        <Fragment>
            <Info>
            <Section>
            <div><h1>제목: {faq?.title}</h1></div> <UnderLine />  <br />
            <div>질문: {faq?.question}</div> <br />
            <div>답변: {faq?.answer}</div> <br />          
            </Section>
            </Info>          
        </Fragment>
        </Nav>
    );
}
