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

export default function Review() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [reviews, setReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const [search, setSearch] = useState('');
    const [limit, setLimit] = useState(8);

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('/api/activity/review/count', { params: { search } }) //api백엔드에는 현재7개
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
            .get('/api/activity/review', { params: { skip, limit } })
            .then((response) => {
                console.log(response.data);
                setReviews(response.data['activity_review']);
            });
    }, [searchParams]);

    const handlePaginationClick = (e, page) => {
        setCurrentPage(page);

        navigate({ search: `?${createSearchParams({ page })}` });
        //createSearchParams : 쿼리스트링을 만듦
        //page : 2 들어감
    };

    const Nav = styled.nav`
    margin:auto;
    width:70%;
    padding-bottom:20px;
`;

    return (
        <Nav>
        <Fragment>
            <Card elevation={3} sx={{ minWidth: 275 }}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Typography
                                align="left"
                                variant="h5"
                                component="div"
                                color="primary"
                            >
                                활동 후기 게시판
                                <Typography
                                    sx={{ fontSize: 14 }}
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    Page: {currentPage}
                                </Typography>
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <TableContainer component={Paper} elevation={0}>
                    <Table sx={{ minWidth: 275 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="right">제목</TableCell>
                                <TableCell align="right">작성일자</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reviews.map((review) => (
                                <TableRow
                                    component={Link}
                                    to={`${review.id}`}
                                    key={review.id}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                        color: 'inherit',
                                        textDecoration: 'inherit',
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {review.id}
                                    </TableCell>
                                    <TableCell align="right">
                                        {review.title}
                                    </TableCell>
                                    <TableCell align="right">
                                        {new Date(
                                            Date.parse(review?.created_at)
                                        ).toLocaleString()}
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
        </Fragment>
        </Nav>
    );
}
