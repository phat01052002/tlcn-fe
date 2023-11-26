import React, { useState } from 'react';
import { ColorModeContext, tokens, useMode } from '../../theme';
import { Avatar, CssBaseline, FormControl, IconButton, InputLabel, Modal, Select, Stack, ThemeProvider, Typography } from '@mui/material';
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
import { VisuallyHiddenInput } from './CreateProduct';
import { MenuItem } from 'react-pro-sidebar';

const checkoutSchema = yup.object().shape({
  name: yup.string().required('bắt buộc'),
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
        image: '',
        material: '',
        quantity: '',
        size: '',
        categoryName: '',
        percentDiscount: '',
        status: '',
}
export default function EditProduct() {
    const { id } = useParams();
    const [theme, colorMode] = useMode();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery('(min-width:600px)');

    const [product, setProduct] = useState({
        productId: '',
        name: '',
        os: '',
        screen: '',
        rearCamera: '',
        frontCamera: '',
        cpu: '',
        ram: '',
        internalMemory: '',
        sim: '',
        pin: '',
        colorProduct: '',
        price: '',
        image: '',
        material: '',
        quantity: '',
        size: '',
        categoryName: '',
        percentDiscount: '',
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
		loadProductDetail();
	}, []);
  const [categoryNameList, setCategoryNameList] = useState([]);
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
            setCategoryNameList(response.data)
        } catch {
            window.location = '/login';
        }
    }
    useEffect(() => {
        loadCategoryNameList();
    }, []);

    //Submit
    //Upload Image
    const [imageUpload, setImageUpload] = useState(null);
    const [message, setMessage] = useState(null);
    const [fileName, setFileName] = useState(null);
    
    const uploadImage_Submit = async (values) => {
        if (imageUpload == null) 
        {
          updateProduct(values);
          return;
        }
        
        const imageRef = ref(storage, `imageCNPM/products/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then(async (url) => {
                console.log("url: "+url)
                if (url == null)
                    values.image = 'https://frontend.tikicdn.com/_desktop-next/static/img/account/avatar.png';
                else values.image = url;
                console.log('value');
                console.log(values);
                updateProduct(values);
            });
        });
    };
    const updateProduct = async(values) => {
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
        const respone = (await axios.request(config)).data;
        setMessage(respone.message);
        handleOpen();
        console.log('thanhcong');
        console.log(respone);
    } catch {
        console.log('thatbai');
    }
    }
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
                                                variant='filled'
                                                value={values.categoryName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                name='categoryName'
                                                error={!!touched.categoryName && !!errors.categoryName}
                                                helperText={touched.categoryName && errors.categoryName}
                                                >
                                                {
                                                    categoryNameList.map(
                                                        item => (<MenuItem value={item}>{item}</MenuItem>)
                                                    )
                                                }
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
                                            <Avatar sx={{ gridColumn: 'span 1', justifySelf: "center",width:'100px', maxWidth: '150px', height: 'auto', maxHeight: '150px'}} variant='square' src={values.image}></Avatar>
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
                                                            setImageUpload(event.target.files[0]);
                                                            setFileName(event.target.files[0].name);
                                                        }}
                                                    />
                                                </Button>
                                                <Typography>{fileName}</Typography>
                                            </Stack>
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Trạng thái"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.status}
                                                name="status"
                                                error={!!touched.status && !!errors.status}
                                                helperText={touched.status && errors.status}
                                                sx={{ gridColumn: 'span 1' }}
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
                                            
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Giảm giá"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.percentDiscount}
                                                name="percentDiscount"
                                                error={!!touched.percentDiscount && !!errors.percentDiscount}
                                                helperText={touched.percentDiscount && errors.percentDiscount}
                                                sx={{ gridColumn: 'span 1' }}
                                            />
                                        </Box>

                                        <Box sx={{ gridColumn: '4' }} display="flex" justifyContent="end" mt="20px" gap="20px">
                                            
                                            <IconButton onClick={()=> {window.location = "/admin/products"}}>
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
