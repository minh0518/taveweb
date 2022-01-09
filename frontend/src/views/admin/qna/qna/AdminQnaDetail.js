import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

import TitleTile from '../../utils/tiles/TitleTile';
import DatetimeTile from '../../utils/newTiles/DatetimeTile';
import { useConfirm } from '../../utils/alert/confirm';
import QuestionTile from '../../utils/tiles/QnAQuestionTile';
import AnswerTile from '../../utils/tiles/AnswerTile';

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
    const [answerid, setAnswerid] = useState({});

    useEffect(() => {
        axios.get(`/api/questions/${id}`).then((response) => {
            console.log('response', response.data);
            setQuestion(response.data['question']);
            if (response.data['question'].Answers[0]) {
                setAnswerid(response.data['question'].Answers[0]?.id);
            } else {
                setAnswerid(-1);
                console.log('답변이 없습니다.');
            }
        });
    }, [id]);

    const handleAnswer = async (newAnswer) => {
        if (answerid == -1) {
            const response = await axios.post(`/api/answers/${answerid}`, {
                content: newAnswer,
                question_id: id,
            });
            setAnswer({
                content: response.data['content'],
            });
        } else {
            const response = await axios.patch(`/api/answers/${answerid}`, {
                content: newAnswer,
            });
            setAnswer({
                content: response.data['content'],
            });
        }
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
                <AnswerTile
                    answer={question.Answers}
                    handleAnswer={handleAnswer}
                />
            </Grid>
            <Button
                variant="contained"
                color="error"
                endIcon={<DeleteForeverIcon />}
                onClick={confirmDelete}
            >
                답변 삭제
            </Button>
        </Fragment>
    );
}
