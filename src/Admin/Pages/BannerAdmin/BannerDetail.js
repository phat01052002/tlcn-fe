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
import NotFoundAdmin from '../NotFoundAdmin/NotFoundAdmin';

export default function BannerDetail() {
    const { id } = useParams();
    const [theme, colorMode] = useMode();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery('(min-width:600px)');

    const [banner, setBanner] = useState({
        bannerId: '',
        image: '',
        title: '',
        productName: '',
        productId: '',
    });

    const loadBannerDetail = async () => {
        try {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `/admin/getBannerById/${id}`,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            const respone = (await axios.request(config)).data;
            setBanner(respone.object);
            
            console.log(respone);
            console.log('thanhcong');
            console.log(banner);
        } catch {
            console.log('thatbai');
        }
    };
    useEffect(() => {
		loadBannerDetail();
	}, []);
    if(!banner)
        return (<NotFoundAdmin></NotFoundAdmin>)
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app" style={{ display: 'flex', flexDirection: 'row' }}>
                    <SidebarAdmin />
                    <main className="content" style={{ columnWidth: '75vw' }}>
                        <Topbar></Topbar>
                        <Box m="20px">
                            <HeaderAdmin title="CHI TIẾT BANNER" subtitle="Xem chi tiết thông tin banner" />

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
                                                label="Tiêu đề"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                value={banner.title}
                                                name="title"
                                                sx={{ gridColumn: 'span 4' }}
                                            />
                                            
                                            <Avatar sx={{ gridColumn: 'span 2', width:'100px', height:'auto' }} variant='square' src={banner.image}></Avatar>
                                            <TextField
                                                id="outlined-read-only-input"
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Id sản phẩm"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                value={banner.productId}
                                                name="productId"
                                                sx={{ gridColumn: 'span 4' }}
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
                                                value={banner.productName}
                                                name="productName"
                                                sx={{ gridColumn: 'span 4' }}
                                            />
                                            <Box sx={{ gridColumn: '4' }} display="flex" justifyContent="end" mt="20px" gap="20px">
                                            <IconButton size='large'
                                                onClick={() => {
                                                    window.location = '/admin/banners';
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
