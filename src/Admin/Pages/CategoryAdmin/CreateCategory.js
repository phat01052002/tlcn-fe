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
    roomName: yup.string().required('bắt buộc'),
});
//Field values
const initialValues = {
    name: '',
    image: '',
    roomName: '',
};

export default function CreateCategory() {
    const [theme, colorMode] = useMode();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery('(min-width:600px)');
    const [roomList, setRoomList] = useState([]);
    const loadRoomList = async () => {
        try {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: '/admin/getRoomList',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            const response = await axios.request(config);
            setRoomList(response.data);
        } catch {
            window.location = '/login';
        }
    };
    useEffect(() => {
        loadRoomList();
    }, []);

    //Submit
    //Upload Image
    const [imageUpload, setImageUpload] = useState(null);
    const [message, setMessage] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [fileFormatError, setFileFormatError] = useState('');

    const uploadImage_Submit = async (values) => {
        console.log(values);
        if (imageUpload == null) return;

        const imageRef = ref(storage, `categories/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then(async (url) => {
                console.log('url: ' + url);
                values.image = url;
                console.log('value');
                console.log(values);
                try {
                    const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
                    let config = {
                        method: 'post',
                        maxBodyLength: Infinity,
                        url: '/admin/createCategory',
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
            });
        });
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
                            <HeaderAdmin title="THÊM LOẠI SẢN PHẨM" subtitle="Thêm loại sản phẩm mới vào cửa hàng" />

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
                                                label="Tên loại sản phẩm"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.name}
                                                name="name"
                                                error={!!touched.name && !!errors.name}
                                                helperText={touched.name && errors.name}
                                                sx={{ gridColumn: 'span 2' }}
                                            />
                                            <FormControl variant="filled" sx={{ gridColumn: 'span 2' }}>
                                                <InputLabel>Phòng</InputLabel>
                                                <Select
                                                    variant="filled"
                                                    value={values.roomName}
                                                    onChange={handleChange}
                                                    name="roomName"
                                                    error={!!touched.roomName && !!errors.roomName}
                                                    helperText={touched.roomName && errors.roomName}
                                                >
                                                    {roomList.map((item) => (
                                                        <MenuItem value={item}>{item}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            <Box>
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
                                                                const selectedFile = event.target.files[0];

                                                                const allowedExtensions =
                                                                    /(\.jpg|\.jpeg|\.png|\.gif)$/i;
                                                                if (!allowedExtensions.test(selectedFile.name)) {
                                                                    setFileFormatError(
                                                                        'Vui lòng chọn file ảnh có định dạng JPG, JPEG, PNG hoặc GIF.',
                                                                    );
                                                                    setImagePreview('');
                                                                    setImageUpload(null);
                                                                    setFileName(null);
                                                                    return;
                                                                }
                                                                // Xử lý logic khi file đúng định dạng
                                                                var temporaryImageUrl = '';
                                                                if (selectedFile) {
                                                                    temporaryImageUrl =
                                                                        URL.createObjectURL(selectedFile);
                                                                    setFileFormatError('');
                                                                    setImagePreview(temporaryImageUrl);
                                                                    setImageUpload(selectedFile);
                                                                    setFileName(selectedFile.name);
                                                                }
                                                            }}
                                                        />
                                                    </Button>
                                                    <Typography>{fileName}</Typography>
                                                    <Typography style={{ color: 'red', fontSize: '13px' }}>
                                                        {fileFormatError}
                                                    </Typography>
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

                                        <Box display="flex" justifyContent="end" mt="20px" gap="20px">
                                            <IconButton
                                                onClick={() => {
                                                    window.location = '/admin/categories';
                                                }}
                                            >
                                                <ArrowBackIcon />
                                            </IconButton>

                                            <Button type="submit" color="secondary" variant="contained">
                                                Tạo Loại Sản Phẩm
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
