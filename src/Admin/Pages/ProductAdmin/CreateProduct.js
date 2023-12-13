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
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { storage } from '../../../setupFirebase/setupFirebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { styleBox } from '../../Scenes/ManageUser/ManageUser';
import { useEffect } from 'react';

const checkoutSchema = yup.object().shape({
    name: yup.string().required('bắt buộc'),
    description: yup.string().required('bắt buộc'),
    price: yup.number().required('bắt buộc'),
    categoryName: yup.string().required('bắt buộc'),
    quantity: yup.number().required('bắt buộc'),
    size: yup.string().required('bắt buộc'),
});
//Field values
const initialValues = {
    name: '',
    price: '',
    image1: '',
    image2: '',
    image3: '',
    description: '',
    material: '',
    quantity: '',
    size: '',
    categoryName: '',
    discountName: '',
};

export default function CreateProduct() {
    const [theme, colorMode] = useMode();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery('(min-width:600px)');
    const [categoryNameList, setCategoryNameList] = useState([]);
    const [discountList, setDiscountList] = useState([]);
    const loadCategoryNameList = async () => {
        try {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: '/admin/getCategoryList',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            const response = await axios.request(config);
            setCategoryNameList(response.data);
        } catch {
            window.location = '/login';
        }
    };
    const loadDiscountList = async () => {
        try {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: '/admin/getDiscountList',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            const response = await axios.request(config);
            setDiscountList(response.data);
        } catch {
            window.location = '/login';
        }
    };
    useEffect(() => {
        loadCategoryNameList();
        loadDiscountList();
    }, []);

    //Submit
    //Upload Image
    const [imageUpload, setImageUpload] = useState([null, null, null]);
    const [message, setMessage] = useState(null);
    const [fileName, setFileName] = useState([null, null, null]);
    const [imagePreview, setImagePreview] = useState(['', '', '']);
    const setImageUploadItem = (index, value) => {
        setImageUpload((prevImageUpload) => {
            const newImageUpload = [...prevImageUpload];
            newImageUpload[index] = value;
            return newImageUpload;
        });
    };
    const setFileNameItem = (index, value) => {
        setFileName((prevFileName) => {
            const newFileName = [...prevFileName];
            newFileName[index] = value;
            return newFileName;
        });
    };
    const setImagePreviewItem = (index, value) => {
        setImagePreview((prevImagePreview) => {
            const newImagePreview = [...prevImagePreview];
            newImagePreview[index] = value;
            return newImagePreview;
        });
    };

    const uploadImage_Submit = async (values) => {
        if (imageUpload == null) return;

        const uploadPromises = imageUpload.map((item, index) => {
            if (item) {
                const imageRef = ref(storage, `imageProducts/${item.name + v4()}`);
                uploadBytes(imageRef, item).then((snapshot) => {
                    getDownloadURL(snapshot.ref).then(async (url) => {
                        console.log('url: ' + url);
                        if (url != null) values[`image${index + 1}`] = url;
                        console.log('value');
                        console.log(values);
                    });
                });
            }
        });
        Promise.all(uploadPromises).then(() => {
            createProduct(values);
        });
    };
    const createProduct = async (values) => {
        try {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: '/admin/createProduct',
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
                            <HeaderAdmin title="THÊM SẢN PHẨM" subtitle="Thêm sản phẩm mới vào cửa hàng" />

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
                                                label="Tên sản phẩm"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.name}
                                                name="name"
                                                error={!!touched.name && !!errors.name}
                                                helperText={touched.name && errors.name}
                                                sx={{ gridColumn: 'span 4' }}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Giá"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.price}
                                                name="price"
                                                error={!!touched.price && !!errors.price}
                                                helperText={touched.price && errors.price}
                                                sx={{ gridColumn: 'span 2' }}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Số lượng"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.quantity}
                                                name="quantity"
                                                error={!!touched.quantity && !!errors.quantity}
                                                helperText={touched.quantity && errors.quantity}
                                                sx={{ gridColumn: 'span 1' }}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Kích cỡ"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.size}
                                                name="size"
                                                error={!!touched.size && !!errors.size}
                                                helperText={touched.size && errors.size}
                                                sx={{ gridColumn: 'span 1' }}
                                            />
                                            {[1, 2, 3].map((item, index) => (
                                                <Box>
                                                    <Typography>Ảnh {item}</Typography>
                                                    <Stack
                                                        spacing={2}
                                                        direction="row"
                                                        height={35}
                                                        margin="5px 5px 5px 0px"
                                                    >
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
                                                                    const temporaryImageUrl = URL.createObjectURL(
                                                                        event.target.files[0],
                                                                    );

                                                                    setImagePreviewItem(index, temporaryImageUrl);
                                                                    setImageUploadItem(index, event.target.files[0]);
                                                                    setFileNameItem(index, event.target.files[0].name);
                                                                }}
                                                            />
                                                        </Button>

                                                        <Typography>{fileName[index]}</Typography>
                                                    </Stack>
                                                    {imagePreview[index] && (
                                                        <Avatar
                                                            sx={{
                                                                gridColumn: 'span 1',
                                                                justifySelf: 'center',
                                                                width: '100px',
                                                                maxWidth: '150px',
                                                                height: 'auto',
                                                                maxHeight: '150px',
                                                            }}
                                                            variant="square"
                                                            src={imagePreview[index]}
                                                        ></Avatar>
                                                    )}
                                                </Box>
                                            ))}

                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Mô tả"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.description}
                                                name="description"
                                                error={!!touched.description && !!errors.description}
                                                helperText={touched.description && errors.description}
                                                sx={{ gridColumn: 'span 2' }}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Nguyên liệu"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.material}
                                                name="material"
                                                error={!!touched.material && !!errors.material}
                                                helperText={touched.material && errors.material}
                                                sx={{ gridColumn: 'span 2' }}
                                            />

                                            <FormControl variant="filled" sx={{ gridColumn: 'span 2' }}>
                                                <InputLabel>Loại sản phẩm</InputLabel>
                                                <Select
                                                    variant="filled"
                                                    value={values.categoryName}
                                                    onChange={handleChange}
                                                    name="categoryName"
                                                    error={!!touched.categoryName && !!errors.categoryName}
                                                    helperText={touched.categoryName && errors.categoryName}
                                                >
                                                    {categoryNameList.map((item) => (
                                                        <MenuItem value={item}>{item}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            <FormControl variant="filled" sx={{ gridColumn: 'span 2' }}>
                                                <InputLabel>Giảm giá</InputLabel>
                                                <Select
                                                    variant="filled"
                                                    value={values.discountName}
                                                    onChange={handleChange}
                                                    name="discountName"
                                                    error={!!touched.discountName && !!errors.discountName}
                                                    helperText={touched.discountName && errors.discountName}
                                                >
                                                    {discountList.map((item) => (
                                                        <MenuItem value={item}>{item}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Giảm giá"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.discountName}
                                                name="discountName"
                                                error={!!touched.discountName && !!errors.discountName}
                                                helperText={touched.discountName && errors.discountName}
                                                sx={{ gridColumn: 'span 2' }}
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

                                            <Button type="submit" color="secondary" variant="contained">
                                                Tạo Sản Phẩm
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
