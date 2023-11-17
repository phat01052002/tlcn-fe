import React, { useCallback, useEffect, useState } from 'react';
import { ColorModeContext, useMode } from '../../theme';
import { CssBaseline, IconButton, Link, Stack, ThemeProvider } from '@mui/material';
import axios from 'axios';
import { changeRole, useStore } from '../../../Store';
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
import { ref, uploadBytes, getDownloadURL, list } from 'firebase/storage';
import { v4 } from 'uuid';

//Validate
const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
const passwordRegExp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,20}$/;

const checkoutSchema = yup.object().shape({
    fullName: yup.string().required('bắt buộc'),
    password: yup.string().matches(passwordRegExp, 'mật khẩu không hợp lệ').required('bắt buộc'),
    phone: yup.string().matches(phoneRegExp, 'số điện thoại không hợp lệ').required('bắt buộc'),
    address: yup.string().required('bắt buộc'),
});
//Field values
const initialValues = {
    fullName: '',
    phone: '',
    image: '',
    password: '',
    address: '',
};

export default function CreateForm() {    
    const [theme, colorMode] = useMode();
    const isNonMobile = useMediaQuery('(min-width:600px)');

    //Submit 
    const handleFormSubmit = async (values) => {
        uploadImage()
        if (urlImage == undefined)
            values.image = "https://frontend.tikicdn.com/_desktop-next/static/img/account/avatar.png";
        else
            values.image = urlImage;
        console.log('value');
        console.log(values);
        try {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: '/admin/createUser',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                data: values,
            };
            const respone = (await axios.request(config)).data;
            console.log('thanhcong');
            console.log(respone);
        } catch {
            console.log('thatbai');
        }
    };
    //Upload Image
    const [imageUpload, setImageUpload] = useState(null);
    const [urlImage, setUrlImage] = useState();
    const uploadImage = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot)=>{
            
            getDownloadURL(snapshot.ref).then((url) =>{setUrlImage(url); console.log("url"+ url); console.log("res"+ urlImage);})
            
            
        }) 
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
                            <HeaderAdmin title="THÊM NGƯỜI DÙNG" subtitle="Thêm hồ sơ người dùng mới" />

                            <Formik
                                onSubmit={handleFormSubmit}
                                initialValues={initialValues}
                                validationSchema={checkoutSchema}
                            >
                                {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                                    <form onSubmit={handleSubmit}>
                                        <Box
                                            display="grid"
                                            gap="30px"
                                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                            sx={{
                                                '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
                                            }}
                                        >
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Họ và tên"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.fullName}
                                                name="fullName"
                                                error={!!touched.fullName && !!errors.fullName}
                                                helperText={touched.fullName && errors.fullName}
                                                sx={{ gridColumn: 'span 4' }}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Số điện thoại"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.phone}
                                                name="phone"
                                                error={!!touched.phone && !!errors.phone}
                                                helperText={touched.phone && errors.phone}
                                                sx={{ gridColumn: 'span 4' }}
                                            />
                                            <Button color="secondary" component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                                Chọn file
                                                <VisuallyHiddenInput 
                                                    type="file" 
                                                    onChange={(event)=> {setImageUpload(event.target.files[0]);}} 
                                                />
                                            </Button>
                                            
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Mật khẩu"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.password}
                                                name="password"
                                                error={!!touched.password && !!errors.password}
                                                helperText={touched.password && errors.password}
                                                sx={{ gridColumn: 'span 4' }}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Địa chỉ 1"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.address}
                                                name="address"
                                                error={!!touched.address && !!errors.address}
                                                helperText={touched.address && errors.address}
                                                sx={{ gridColumn: 'span 4' }}
                                            />
                                        </Box>

                                        <Box display="flex" justifyContent="end" mt="20px" gap="20px">
                                            <Link to={`/admin/users`}>
                                                <IconButton>
                                                    <ArrowBackIcon/>
                                                </IconButton>
                                            </Link>
                                            <Button type="submit" color="secondary" variant="contained">
                                                Create New User
                                            </Button>
                                        </Box>
                                    </form>
                                )}
                            </Formik>
                        </Box>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

const VisuallyHiddenInput = styled('input')({
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