import React, { Fragment, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import styled from 'styled-components';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ImageListItem from '@mui/material/ImageListItem';

export default function ReviewDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [review, setReview] = useState({});

    useEffect(() => {
        axios.get(`/api/activity/review/${id}`).then((response) => {
            //console.log('response', response);
            console.log('response', response.data);
            setReview(response.data['activity_review']);
        });
    }, [id]);

    const Nav = styled.nav`
        margin:auto;
        width:70%;
    `;
    const Info = styled.div`
    `;
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
            <div><h1>{review?.title}</h1></div>
            </Section>
            </Info>
            <div style={{ whiteSpace: 'pre-line' }}>{review?.content}</div>
            <br />
            <Typography variant="body2">
                {review.Images?.map((image) => {
                    return (
                        <ImageListItem>
                            <img
                                src={image.image_url}
                                alt={image.image_description}
                                loading="lazy"
                            />
                        </ImageListItem>
                    );
                })}
            </Typography>
        </Fragment>
        </Nav>
    );
}
