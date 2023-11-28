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


export default function CategoryDetail() {
    const { id } = useParams();
    const [theme, colorMode] = useMode();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery('(min-width:600px)');

    const [category, setCategory] = useState({
        name: '',
        image: '',
        numberProduct: '',
    });

    const loadCategoryDetail = async () => {
        try {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `/admin/getCategoryById/${id}`,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            const respone = (await axios.request(config)).data;
            setCategory(respone.object);
            
            console.log(respone);
            console.log('thanhcong');
            console.log(category);
        } catch {
            console.log('thatbai');
        }
    };
    useEffect(() => {
		loadCategoryDetail();
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
                            <HeaderAdmin title="CHI TIẾT LOẠI SẢN PHẨM" subtitle="Xem chi tiết thông tin loại sản phẩm" />

                            <Box>
                                        <Box
                                            display="grid"
                                            gap="20px"
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
                                                label="Tên sản phẩm"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                value={category.name}
                                                name="name"
                                                sx={{ gridColumn: 'span 4' }}
                                            />
                                            
                                            <Avatar sx={{ gridColumn: 'span 2', width:'100px', height:'auto' }} variant='square' src={category.image}></Avatar>
                                            <TextField
                                                id="outlined-read-only-input"
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Số lượng sản phẩm phụ thuộc"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                value={category.numberProduct}
                                                name="numberProduct"
                                                sx={{ gridColumn: 'span 4' }}
                                            />
                                            <Box sx={{ gridColumn: '4' }} display="flex" justifyContent="end" mt="20px" gap="20px">
                                            <IconButton size='large'
                                                onClick={() => {
                                                    window.location = '/admin/categories';
                                                }}
                                            >
                                                
                                                <ArrowBackIcon />
                                            </IconButton>
                                        </Box>
                                        </Box>       
                            </Box>
                        </Box>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}
