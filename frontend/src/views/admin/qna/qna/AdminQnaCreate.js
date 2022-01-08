// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// import Button from '@mui/material/Button';
// import AddIcon from '@mui/icons-material/Add';
// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
// import Typography from '@mui/material/Typography';
// import TextField from '@mui/material/TextField';
// import FormControl from '@mui/material/FormControl';

// const AdminQnaCreate = () => {
//     const navigate = useNavigate();
//     const [answer, setAnswer] = useState('');

//     const nextId = useRef(1);

//     const handleChangeAnswer = (e) => {
//         setAnswer(e.target.value);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const data = {
//             content: answer,
//             question_id: '',
//         };

//         console.log(answer);

//         axios
//             .post(`/api/answers`, data, {
//                 body: {
//                     'Content-Type': 'application/json',
//                 },
//             })
//             .then(function (response) {
//                 console.log(response, '성공');
//                 alert('작성 완료');
//                 navigate(`/admin/qna`);
//             })
//             .catch(function (err) {
//                 console.log(err);
//             });
//     };

//     return (
//         <Grid container spacing={2}>
//             <Grid item xs={12} align={'right'}>
//                 <Button
//                     variant="contained"
//                     endIcon={<AddIcon />}
//                     onClick={handleSubmit}
//                 >
//                     저장
//                 </Button>
//             </Grid>
//             <Grid item xs={12}>
//                 <Paper elevation={3} sx={{ minWidth: 275 }}>
//                     <Grid item xs={12} align={'left'} sx={{ p: 1 }}>
//                         <Typography
//                             sx={{ fontSize: 16, mb: 2 }}
//                             color="text.secondary"
//                             gutterBottom
//                         >
//                             답변
//                         </Typography>
//                         <FormControl fullWidth>
//                             <TextField
//                                 id="outlined-basic"
//                                 label="제목을 입력하세요."
//                                 variant="outlined"
//                                 value={answer}
//                                 onChange={handleChangeAnswer}
//                             />
//                         </FormControl>
//                     </Grid>
//                 </Paper>
//             </Grid>
//         </Grid>
//     );
// };

// export default AdminQnaCreate;
