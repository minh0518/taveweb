import React from 'react';
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

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export default function TitleTile({ title }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Paper elevation={3} sx={{ minWidth: 275 }}>
            <Grid container>
                <Grid item xs={12} align={'left'} sx={{ p: 1 }}>
                    <Typography
                        sx={{ fontSize: 16, mb: 2 }}
                        color="text.secondary"
                        gutterBottom
                    >
                        제목
                    </Typography>
                    <FormControl fullWidth>
                        <TextField
                            id="outlined-basic"
                            label="제목을 입력하세요."
                            variant="outlined"
                        />
                    </FormControl>
                </Grid>
            </Grid>
        </Paper>
    );
}
