import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import Dropzone from 'react-dropzone';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export default function CreateImageTile({ imageForm, onChange, onRemove }) {
    return (
        <Paper elevation={3} sx={{ minWidth: 275 }}>
            <Grid container>
                <Grid item xs={10} align={'left'} sx={{ p: 1 }}>
                    <Typography
                        sx={{ fontSize: 16 }}
                        color="text.secondary"
                        gutterBottom
                    >
                        이미지 등록
                    </Typography>
                </Grid>
                <Grid item xs={2} align={'right'}>
                    <IconButton
                        aria-label="Example"
                        onClick={() => {
                            onRemove(imageForm.id);
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    {/* <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls="long-menu"
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem
                            onClick={() => {
                                setAnchorEl(null);
                                onRemove(imageForm.id);
                            }}
                        >
                            삭제
                        </MenuItem>
                    </Menu> */}
                </Grid>
                <Grid item xs={12} align={'left'} sx={{ p: 1 }}>
                    <Dropzone
                        onDrop={(acceptedFiles) => console.log(acceptedFiles)}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p>
                                        Drag 'n' drop some files here, or click
                                        to select files
                                    </p>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                </Grid>
                <Grid item xs={12} align={'left'} sx={{ p: 1 }}>
                    <Typography
                        sx={{ fontSize: 16 }}
                        color="text.secondary"
                        gutterBottom
                    >
                        이미지 설명
                    </Typography>
                </Grid>
                <Grid item xs={12} align={'left'} sx={{ p: 1 }}>
                    <FormControl fullWidth>
                        <TextField
                            id="outlined-basic"
                            value={imageForm.image_description}
                            onChange={(e) => {
                                onChange(imageForm.id, e.currentTarget.value);
                            }}
                            label="이미지에 대한 설명을 입력하세요."
                            variant="outlined"
                            multiline
                            rows={5}
                        />
                    </FormControl>
                </Grid>
            </Grid>
        </Paper>
    );
}
