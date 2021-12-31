import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';

import {
    Link,
    useNavigate,
    createSearchParams,
    useSearchParams,
} from 'react-router-dom';

export default function AdminAbout() {
    const [about_tave, setAbouttave] = useState({ Images: [] });

    useEffect(() => {
        axios.get(`/api/about/tave`).then((response) => {
            console.log('response', response);
            console.log('response', response.data);
            setAbouttave(response.data['about_tave']);
        });
        console.log();
    }, []);

    // about_tave.title = 'dd';
    // about_tave.content = 'dd';
    // about_tave.images = 'dd';
    // about_tave.image_description = 'dd';

    return (
        <Fragment>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Grid container justify="flex-end">
                        <Button
                            component={Link}
                            to={`update`}
                            variant="contained"
                            endIcon={<AddIcon />}
                        >
                            수정
                        </Button>
                        &nbsp;
                        <Button
                            component={Link}
                            to={`create`}
                            variant="contained"
                            endIcon={<AddIcon />}
                        >
                            새로 만들기
                        </Button>
                    </Grid>

                    <Typography variant="h5" component="div">
                        {about_tave != null ? about_tave.title : '제목 없음'}
                    </Typography>
                    <Typography variant="body2">
                        {about_tave != null ? about_tave.content : '내용 없음'}
                        <br />
                        {about_tave != null
                            ? about_tave.Images.map((image) => {
                                  return (
                                      <Fragment>
                                          <img
                                              src={`${image.image_url}`}
                                              alt={image.image_description}
                                              loading="lazy"
                                          />
                                          <br />
                                          {image.image_description}
                                          <br />
                                      </Fragment>
                                  );
                              })
                            : '이미지 없음'}
                    </Typography>
                </CardContent>
            </Card>
        </Fragment>
    );
}
