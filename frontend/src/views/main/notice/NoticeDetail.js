import React, { Fragment, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import styled from 'styled-components';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ImageListItem from '@mui/material/ImageListItem';

export default function NoticeDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [notice, setNotice] = useState({});

    useEffect(() => {
        axios.get(`/api/notices/${id}`).then((response) => {
            console.log('response', response);
            console.log('response', response.data);
            setNotice(response.data['notice']);
            console.log(response.data['notice']);
        });
    }, [id]);
    const Nav = styled.nav`
        margin: auto;
        width: 70%;
    `;
    const Info = styled.div``;
    const UnderLine = styled.hr`
        width: 80%;
        margin-left: 0px;
    `;
    const Section = styled.div``;

    return (
        <Nav>
            <Fragment>
                <Info>
                    <Section>
                        <div>
                            <h1>{notice?.title}</h1>
                        </div>
                        <div
                            style={{
                                textAlign: 'right',
                                width: '80%',
                                fontSize: '11px',
                            }}
                        >
                            작성일자:{' '}
                            {new Date(
                                Date.parse(notice?.created_at)
                            ).toLocaleString()}
                        </div>
                        <UnderLine />
                    </Section>
                </Info>
                <br />
                <div style={{ whiteSpace: 'pre-line' }}>{notice?.content}</div>
                <br />
                <Typography variant="body2">
                    {notice?.Images?.map((image) => {
                        return (
                            <div class="ImageWrap">
                                <div class="image">
                                    <img
                                        object-fit="contain"
                                        src={image.image_url}
                                        alt={image.image_description}
                                        loading="lazy"
                                    />
                                    <br />
                                    {image.image_description}
                                </div>
                            </div>
                        );
                    })}
                </Typography>
            </Fragment>
        </Nav>
    );
}
