import React, { useCallback, useEffect, useState } from 'react';
import { ColorModeContext, useMode } from '../../theme';
import { CssBaseline, Link, Stack, ThemeProvider } from '@mui/material';
import axios from 'axios';
import { changeRole, useStore } from '../../../Store';
import Topbar from '../../Scenes/Topbar/Topbar';
import SidebarAdmin from '../../Scenes/Sidebar/Sidebar';
import '../../PageAdmin.css'
import { Box, Button, TextField } from "@mui/material";
import { Formik } from 'formik';
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import HeaderAdmin from "../../../components/HeaderAdmin/HeaderAdmin";

const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
const passwordRegExp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,20}$/;

const checkoutSchema = yup.object().shape({
    fullName: yup.string().required("bắt buộc"),
    password: yup.string().matches(passwordRegExp, "mật khẩu không hợp lệ").required("bắt buộc"),
    phone: yup
        .string()
        .matches(phoneRegExp, "số điện thoại không hợp lệ")
        .required("bắt buộc"),
    address: yup.string().required("bắt buộc"),
});
const initialValues = {
    fullName: "",
    phone: "",
    password: "",
    address: "",
};

export default function UserForm() {
    const [user, setUser] = useState({
		fullName: "",
        phone: "",
        password: "",
        address: "",
	});
    const [theme, colorMode] = useMode();
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = async (values) => {
        setUser({
            ...user,
            [values.name]: values.value
        })
        console.log("value");
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
            console.log("thanhcong");
            console.log(respone);
        } catch {
            console.log("thatbai");
            console.log(user);
        }
    };

    return (<ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className='app' style={{display: 'flex', flexDirection: 'row'}}>
            <SidebarAdmin />
                <main className='content' style={{columnWidth: '75vw'}}>
                    <Topbar></Topbar>
                    <Box m="20px">
                        <HeaderAdmin title="CREATE USER" subtitle="Create a New User Profile" />

                        <Formik
                            onSubmit={handleFormSubmit}
                            initialValues={initialValues}
                            validationSchema={checkoutSchema}
                        >
                            {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            }) => (
                            <form onSubmit={handleSubmit}>
                                <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
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
                                    sx={{ gridColumn: "span 4" }}
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
                                    sx={{ gridColumn: "span 4" }}
                                />
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
                                    sx={{ gridColumn: "span 4" }}
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
                                    sx={{ gridColumn: "span 4" }}
                                />
                                </Box>
                                
                                <Box display="flex" justifyContent="end" mt="20px" gap="20px">
                                    <Link to={`/admin/users/`}>
                                    <Button  type="submit" color="secondary" variant="contained">
                                        Back
                                    </Button>
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
    )
}