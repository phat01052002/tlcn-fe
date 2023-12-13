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
import { VisuallyHiddenInput } from './CreateBanner';

const checkoutSchema = yup.object().shape({
    title: yup.string().required('bắt buộc'),
    productId: yup.number().required('bắt buộc'),
});
const initialValues = {
    bannerId: '',
    title: '',
    image: '',
    productId: '',
};
export default function EditBanner() {
    const { id } = useParams();
    const [theme, colorMode] = useMode();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery('(min-width:600px)');

    const [banner, setBanner] = useState({
        bannerId: '',
        title: '',
        image: '',
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
        loadBannerDetail();
    }, []);

    //Submit
    //Upload Image
    const [imageUpload, setImageUpload] = useState(null);
    const [message, setMessage] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    const uploadImage_Submit = async (values) => {
        if (imageUpload == null) {
            updatebanner(values);
            return;
        }

        const imageRef = ref(storage, `banners/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then(async (url) => {
                console.log('url: ' + url);
                values.image = url;
                console.log('value');
                console.log(values);
                updatebanner(values);
            });
        });
    };
    const updatebanner = async (values) => {
        try {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: '/admin/updateBanner',
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
                                title="CẬP NHẬT BANNER"
                                subtitle="Cập nhật banner trong cửa hàng"
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
                                                label="tiêu đề"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.title}
                                                name="title"
                                                error={!!touched.title && !!errors.title}
                                                helperText={touched.title && errors.title}
                                                sx={{ gridColumn: 'span 2' }}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Id sản phẩm"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.productId}
                                                name="productId"
                                                error={!!touched.productId && !!errors.productId}
                                                helperText={touched.productId && errors.productId}
                                                sx={{ gridColumn: 'span 2' }}
                                            />
                                            <Box>
                                                <Avatar
                                                    sx={{
                                                        gridColumn: 'span 1',
                                                        justifySelf: 'center',
                                                        width: '100px',
                                                        maxWidth: '150px',
                                                        height: 'auto',
                                                        maxHeight: '150px',
                                                        margin: '0px 0px 10px 0px',
                                                    }}
                                                    variant="square"
                                                    src={values.image}
                                                ></Avatar>
                                                <Stack spacing={2} direction="row" height={35}>
                                                    <Button
                                                        color="secondary"
                                                        component="label"
                                                        variant="contained"
                                                        startIcon={<CloudUploadIcon />}
                                                    >
                                                        Chọn file
                                                        <VisuallyHiddenInput
                                                            type="file"
                                                            onChange={(event) => {
                                                                var temporaryImageUrl = '';
                                                                    if(event.target.files[0])
                                                                    {
                                                                        temporaryImageUrl = URL.createObjectURL(
                                                                            event.target.files[0],
                                                                        );
                                                                    }
                                                                setImagePreview(temporaryImageUrl);
                                                                setImageUpload(event.target.files[0]);
                                                                setFileName(event.target.files[0].name);
                                                            }}
                                                        />
                                                    </Button>
                                                    <Typography>{fileName}</Typography>
                                                </Stack>
                                                {imagePreview && (
                                                    <Avatar
                                                        sx={{
                                                            gridColumn: 'span 1',
                                                            justifySelf: 'center',
                                                            width: '100px',
                                                            maxWidth: '150px',
                                                            height: 'auto',
                                                            maxHeight: '150px',
                                                            margin: '10px 0px 0px 0px',
                                                        }}
                                                        variant="square"
                                                        src={imagePreview}
                                                    ></Avatar>
                                                )}
                                            </Box>
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
                                                    window.location = '/admin/banners';
                                                }}
                                            >
                                                <ArrowBackIcon />
                                            </IconButton>

                                            <Button type="submit" color="secondary" variant="contained">
                                                Cập Nhật Banner
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
