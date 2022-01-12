import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

import styled from 'styled-components';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
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

export default function Pictures() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [pictures, setPictures] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const [search, setSearch] = useState('');
    const [limit, setLimit] = useState(8);

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('/api/activity/picture/count', { params: { search } }) //api백엔드에는 현재7개
            //의 notices가 있음
            .then((response) => {
                const pageCount = Math.ceil(response.data['count'] / limit);

                setCount(pageCount);
            });
    }, [limit]);

    useEffect(() => {
        let page = Number(searchParams.get('page'));
        //쿼리스트링에서 page키값의 value를 가져옴
        page = page ? page : 1; // undefined면 1을 채워 넣음
        console.log(page);
        let skip = (page - 1) * limit;

        setCurrentPage(page);

        axios
            .get('/api/activity/picture', { params: { skip, limit } })
            .then((response) => {
                console.log(response.data);
                setPictures(response.data['activity_picture']);
            });
    }, [searchParams]);

    const handlePaginationClick = (e, page) => {
        setCurrentPage(page);

        navigate({ search: `?${createSearchParams({ page })}` });
        //createSearchParams : 쿼리스트링을 만듦
        //page : 2 들어감
    };

    const Nav = styled.nav`
        margin: auto;
        width: 70%;
        padding-bottom: 20px;
    `;

    return (
        <Nav>
            <Fragment>
                <div style={{ height: '100vh' }}>
                    <Card elevation={3} sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    <Typography
                                        align="left"
                                        variant="h5"
                                        component="div"
                                        color="#0066ff"
                                    >
                                        활동 사진
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <TableContainer component={Paper} elevation={0}>
                            <Table
                                sx={{ minWidth: 275 }}
                                aria-label="simple table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell width="30%">ID</TableCell>
                                        <TableCell width="30%" align="center">
                                            제목
                                        </TableCell>
                                        <TableCell width="30%" align="right">
                                            작성일자
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {pictures.map((picture, index) => (
                                        <TableRow
                                            component={Link}
                                            to={`${picture.id}`}
                                            key={picture.id}
                                            sx={{
                                                '&:last-child td, &:last-child th': {
                                                    border: 0,
                                                },
                                                color: 'inherit',
                                                textDecoration: 'inherit',
                                            }}
                                        >
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {index +
                                                    1 +
                                                    limit * (currentPage - 1)}
                                            </TableCell>
                                            <TableCell align="center">
                                                {picture.title}
                                            </TableCell>
                                            <TableCell align="right">
                                                {new Date(
                                                    Date.parse(
                                                        picture?.created_at
                                                    )
                                                ).toLocaleDateString()}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <CardActions sx={{ justifyContent: 'center' }}>
                            <Stack spacing={2}>
                                <Pagination
                                    count={count}
                                    page={currentPage}
                                    boundaryCount={1}
                                    onChange={handlePaginationClick}
                                />
                            </Stack>
                        </CardActions>
                    </Card>
                </div>
            </Fragment>
        </Nav>
    );
}
