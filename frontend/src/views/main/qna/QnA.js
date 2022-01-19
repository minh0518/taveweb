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
            //현재 내 qna갯수들이 백엔드에 "count": (갯수) 로 저장돼있음
            .then((response) => {
                const pageCount = Math.ceil(response.data['count'] / limit);
                                        // "count": 11 처럼 문자열로 키값이 들어가있으므로
                                        //대괄호 표기법으로 접근

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
                console.log(response.data['questions']);
                setQuestions(response.data['questions']);
            });
    }, [searchParams]);

    const handlePaginationClick = (e, page) => {
        setCurrentPage(page);

        navigate({ search: `?${createSearchParams({ page })}` });
        //createSearchParams : 쿼리스트링을 만듦
        //page : 2 들어감
        // 쿼리스트링 형식 그대로 넣어주기 위해 .search 부분에 들어가는 ? 도 적어줌
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
                                        질문 작성
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
                                            제목
                                        </TableCell>
                                        <TableCell width="30%" align="right">
                                            작성자
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {questions.map((question, index) => (
                                        <TableRow
                                            component={Link}
                                            to={`${question.id}`}
                                            key={question.id}
                                            onClick={(e) => { //각 질문들 클릭하면 발생
                                                const password_check = prompt(
                                                    '비밀번호를 입력하세요'
                                                );
                                                if (password_check !=question.password) { // 비번이 틀렸을 때
                                                    if (password_check == null) { // 공백일때는 그냥 이벤트 막기만 함
                                                        e.preventDefault();
                                                    } else {                //진짜 비번을 틀리게 입력한거면 경고창 뜨고 이벤트 막기
                                                        alert(
                                                            '비밀번호가 틀렸습니다.'
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
                                                {index +    //질문번호들(mysql에 있는 번호와 상관없이 map돌면서 얻게 되는 번호들 첫번째 질문이면 그냥 0이 되는것임)
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
        </StyledDiv>
    );
}
