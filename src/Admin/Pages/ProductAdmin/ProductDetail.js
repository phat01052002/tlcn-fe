import React, { useState } from 'react';
import { ColorModeContext, tokens, useMode } from '../../theme';
import { Avatar, CssBaseline, IconButton, Modal, Stack, ThemeProvider, Typography } from '@mui/material';
import axios from 'axios';
import Topbar from '../../Scenes/Topbar/Topbar';
import SidebarAdmin from '../../Scenes/Sidebar/Sidebar';
import '../../PageAdmin.css';
import { Box, Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { storage } from '../../../setupFirebase/setupFirebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { styleBox } from '../../Scenes/ManageUser/ManageUser';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Image } from '@mui/icons-material';


export default function UserDetail() {
    const { id } = useParams();
    const [theme, colorMode] = useMode();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery('(min-width:600px)');

    const [user, setUser] = useState({
        id: '',
        username: '',
        name: '',
        phone: '',
        image: '',
        role: '',
        address: '',
        status: '',
    });

    const loadUserDetail = async () => {
        try {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `/admin/getUserById/${id}`,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            const respone = (await axios.request(config)).data;
            setUser(respone.object);
            
            console.log(respone);
            console.log('thanhcong');
            console.log(user);
        } catch {
            console.log('thatbai');
        }
    };
    useEffect(() => {
		loadUserDetail();
	}, []);
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app" style={{ display: 'flex', flexDirection: 'row' }}>
                    <SidebarAdmin />
                    <main className="content" style={{ columnWidth: '75vw' }}>
                        <Topbar></Topbar>
                        <Box m="20px">
                            <HeaderAdmin title="CHI TIẾT NGƯỜI DÙNG" subtitle="Xem chi tiết hồ sơ người dùng" />

                            <Box>
                                        <Box
                                            display="grid"
                                            gap="30px"
                                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                            sx={{
                                                '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
                                            }}
                                        >
                                            <TextField
                                                id="outlined-read-only-input"
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Họ và tên"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                value={user.name}
                                                name="name"
                                                sx={{ gridColumn: 'span 2' }}
                                            />
                                            <TextField
                                                id="outlined-read-only-input"
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Số điện thoại"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                value={user.phone}
                                                name="phone"
                                                sx={{ gridColumn: 'span 2' }}
                                            />
                                            
                                            <Avatar sx={{ gridColumn: 'span 2', width:'100px', height:'auto' }} variant='square' src={user.image}></Avatar>
                                            <TextField
                                                id="outlined-read-only-input"
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Tên tài khoản"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                value={user.username}
                                                name="username"
                                                sx={{ gridColumn: 'span 2' }}
                                            />
                                            <TextField
                                                id="outlined-read-only-input"
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Role"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                value={user.role}
                                                name="role"
                                                sx={{ gridColumn: 'span 2' }}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Status"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                value={user.status}
                                                name="status"
                                                sx={{ gridColumn: 'span 2' }}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Địa chỉ"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                value={user.address}
                                                name="address"
                                                sx={{ gridColumn: 'span 4' }}
                                            />
                                        </Box>

                                        <Box display="flex" justifyContent="end" mt="20px" gap="20px">
                                            <IconButton
                                                onClick={() => {
                                                    window.location = '/admin/users';
                                                }}
                                            >
                                                <ArrowBackIcon />
                                            </IconButton>
                                        </Box>
                            </Box>
                        </Box>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}
