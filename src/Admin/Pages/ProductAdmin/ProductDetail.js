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


export default function ProductDetail() {
    const { id } = useParams();
    const [theme, colorMode] = useMode();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery('(min-width:600px)');

    const [product, setProduct] = useState({
        name: '',
        price: '',
        image: '',
        description: '',
        material: '',
        quantity: '',
        size: '',
        categoryName: '',
        percentDiscount: '',
        numberRating: '',
        numberFavorite: '',
        status: '',
        numberProductSold: '',
    });

    const loadProductDetail = async () => {
        try {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `/admin/getProductById/${id}`,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            const respone = (await axios.request(config)).data;
            setProduct(respone.object);
            
            console.log(respone);
            console.log('thanhcong');
            console.log(product);
        } catch {
            console.log('thatbai');
        }
    };
    useEffect(() => {
		loadProductDetail();
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
                            <HeaderAdmin title="CHI TIẾT SẢN PHẨM" subtitle="Xem chi tiết thông tin sản phẩm" />

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
                                                value={product.name}
                                                name="name"
                                                sx={{ gridColumn: 'span 2' }}
                                            />
                                            <TextField
                                                id="outlined-read-only-input"
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Loại sản phẩm"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                value={product.categoryName}
                                                name="categoryName"
                                                sx={{ gridColumn: 'span 1' }}
                                            />

                                            <TextField
                                                id="outlined-read-only-input"
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Trạng thái"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                value={product.status}
                                                name="status"
                                                sx={{ gridColumn: 'span 1' }}
                                            />
                                            
                                            <Avatar sx={{ gridColumn: 'span 1', width:'100px', height:'auto' }} variant='square' src={product.image}></Avatar>
                                            
                                            
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Giá"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                value={product.price}
                                                name="price"
                                                sx={{ gridColumn: 'span 1' }}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Số lượng"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                value={product.quantity}
                                                name="quantity"
                                                sx={{ gridColumn: 'span 1' }}
                                            />

                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Kích thước"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                value={product.size}
                                                name="size"
                                                sx={{ gridColumn: 'span 1' }}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Mô tả"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                value={product.description}
                                                name="description"
                                                sx={{ gridColumn: 'span 2' }}
                                            />
                                            
                                            
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Nguyên liệu"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                value={product.material}
                                                name="material"
                                                sx={{ gridColumn: 'span 2' }}
                                            />
                                            
                                            
                                            
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Giảm giá"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                value={`${product.percentDiscount*100}%`}
                                                name="percentDiscount"
                                                sx={{ gridColumn: 'span 1' }}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Số lượng đã bán"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                value={product.numberProductSold}
                                                name="numberProductSold"
                                                sx={{ gridColumn: 'span 1' }}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Số lượt thích"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                value={product.numberFavorite}
                                                name="numberFavorite"
                                                sx={{ gridColumn: 'span 1' }}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Số lượt đánh giá"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                value={product.numberRating}
                                                name="numberRating"
                                                sx={{ gridColumn: 'span 1' }}
                                            />
                                            <Box sx={{ gridColumn: '4' }} display="flex" justifyContent="end" mt="20px" gap="20px">
                                            <IconButton size='large'
                                                onClick={() => {
                                                    window.location = '/admin/products';
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
