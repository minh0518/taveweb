// import React, { Fragment } from 'react';

// import Button from '@mui/material/Button';
// import DeleteIcon from '@mui/icons-material/Delete';
// import SendIcon from '@mui/icons-material/Send';
// import Stack from '@mui/material/Stack';

// import { Link } from 'react-router-dom';

// const AdminNotice = () => {
//     return (
//         <Fragment>
//             <p>공지사항</p>
//             <Stack direction="row" spacing={2}>
//                 <Button variant="outlined" startIcon={<DeleteIcon />}>
//                     Delete
//                 </Button>
//                 <Link
//                     to="new"
//                     style={{
//                         color: 'inherit',
//                         textDecoration: 'inherit',
//                     }}
//                 >
//                     <Button variant="contained" endIcon={<SendIcon />}>
//                         Send
//                     </Button>
//                 </Link>
//             </Stack>
//         </Fragment>
//     );
// };

// export default AdminNotice;

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

import { Link } from 'react-router-dom';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('햄버거', 159, 6.0, 24, 4.0),
    createData('치킨', 237, 9.0, 37, 4.3),
    createData('피자', 262, 16.0, 24, 6.0),
    createData('족발', 305, 3.7, 67, 4.3),
    createData('초밥', 356, 16.0, 49, 3.9),
    createData('짜장면', 159, 6.0, 24, 4.0),
    createData('짬뽕', 237, 9.0, 37, 4.3),
    createData('볶음밥', 262, 16.0, 24, 6.0),
    createData('라조기', 305, 3.7, 67, 4.3),
    createData('취두부', 356, 16.0, 49, 3.9),
    createData('깐풍기', 356, 16.0, 49, 3.9),
];

export default function AdminNotice() {
    const [currentPage, setCurrentPage] = useState(1);
    // let currentPage = 1;
    const [notices, setNotices] = useState(rows.slice(0, 5));

    useEffect(() => {
        axios.get('/api/notices').then((response) => {
            console.log('response', response);
            console.log('response', response.data);
            setNotices(response.data['notices']);
        });
    }, []);

    const getLength = () => {
        let count = Math.floor(rows.length / 5);
        if (rows.length % 5 !== 0) count++;

        return count;
    };

    const handlePaginationClick = (e, page) => {
        setCurrentPage(page);
        /* 
        1. skip: 0, limit: 5 - 1
        2. skip: 5, limit: 10 - 1
        2. skip: 10, limit: 15 - 1
        */
        let skip = (page - 1) * 5;
        let limit = page * 5;
        setNotices(rows.slice(skip, limit));
        console.log(page);
    };

    return (
        <Fragment>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography align="left" variant="h5" component="div">
                        공지사항 {currentPage}
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
                            {/* {notices.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.calories}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.fat}
                                    </TableCell>
                                </TableRow>
                            ))} */}
                            {notices.map((notice) => (
                                <TableRow
                                    component={Link}
                                    key={notice.id}
                                    to={`${notice.id}`}
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
                            count={getLength()}
                            variant="outlined"
                            onChange={handlePaginationClick}
                        />
                    </Stack>
                </CardActions>
            </Card>
        </Fragment>
    );
}
