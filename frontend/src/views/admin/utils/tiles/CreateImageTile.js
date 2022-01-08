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
// import Dropzone from 'react-dropzone';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Card from '@mui/material/Card';

export default function CreateImageTile({
    imageForm,
    onChangeImage,
    onChangeImageName,
    onChangeImageDesc,
    onRemove,
}) {
    const [image, setImage] = useState(null);
    const [thumbnail, setThumbnail] = useState('');

    const handleChangeImage = (e) => {
        const { id } = imageForm;
        const { files } = e.target;

        console.log(files);
        console.log(files[0].name);
        files[0]['id'] = imageForm.id;

        setImage(files[0]);
        setThumbnail(URL.createObjectURL(files[0]));
        onChangeImage(id, files[0]);
        onChangeImageName(id, files[0].name);
    };

    const handleDeleteThumbnail = () => {
        URL.revokeObjectURL(thumbnail);
        setThumbnail('');
    };

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
                            onRemove(imageForm.id, image);
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Grid>
                <Grid item xs={12} align={'center'} sx={{ p: 1 }}>
                    {thumbnail ? (
                        <Card elevation={1} sx={{ textAlign: 'center', p: 1 }}>
                            <ImageListItem>
                                <img
                                    src={thumbnail}
                                    alt={thumbnail}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        </Card>
                    ) : (
                        <></>
                    )}
                </Grid>
                <Grid item xs={12} align={'left'} sx={{ p: 1 }}>
                    <input
                        type="file"
                        name="images"
                        accept="image/*"
                        onChange={handleChangeImage}
                    />
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
                                onChangeImageDesc(
                                    imageForm.id,
                                    e.currentTarget.value
                                );
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
