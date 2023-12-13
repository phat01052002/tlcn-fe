import React, { useState } from 'react';
import { ColorModeContext, tokens, useMode } from '../../theme';
import { CssBaseline, IconButton, Modal, Stack, ThemeProvider, Typography } from '@mui/material';
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styleBox } from '../../Scenes/ManageUser/ManageUser';


const checkoutSchema = yup.object().shape({
    discountName: yup.string().required('bắt buộc'),
    percentDiscount: yup.number().required('bắt buộc')
});
//Field values
const initialValues = {
    discountName: '',
    percentDiscount: '',
};

export default function CreateDiscount() {
    const [theme, colorMode] = useMode();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery('(min-width:600px)');

    //Submit
    //Upload Image
    const [message, setMessage] = useState(null);
    
    const uploadImage_Submit = async (values) => {
        try {
                    const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
                    let config = {
                        method: 'post',
                        maxBodyLength: Infinity,
                        url: '/admin/createDiscount',
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                        data: values,
                    };
                    const respone = (await axios.request(config)).data;
                    setMessage(respone.message);
                    handleOpen();
                    console.log('thanhcong');
                    console.log(respone);
        } catch {
            console.log('thatbai');
        }
    };
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
        
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app" style={{ display: 'flex', flexDirection: 'row' }}>
                    <SidebarAdmin />
                    <main className="content" style={{ columnWidth: '75vw' }}>
                        <Topbar></Topbar>
                        <Box m="30px">
                            <HeaderAdmin title="THÊM GIẢM GIÁ" subtitle="Thêm giảm giá mới vào cửa hàng" />

                            <Formik
                                onSubmit={uploadImage_Submit}
                                initialValues={initialValues}
                                validationSchema={checkoutSchema}
                            >
                                {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                                    <form onSubmit={handleSubmit}>
                                        <Box
                                            display="grid"
                                            gap="20px"
                                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                            sx={{
                                                '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
                                            }}
                                        >
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Tên giảm giá"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.discountName}
                                                name="discountName"
                                                error={!!touched.discountName && !!errors.discountName}
                                                helperText={touched.discountName && errors.discountName}
                                                sx={{ gridColumn: 'span 4' }}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Tỷ lệ giảm giá"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.percentDiscount}
                                                name="percentDiscount"
                                                error={!!touched.percentDiscount && !!errors.percentDiscount}
                                                helperText={touched.percentDiscount && errors.percentDiscount}
                                                sx={{ gridColumn: 'span 4' }}
                                            />
                                        </Box>

                                        <Box display="flex" justifyContent="end" mt="20px" gap="20px">
                                            
                                            <IconButton onClick={()=> {window.location = "/admin/discounts"}}>
                                                <ArrowBackIcon />
                                            </IconButton>
                                            
                                            <Button type="submit" color="secondary" variant="contained">
                                                Tạo Giảm giá
                                            </Button>
                                        </Box>
                                    </form>
                                )}
                            </Formik>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box
                                    sx={styleBox}
                                >
                                    <Typography
                                        id="modal-modal-title"
                                        variant="h2"
                                        color={colors.grey[100]}
                                        fontWeight="bold"
                                        sx={{ mb: '5px' }}
                                    >
                                        {message}
                                    </Typography>
                                    <Stack marginTop={5} spacing={2} direction="row" justifyContent="center">
                                        <Button variant="contained" sx={{ backgroundColor: '#3e4396' }} onClick={handleClose}>
                                            OK
                                        </Button>
                                    </Stack>
                                </Box>
                            </Modal>
                        </Box>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
