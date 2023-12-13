import React, { useState } from 'react';
import { ColorModeContext, tokens, useMode } from '../../theme';
import {
    Avatar,
    CssBaseline,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    Stack,
    ThemeProvider,
    Typography,
} from '@mui/material';
import axios from 'axios';
import Topbar from '../../Scenes/Topbar/Topbar';
import SidebarAdmin from '../../Scenes/Sidebar/Sidebar';
import '../../PageAdmin.css';
import { Box, Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { storage } from '../../../setupFirebase/setupFirebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { styleBox } from '../../Scenes/ManageUser/ManageUser';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { VisuallyHiddenInput } from './CreateDiscount';

const checkoutSchema = yup.object().shape({
    name: yup.string().required('bắt buộc'),
});
const initialValues = {
    discountId: '',
    discountName: '',
    percentDiscount: '',
};
export default function EditDiscount() {
    const { id } = useParams();
    const [theme, colorMode] = useMode();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery('(min-width:600px)');

    const [discount, setDiscount] = useState({
        discountId: '',
        discountName: '',
        percentDiscount: '',
    });

    const loadDetail = async () => {
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

            for (let key in respone.object) {
                initialValues[key] = respone.object[key] || ''; // Gán giá trị từ dữ liệu API hoặc một giá trị mặc định nếu không có giá trị
            }
            console.log(initialValues);
            console.log(respone);
            console.log('thanhcong');
        } catch {
            console.log('thatbai');
        }
    };
    useEffect(() => {
        loadDetail();
    }, []);

    //Submit
    //Upload Image
    const [message, setMessage] = useState(null);
    const uploadImage_Submit = async (values) => {
        updateDiscount(values);
    };
    const updateDiscount = async (values) => {
        try {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: '/admin/updateDiscount',
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
                        <Box m="20px">
                            <HeaderAdmin
                                title="CẬP NHẬT GIẢM GIÁ"
                                subtitle="Cập nhật giảm giá trong cửa hàng"
                            />

                            <Formik
                                onSubmit={uploadImage_Submit}
                                initialValues={initialValues}
                                validationSchema={checkoutSchema}
                            >
                                {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                                    <form onSubmit={handleSubmit}>
                                        <Box
                                            display="grid"
                                            gap="15px"
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
                                                sx={{ gridColumn: 'span 2' }}
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
                                                sx={{ gridColumn: 'span 2' }}
                                            />
                                        </Box>

                                        <Box
                                            sx={{ gridColumn: '4' }}
                                            display="flex"
                                            justifyContent="end"
                                            mt="20px"
                                            gap="20px"
                                        >
                                            <IconButton
                                                onClick={() => {
                                                    window.location = '/admin/discounts';
                                                }}
                                            >
                                                <ArrowBackIcon />
                                            </IconButton>

                                            <Button type="submit" color="secondary" variant="contained">
                                                Cập Nhật Giảm Giá
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
                                <Box sx={styleBox}>
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
                                        <Button
                                            variant="contained"
                                            sx={{ backgroundColor: '#3e4396' }}
                                            onClick={handleClose}
                                        >
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
