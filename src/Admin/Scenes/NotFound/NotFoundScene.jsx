import React from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const NotFoundScene = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box m="20px 20px 20px 20px">
            <HeaderAdmin title="NỘI DUNG KHÔNG ĐƯỢC TÌM THẤY" />
            <IconButton
                size="large"
                onClick={() => {
                    window.location = '/admin';
                }}
            >
                <ArrowBackIcon />
            </IconButton>
        </Box>
    );
};
export default NotFoundScene;
