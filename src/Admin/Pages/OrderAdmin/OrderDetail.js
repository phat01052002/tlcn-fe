import React, { useState } from 'react';
import { ColorModeContext, tokens, useMode } from '../../theme';
import { Avatar, CssBaseline, IconButton, Modal, Stack, ThemeProvider, Typography } from '@mui/material';
import axios from 'axios';
import Topbar from '../../Scenes/Topbar/Topbar';
import SidebarAdmin from '../../Scenes/Sidebar/Sidebar';
import '../../PageAdmin.css';
import { Box, Button, TextField } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';


export default function OrderDetail() {
    const { id } = useParams();
    const [theme, colorMode] = useMode();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery('(min-width:600px)');

    const [order, setOrder] = useState({
        orderId: '',
        date: '',
        dateUpdate: '',
        paid: '',
        nowDelivery: '',
        productId: '',
        productName: '',
        imageProduct: '',
        productPrice: '',
        total: '',
        userName: '',
        colorProduct: '',
    });

    const loadOrderDetail = async () => {
        try {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `/admin/getOrderById/${id}`,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            const respone = (await axios.request(config)).data;
            setOrder(respone.object);
            
            console.log(respone);
            console.log('thanhcong');
            console.log(order);
        } catch {
            console.log('thatbai');
        }
    };
    useEffect(() => {
		loadOrderDetail();
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
                            <HeaderAdmin title="CHI TIẾT ĐƠN HÀNG" subtitle="Xem chi tiết thông tin đơn hàng" />

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
                                                label="ID đơn hàng"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                value={order.orderId}
                                                name="orderId"
                                                sx={{ gridColumn: 'span 1' }}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Người mua"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                value={order.userName}
                                                name="userName"
                                                sx={{ gridColumn: 'span 1' }}
                                            />
                                            <TextField
                                                id="outlined-read-only-input"
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Thời gian đặt hàng"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                value={order.date}
                                                name="date"
                                                sx={{ gridColumn: 'span 2' }}
                                            />
                                            <TextField
                                                id="outlined-read-only-input"
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="ID sản phẩm"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                value={order.productId}
                                                name="productId"
                                                sx={{ gridColumn: 'span 1' }}
                                            />
                                            <TextField
                                                id="outlined-read-only-input"
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Tên sản phẩm"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                value={order.productName}
                                                name="productName"
                                                sx={{ gridColumn: 'span 1' }}
                                            />
                                            <Avatar sx={{ gridColumn: 'span 1', width:'100px', height:'auto' }} variant='square' src={order.imageProduct}></Avatar>
                                            
                                            
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Giá sản phẩm"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                value={order.productPrice}
                                                name="productPrice"
                                                sx={{ gridColumn: 'span 1' }}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Màu sản phẩm"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                value={order.colorProduct}
                                                name="colorProduct"
                                                sx={{ gridColumn: 'span 1' }}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Thanh toán"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                value={order.paid === true && "Đã thanh toán" ||"Chưa thanh toán" }
                                                name="paid"
                                                sx={{ gridColumn: 'span 1' }}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Vận chuyển nhanh"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                value={order.nowDelivery === true && "Có" ||"Không"}
                                                name="nowDelivery"
                                                sx={{ gridColumn: 'span 1' }}
                                            />
                                            <TextField
                                                
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Trạng thái đơn hàng"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                value={order.state === "processing" && "Đang chờ xử lý" ||
                                                order.state === "processed" && "Đã xử lý" ||
                                                order.state === "delivering" && "Đang vận chuyển" ||
                                                order.state === "delivered" && "Đã giao" ||
                                                order.state === "canceled" && "Đã hủy"
                                            }
                                                name="state"
                                                sx={{ gridColumn: 'span 1' }}
                                            />
                                        
                                            
                                            
                                            
                                            <Box sx={{ gridColumn: '4' }} display="flex" justifyContent="end" mt="20px" gap="20px">
                                            <IconButton size='large'
                                                onClick={() => {
                                                    window.location = '/admin/orders';
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
