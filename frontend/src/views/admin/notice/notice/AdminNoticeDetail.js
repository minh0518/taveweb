import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

import Typography from '@mui/material/Typography';

import { useParams, useNavigate } from 'react-router-dom';
import TitleTile from './TitleTile';
import ContentTile from './ContentTile';
import ImageTile from './ImageTile';
import DatetimeTile from './DatetimeTile';

export default function AdminNotice() {
    const { id } = useParams();
    // const navigate = useNavigate();

    const [notice, setNotice] = useState({});

    useEffect(() => {
        axios.get(`/api/notices/${id}`).then((response) => {
            console.log('response', response);
            console.log('response', response.data);
            setNotice(response.data['notice']);
        });
    }, [id]);

    return (
        <Fragment>
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
