import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import TitleTile from '../../utils/tiles/TitleTile';
import ContentTile from '../../utils/tiles/ContentTile';
import ImageTile from '../../utils/tiles/ImageTile';
import DatetimeTile from '../../utils/tiles/DatetimeTile';
import { useConfirm } from '../../utils/alert/confirm';
import QuestionTile from '../../utils/tiles/QuestionTile';
import AnswerTile from '../../utils/tiles/AnswerTile';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

import {
    Link,
    useParams,
    useNavigate,
    createSearchParams,
    useSearchParams,
} from 'react-router-dom';

export default function AdminQnaDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [question, setQuestion] = useState({});
    const [answer, setAnswer] = useState({});
    const [answerform, setAnswerform] = useState({});

    useEffect(() => {
        axios.get(`/api/questions/${id}`).then((response) => {
            console.log('response', response.data);
            setQuestion(response.data['question']);
        });
    }, [id]);

    const handleAddAnswer = (e) => {
        setAnswerform(!answerform);
    };

    const deleteConfirm = async () => {
        console.log('삭제했습니다.');
        try {
            const response = await axios.delete(`/api/answers/${id}`);
            console.log(response.data);
        } catch (e) {
            console.log(e);
        }
        navigate(-1);
    };
    const cancelConfirm = () => {
        console.log('취소했습니다.');
    };

    const confirmDelete = useConfirm(
        '삭제하시겠습니까?',
        deleteConfirm,
        cancelConfirm
    );

    const handleChangeAnswer = (e) => {
        setAnswer(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            content: answer,
            question_id: id,
        };

        console.log(answer);

        axios
            .post(`/api/answers`, data, {
                body: {
                    'Content-Type': 'application/json',
                },
            })
            .then(function (response) {
                console.log(response, '성공');
                alert('작성 완료');
                navigate(`/admin/qna`);
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    return (
        <Fragment>
            <Grid item xs={12} align={'right'} sx={{ mb: 1 }}></Grid>
            <DatetimeTile
                createdAt={question?.created_at}
                updatedAt={question?.updated_at}
            />
            <TitleTile title={question.title} />
            <QuestionTile question={question.content} />
            <Grid>
                <AnswerTile answer={question.Answers} />
                {!answerform && (
                    <FormControl fullWidth>
                        <TextField
                            id="outlined-basic"
                            label="답변을 입력하세요."
                            variant="outlined"
                            value={answer}
                            onChange={handleChangeAnswer}
                        />
                    </FormControl>
                )}
                <br />
            </Grid>
            <Grid>
                <Button
                    //component={Link}
                    //to={`create`}
                    variant="contained"
                    endIcon={<AddIcon />}
                    onClick={handleAddAnswer}
                >
                    답변 작성
                </Button>
                &nbsp;
                <Button
                    //component={Link}
                    //to={`create`}
                    variant="contained"
                    endIcon={<AddIcon />}
                    onClick={handleSubmit}
                >
                    답변 저장
                </Button>
                &nbsp;
                <Button
                    variant="contained"
                    color="error"
                    endIcon={<DeleteForeverIcon />}
                    onClick={confirmDelete}
                >
                    답변 삭제
                </Button>
            </Grid>
            <Grid></Grid>
        </Fragment>
    );
}
