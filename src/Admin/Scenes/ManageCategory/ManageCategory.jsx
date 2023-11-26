import { Box, IconButton, Typography, Modal, useTheme, Button, Stack, styled } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin';
import BuildIcon from '@mui/icons-material/Build';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import MoodOutlinedIcon from '@mui/icons-material/MoodOutlined';
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const ManageCategories = () => {
    //Theme
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState();
    const [message, setMessage] = useState();

    //Load data from server
    const loadCategories = () => {
        try {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: '/admin/categories',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            axios.request(config).then((res) => setCategories(res.data));
        } catch {
            window.location = '/login';
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    //Modal delete open, close
    const [open, setOpen] = useState(false);
    const handleOpen = (id) => {
        setOpen(true);
        setCategoryId(id);
        console.log('open' + categoryId);
    };
    const handleClose = () => {
        setOpen(false);
        console.log('close' + categoryId);
    };

    const handleDelete = async () => {
        try {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `/admin/deleteCategory/${categoryId}`,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            const response = await axios.request(config);
            setMessage(response.data.message);
            handleClose();
            handleOpenNotification();
            loadCategories();
            //axios.request(config).then((res) => setCategories(res.data));
        } catch {
            window.location = '/login';
        }

        console.log(categoryId);
    };
    // Notification Modal
    const [openNotification, setOpenNotification] = useState(false);
    const handleOpenNotification = () => {
        setOpenNotification(true);
    };
    const handleCloseNotification = () => {
        setOpenNotification(false);
    };

    //Data of Grid
    const columns = [
        { field: 'categoryId', headerName: 'ID', flex: 0.2 },
        {
            field: 'name',
            headerName: 'Tên',
            flex: 1,
            cellClassName: 'name-column--cell',
        },
        {
            field: 'image',
            headerName: 'Ảnh',
            type: 'image',
            headerAlign: 'center',
            align: 'center',

            renderCell: ({ row: { image } }) => {
                return <img width="auto" height="80%" src={image}></img>;
            },
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Hành động',
            flex: 0.75,
            getActions: ({ id }) => {
                return [
                    <>
                        {/** Edit button */}

                        <Link to={`/admin/categories/edit/${id}`}>
                        <IconButton>
                            <BuildIcon />
                        </IconButton>
                        </Link>

                        {/** Detail button */}
                        <Link to={`/admin/categories/detail/${id}`}>
                            <IconButton>
                                <ErrorOutlineOutlinedIcon />
                            </IconButton>
                        </Link>
                        {/** Delete button */}
                        <IconButton onClick={() => handleOpen(id)}>
                            <DeleteForeverOutlinedIcon />
                        </IconButton>
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
                                    Xóa loại sản phẩm này ?
                                </Typography>
                                <Stack marginTop={5} spacing={2} direction="row" justifyContent="center">
                                    <Button
                                        variant="contained"
                                        sx={{ backgroundColor: '#3e4396' }}
                                        onClick={() => handleDelete()}
                                    >
                                        Có
                                    </Button>
                                    <Button
                                        variant="contained"
                                        sx={{ backgroundColor: '#3e4396' }}
                                        onClick={handleClose}
                                    >
                                        Không
                                    </Button>
                                </Stack>
                            </Box>
                        </Modal>
                    </>,
                ];
            },
        },
    ];

    return (
        <Box m="20px">
            <HeaderAdmin title="LOẠI SẢN PHẨM" subtitle="Quản lý loại sản phẩm" />
            {/** Add button */}
            <Link to={`/admin/categories/create`} m="0px">
                <IconButton>
                    <AddCircleOutlineIcon />
                </IconButton>
            </Link>
            <Box
                m="10px 0 0 0"
                height="65vh"
                sx={{
                    '& .MuiDataGrid-root': {
                        border: 'none',
                    },
                    '& .MuiDataGrid-cell': {
                        borderBottom: 'none',
                    },
                    '& .name-column--cell': {
                        color: colors.greenAccent[300],
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: 'none',
                    },
                    '& .MuiDataGrid-virtualScroller': {
                        backgroundColor: colors.primary[400],
                    },
                    '& .MuiDataGrid-footerContainer': {
                        borderTop: 'none',
                        backgroundColor: colors.blueAccent[700],
                    },
                    '& .MuiCheckbox-root': {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                    '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                        color: `${colors.grey[100]} !important`,
                    },
                }}
            >
                <DataGrid
                    slots={{ toolbar: GridToolbar }}
                    rowHeight={90}
                    rows={categories}
                    columns={columns}
                    getRowId={(row) => row.categoryId}
                />
            </Box>
            <Modal
                open={openNotification}
                onClose={handleCloseNotification}
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
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: '#3e4396' }}
                            onClick={handleCloseNotification}
                        >
                            OK
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </Box>
    );
};
export const styleBox = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export default ManageCategories;
