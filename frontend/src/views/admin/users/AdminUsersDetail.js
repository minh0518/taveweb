import React, { Fragment, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';

import TitleTile from '../utils/newTiles/TitleTile';
import ContentTile from '../utils/newTiles/ContentTile';
import ImageTile from '../utils/newTiles/ImageTile';
import DatetimeTile from '../utils/newTiles/DatetimeTile';
import { useConfirm } from '../utils/alert/confirm';

const bcrypt = require('bcryptjs');

export default function AdminUsersDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [users, setUsers] = useState({});
    const [role, setRole] = useState({});
    const [password, setPassword] = useState({});
    const [masterpassword, setMasterpassword] = useState({});

    useEffect(() => {
        axios.get(`/api/users/${id}`).then((response) => {
            console.log('response', response);
            console.log('response', response.data);
            setUsers(response.data['user']);
            setPassword(response.data['user'].password);
        });
    }, [id]);

    const handleName = async (newName) => {
        const input_password = prompt('비밀번호를 입력하세요');
        const check = await bcrypt.compare(input_password, password);
        if (check == true) {
            const response = await axios.patch(`/api/users/${id}`, {
                name: newName,
            });
            setUsers({
                ...users,
                name: response.data['name'],
            });
        } else {
            alert('비밀번호가 틀렸습니다.');
        }
    };

    const handleEmail = async (newEmail) => {
        const response = await axios.patch(`/api/users/${id}`, {
            email: newEmail,
        });

        setUsers({
            ...users,
            content: response.data['email'],
        });
    };

    const handleRole = async (e) => {
        // const master = await axios.get(`/api/users/master`).then((response) => {
        //     console.log('response', response);
        //     console.log('response', response.data);
        //     setMasterpassword(response.data['user'].password);
        // });
        const masterpassword = 'tave123';
        const password_check = prompt('master 비밀번호를 입력하세요');
        if (password_check != masterpassword) {
            alert('비밀번호가 틀렸습니다.');
            e.preventDefault();
        } else {
            const newRole = e.target.value;
            const response = await axios.patch(`/api/users/${id}`, {
                role: newRole,
            });
            console.log('role:' + response.data['role']);
            setUsers({
                ...users,
                role: response.data['role'],
            });
            console.log(users);
        }
    };

    function Tile({ value, handleValue }) {
        const [anchorEl, setAnchorEl] = useState(null);
        const open = Boolean(anchorEl);

        const [edit, setEdit] = useState(false);

        const [newValue, setNewValue] = useState(value);

        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
            setAnchorEl(null);
        };

        const handleToggleEdit = () => {
            setAnchorEl(null);

            setEdit(!edit);
        };

        const handleChange = (e) => {
            setNewValue(e.target.value);
        };

        const handleSubmit = () => {
            setEdit(!edit);

            handleValue(newValue);
        };

        const handleCancel = () => {
            setEdit(!edit);
        };
        return (
            <Paper elevation={3} sx={{ minWidth: 275, mb: 1 }}>
                <Grid container>
                    <Grid item xs={10} align={'left'} sx={{ p: 1 }}>
                        {edit ? (
                            <>
                                <Grid item xs={12} sx={{ mb: 1 }}>
                                    <FormControl fullWidth>
                                        <TextField
                                            multiline
                                            rows={4}
                                            defaultValue={value}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sx={{ mb: 1 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{ mr: 1 }}
                                        onClick={handleSubmit}
                                    >
                                        저장
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={handleCancel}
                                    >
                                        취소
                                    </Button>
                                </Grid>
                            </>
                        ) : (
                            <Typography variant="h5" component="div">
                                {value}
                            </Typography>
                        )}
                    </Grid>
                    <Grid item xs={2} align={'right'}>
                        {edit ? (
                            <></>
                        ) : (
                            <IconButton
                                aria-label="more"
                                id="long-button"
                                aria-controls="long-menu"
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={handleClick}
                            >
                                <MoreVertIcon />
                            </IconButton>
                        )}
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleToggleEdit}>수정</MenuItem>
                        </Menu>
                    </Grid>
                </Grid>
            </Paper>
        );
    }

    const deleteConfirm = async () => {
        console.log('삭제했습니다.');
        try {
            const response = await axios.delete(`/api/users/${id}`);
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
            <Grid item xs={12} align={'right'} sx={{ mb: 1 }}>
                <Button
                    variant="contained"
                    color="error"
                    endIcon={<DeleteForeverIcon />}
                    onClick={confirmDelete}
                >
                    삭제
                </Button>
            </Grid>
            <DatetimeTile
                createdAt={users?.created_at}
                updatedAt={users?.updated_at}
            />
            <Tile value={users.name} handleValue={handleName} />
            <Tile value={users.email} handleValue={handleEmail} />
            {/* <Tile value={users.role} handleValue={handleRole} /> */}
            <div className="App">
                <input
                    id="noraml"
                    value="normal"
                    name="platform"
                    type="radio"
                    checked={users.role === 'normal'}
                    onChange={handleRole}
                />
                normal
                <input
                    id="chairman"
                    value="chairman"
                    name="platform"
                    type="radio"
                    checked={users.role === 'chairman'}
                    onChange={handleRole}
                />
                회장
                <input
                    id="business-head"
                    value="business-head"
                    name="platform"
                    type="radio"
                    checked={users.role === 'business-head'}
                    onChange={handleRole}
                />
                경영처장
                <input
                    id="tech-head"
                    value="tech-head"
                    name="platform"
                    type="radio"
                    checked={users.role === 'tech-head'}
                    onChange={handleRole}
                />
                기술처장
                <input
                    id="accounting"
                    value="accounting"
                    name="platform"
                    type="radio"
                    checked={users.role === 'accounting'}
                    onChange={handleRole}
                />
                회계
                <input
                    id="pr"
                    value="pr"
                    name="platform"
                    type="radio"
                    checked={users.role === 'pr'}
                    onChange={handleRole}
                />
                홍보
                <input
                    id="tech"
                    value="tech"
                    name="platform"
                    type="radio"
                    checked={users.role === 'tech'}
                    onChange={handleRole}
                />
                기술
            </div>
        </Fragment>
    );
}
