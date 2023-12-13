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
import { VisuallyHiddenInput } from './CreateProduct';

const checkoutSchema = yup.object().shape({
    name: yup.string().required('bắt buộc'),
    description: yup.string().required('bắt buộc'),
    price: yup.number().required('bắt buộc'),
    categoryName: yup.string().required('bắt buộc'),
    quantity: yup.number().required('bắt buộc'),
    size: yup.string().required('bắt buộc'),
});
const initialValues = {
    productId: '',
    name: '',
    description: '',
    price: '',
    image1: '',
    image2: '',
    image3: '',
    material: '',
    quantity: '',
    size: '',
    categoryName: '',
    discountName: '',
    status: '',
};
export default function EditProduct() {
    const { id } = useParams();
    const [theme, colorMode] = useMode();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery('(min-width:600px)');

    const [product, setProduct] = useState({
        productId: '',
        name: '',
        description: '',
        price: '',
        image1: '',
        image2: '',
        image3: '',
        material: '',
        quantity: '',
        size: '',
        categoryName: '',
        discountName: '',
        status: '',
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

            for (let key in respone.object) {
                initialValues[key] = respone.object[key] || '';
            }
        } catch {
            console.log('thatbai');
        }
    };
    useEffect(() => {
        loadProductDetail();
    }, []);
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
    const [imagePreview, setImagePreview] = useState([null, null, null]);
    const [finishFlag, setFinishFlag] = useState(false);
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
        if (imageUpload == null) {
            updateProduct(values);
            return;
        }
        console.log(imageUpload);
        const uploadPromises = imageUpload.map(async (item, index) => {
            if (item) {
                const imageRef = ref(storage, `imageProducts/${item.name + v4()}`);
                await uploadBytes(imageRef, item).then(async (snapshot) => {
                    await getDownloadURL(snapshot.ref).then(async (url) => {
                        console.log('url: ' + url);
                        if (url != null) values[`image${index + 1}`] = url;
                        console.log('values');
                        console.log(values);
                    });
                });
            }
        });
        await Promise.all(uploadPromises).then(() => updateProduct(values));
    };
    const updateProduct = async (values) => {
        try {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: '/admin/updateProduct',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                data: values,
            };
            await axios.request(config);
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
                            <HeaderAdmin title="CẬP NHẬT SẢN PHẨM" subtitle="Cập nhật thông tin sản phẩm" />

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
                                                label="Tên sản phẩm"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.name}
                                                name="name"
                                                error={!!touched.name && !!errors.name}
                                                helperText={touched.name && errors.name}
                                                sx={{ gridColumn: 'span 2' }}
                                            />
                                            <FormControl variant="filled" sx={{ gridColumn: 'span 1' }}>
                                                <InputLabel>Loại sản phẩm</InputLabel>
                                                <Select
                                                    variant="filled"
                                                    value={values.categoryName}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    name="categoryName"
                                                    error={!!touched.categoryName && !!errors.categoryName}
                                                    helperText={touched.categoryName && errors.categoryName}
                                                >
                                                    {categoryNameList.map((item) => (
                                                        <MenuItem value={item}>{item}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Mô tả"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.description}
                                                name="description"
                                                error={!!touched.des && !!errors.description}
                                                helperText={touched.description && errors.description}
                                                sx={{ gridColumn: 'span 1' }}
                                            />
                                            {[1, 2, 3].map((item, index) => (
                                                <Box>
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
                                                        src={values[`image${item}`]}
                                                    ></Avatar>
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

                                            <FormControl variant="filled" sx={{ gridColumn: 'span 1' }}>
                                                <InputLabel>Trạng thái</InputLabel>
                                                <Select
                                                    variant="filled"
                                                    value={values.status}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    name="status"
                                                    error={!!touched.status && !!errors.status}
                                                    helperText={touched.status && errors.status}
                                                >
                                                    <MenuItem value="active">active</MenuItem>
                                                    <MenuItem value="inactive">inactive</MenuItem>
                                                </Select>
                                            </FormControl>
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
                                                sx={{ gridColumn: 'span 1' }}
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
                                                label="Nguyên liệu"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.material}
                                                name="material"
                                                error={!!touched.material && !!errors.material}
                                                helperText={touched.material && errors.material}
                                                sx={{ gridColumn: 'span 2' }}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Kích thước"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.size}
                                                name="size"
                                                error={!!touched.size && !!errors.size}
                                                helperText={touched.size && errors.size}
                                                sx={{ gridColumn: 'span 1' }}
                                            />

                                            <FormControl variant="filled" sx={{ gridColumn: 'span 1' }}>
                                                <InputLabel>Giảm giá</InputLabel>
                                                <Select
                                                    variant="filled"
                                                    value={values.discountName}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    name="discountName"
                                                    error={!!touched.discountName && !!errors.discountName}
                                                    helperText={touched.discountName && errors.discountName}
                                                >
                                                    {discountList.map((item) => (
                                                        <MenuItem value={item}>{item}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
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
                                                    window.location = '/admin/products';
                                                }}
                                            >
                                                <ArrowBackIcon />
                                            </IconButton>

                                            <Button type="submit" color="secondary" variant="contained">
                                                Cập nhật Sản Phẩm
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
