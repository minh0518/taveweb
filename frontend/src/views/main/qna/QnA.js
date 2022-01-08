import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

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

export default function QnA() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [questions, setQuestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const [search, setSearch] = useState('');
    const [limit, setLimit] = useState(8);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/questions', { params: { search } }).then((response) => {
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
            .get('/api/questions', { params: { skip, limit } })
            .then((response) => {
                console.log(response.data);
                setQuestions(response.data['questions']);
            });
    }, [searchParams]);

    const handlePaginationClick = (e, page) => {
        setCurrentPage(page);

        navigate({ search: `?${createSearchParams({ page })}` });
        //createSearchParams : 쿼리스트링을 만듦
        //page : 2 들어감
    };

    return (
        <Fragment>
            <Card elevation={3} sx={{ minWidth: 275 }}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Typography
                                align="left"
                                variant="h5"
                                component="div"
                            >
                                Q&A
                                <Typography
                                    sx={{ fontSize: 14 }}
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    Page: {currentPage}
                                </Typography>
                            </Typography>
                        </Grid>
                        <Grid item xs={4} align={'right'}>
                            <Button
                                component={Link}
                                to={`create`}
                                variant="contained"
                                endIcon={<AddIcon />}
                            >
                                질문 작성하기
                            </Button>
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
                            {questions.map((question) => (
                                <TableRow
                                    component={Link}
                                    to={`${question.id}`}
                                    key={question.id}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                        color: 'inherit',
                                        textDecoration: 'inherit',
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {question.id}
                                    </TableCell>
                                    <TableCell align="right">
                                        {question.title}
                                    </TableCell>
                                    <TableCell align="right">
                                        {new Date(
                                            Date.parse(question?.created_at)
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
    );
}
