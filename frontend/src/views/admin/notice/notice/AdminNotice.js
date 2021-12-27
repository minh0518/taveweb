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

import {
    Link,
    useNavigate,
    createSearchParams,
    useSearchParams,
} from 'react-router-dom';

export default function AdminNotice() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [notices, setNotices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const [search, setSearch] = useState('');
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(5);

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('/api/notices/count', { params: { search } })
            .then((response) => {
                const pageCount = Math.ceil(response.data['count'] / limit);

                setCount(pageCount);
            });
    }, [count]);

    useEffect(() => {
        axios
            .get('/api/notices', { params: { skip, limit } })
            .then((response) => {
                // console.log('response', response);
                // console.log('response', response.data);
                setNotices(response.data['notices']);
            });
    }, [skip, limit]);

    useEffect(() => {
        let page = Number(searchParams.get('page'));
        page = page ? page : 1;
        console.log(page);
        let skip = (page - 1) * limit;

        setSkip(skip);
        setCurrentPage(page);
    }, [searchParams]);

    const handlePaginationClick = (e, page) => {
        setCurrentPage(page);

        navigate({
            search: `?${createSearchParams({
                page,
            })}`,
        });
    };

    return (
        <Fragment>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography align="left" variant="h5" component="div">
                        공지사항
                        <Typography
                            sx={{ fontSize: 14 }}
                            color="text.secondary"
                            gutterBottom
                        >
                            Page: {currentPage}
                        </Typography>
                    </Typography>
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
                            {notices.map((notice) => (
                                <TableRow
                                    component={Link}
                                    to={`${notice.id}`}
                                    key={notice.id}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                        color: 'inherit',
                                        textDecoration: 'inherit',
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {notice.id}
                                    </TableCell>
                                    <TableCell align="right">
                                        {notice.title}
                                    </TableCell>
                                    <TableCell align="right">
                                        {notice.created_at}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <CardActions>
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
