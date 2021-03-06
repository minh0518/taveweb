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
import Icon from '@mui/material/Icon';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';

import {
    Link,
    useNavigate,
    createSearchParams,
    useSearchParams,
} from 'react-router-dom';

const StyledDiv = styled.div`
    margin: auto;
    width: 70%;
    padding-bottom: 20px;
`;

export default function QnA() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [questions, setQuestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const [search, setSearch] = useState('');
    const [limit, setLimit] = useState(8);
    const [password, setPassword] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('/api/questions/count', { params: { search } })
            .then((response) => {
                const pageCount = Math.ceil(response.data['count'] / limit);

                setCount(pageCount);
                
            });
    }, [limit]);

    useEffect(() => {
        let page = Number(searchParams.get('page'));
        
        page = page ? page : 1;
        console.log(page);
        let skip = (page - 1) * limit;

        setCurrentPage(page);

        axios               ///api/questions?????? get?????? ?????????
                            //????????????????????? skip=0 , limit=8 ??? ???
            .get('/api/questions', { params: { skip, limit } })
            .then((response) => {
                console.log(response.data['questions']);
                setQuestions(response.data['questions']);
            });
    }, [searchParams]);

    const handlePaginationClick = (e, page) => {
        setCurrentPage(page);

        //navigate() ????????? ???????????? parameter ??? ??? ?????? ??????????????? ????????? ????????????, 
        //??? ?????? ??????????????? ????????? parameter???
        navigate({ search: `?${createSearchParams({ page })}` });
        //createSearchParams : ?????????????????? ??????
        //page : 2 ?????????
        // ??????????????? ?????? ????????? ???????????? ?????? .search ????????? ???????????? ? ??? ?????????
    };

    return (
        <StyledDiv>
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
                                        Q&A
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} align={'right'}>
                                    <Button
                                        style={{
                                            boxShadow: 'none',
                                            color: '#0066ff',
                                            backgroundColor: 'white',
                                            fontSize: '15px',
                                        }}
                                        component={Link}
                                        to={`create`}
                                        variant="contained"
                                        endIcon={<AddIcon />}
                                        size={'small'}
                                        color={'inherit'}
                                    >
                                        ?????? ??????
                                    </Button>
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
                                            ??????
                                        </TableCell>
                                        <TableCell width="30%" align="right">
                                            ?????????
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {questions.map((question, index) => (
                                        <TableRow
                                            component={Link}
                                            to={`${question.id}`}
                                            key={question.id}
                                            onClick={(e) => { //??? ????????? ???????????? ??????
                                                const password_check = prompt(
                                                    '??????????????? ???????????????'
                                                );
                                                if (password_check !=question.password) { // ????????? ????????? ???
                                                    if (password_check == null) { // ??????????????? ?????? ????????? ????????? ???
                                                        e.preventDefault();
                                                    } else {                //?????? ????????? ????????? ??????????????? ????????? ?????? ????????? ??????
                                                        alert(
                                                            '??????????????? ???????????????.'
                                                        );
                                                        e.preventDefault();
                                                    }
                                                }
                                            }}
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
                                                {index +    //???????????????(mysql??? ?????? ????????? ???????????? map????????? ?????? ?????? ????????? ????????? ???????????? ?????? 0??? ????????????)
                                                    1 +
                                                    limit * (currentPage - 1)}
                                            </TableCell>
                                            <TableCell align="center">
                                                {question.title}
                                            </TableCell>
                                            <TableCell align="right">
                                                {question.name}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <CardActions sx={{ justifyContent: 'center' }}>
                            <Stack spacing={2}>
                                <Pagination
                                    count={count} //?????? ????????? ?????? ???
                                    page={currentPage} //?????? ?????? ????????? ???????????? ??????
                                    boundaryCount={1}
                                    onChange={handlePaginationClick}
                                    //Pagination ??????????????? ???????????? ????????? ?????? or pageSize??? ?????? ??? ?????? ????????? ??????
                                    //????????? ??? ????????? ???????????? ????????? event??? 
                                    //page(?????? ??????????????? ???????????? ?????? ??????????????? ?????? ????????????)??? ????????? ?????????.
                                    //?????? page??? ??? ????????? page??? ?????????
                                />
                            </Stack>
                        </CardActions>
                    </Card>
                </div>
            </Fragment>
        </StyledDiv>
    );
}
