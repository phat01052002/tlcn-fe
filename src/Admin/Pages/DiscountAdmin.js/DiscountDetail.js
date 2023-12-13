import React, { useState } from 'react';
import { ColorModeContext, tokens, useMode } from '../../theme';
import { Avatar, CssBaseline, IconButton, ThemeProvider } from '@mui/material';
import axios from 'axios';
import Topbar from '../../Scenes/Topbar/Topbar';
import SidebarAdmin from '../../Scenes/Sidebar/Sidebar';
import '../../PageAdmin.css';
import { Box, TextField } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';


export default function DiscountDetail() {
    const { id } = useParams();
    const [theme, colorMode] = useMode();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery('(min-width:600px)');

    const [discount, setDiscount] = useState({
        discountId: '',
        discountName: '',
        percentDiscount: '',
        numberProduct: '',
    });

    const loadDiscountDetail = async () => {
        try {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `/admin/getDiscountById/${id}`,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            const respone = (await axios.request(config)).data;
            setDiscount(respone.object);
            
            console.log(respone);
            console.log('thanhcong');
            console.log(discount);
        } catch {
            console.log('thatbai');
        }
    };
    useEffect(() => {
		loadDiscountDetail();
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
                                                label="Tên giảm giá"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                value={discount.discountName}
                                                name="discountName"
                                                sx={{ gridColumn: 'span 4' }}
                                            />
                                            
                                            <TextField
                                                id="outlined-read-only-input"
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Tỷ lệ giảm giá"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                value={discount.percentDiscount}
                                                name="percentDiscount"
                                                sx={{ gridColumn: 'span 4' }}
                                            />
                                            
                                            <TextField
                                                id="outlined-read-only-input"
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Số lượng sản phẩm"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                value={discount.numberProduct}
                                                name="numberProduct"
                                                sx={{ gridColumn: 'span 4' }}
                                            />
                                            <Box sx={{ gridColumn: '4' }} display="flex" justifyContent="end" mt="20px" gap="20px">
                                            <IconButton size='large'
                                                onClick={() => {
                                                    window.location = '/admin/discounts';
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
