import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
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

    const onDelete = (event) => {
        axios
            .delete(`/api/about/tave`)
            .then(function (response) {
                if (window.confirm('삭제하시겠습니까?')) {
                    window.location.href = '/admin/about';
                    console.log(response, '삭제 성공');
                } else {
                    //window.location.href = '/admin/about';
                }
            })
            .catch(function (err) {
                console.log(err);
            });
    };

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
                        &nbsp;
                        <Button
                            //component={Link}
                            onClick={onDelete}
                            variant="contained"
                            endIcon={<DeleteIcon />}
                        >
                            삭제하기
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
