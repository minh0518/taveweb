import React from 'react';
import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export default function DatetimeTile({ createdAt, updatedAt }) {
    return (
        <Paper elevation={3} sx={{ minWidth: 275, mb: 1 }}>
            <Grid container>
                <Grid item xs={12} align={'left'} sx={{ p: 1 }}>
                    <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                    >
                        <b>생성시간:</b>{' '}
                        {new Date(Date.parse(createdAt)).toLocaleString()}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                        <b>수정시간:</b>{' '}
                        {new Date(Date.parse(createdAt)).toLocaleString()}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
}
