import { Box, IconButton, Typography, Modal, useTheme, Button, Stack, styled } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import MoodOutlinedIcon from '@mui/icons-material/MoodOutlined';
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const ManageUsers = () => {
    //Theme
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState();
    const [message, setMessage] = useState();

    //Load data from server
    const loadUsers = () => {
        try {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: '/admin/getUsers',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            axios.request(config).then((res) => setUsers(res.data));
        } catch {
            window.location = '/login';
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    //Modal delete open, close
    const [open, setOpen] = useState(false);
    const handleOpen = (id) => {
        setOpen(true);
        setUserId(id);
        console.log('open' + userId);
    };
    const handleClose = () => {
        setOpen(false);
        console.log('close' + userId);
    };

    const handleDelete = async () => {
        try {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `/admin/deleteUser/${userId}`,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            const response = await axios.request(config);
            setMessage(response.data.message);
            handleClose();
            handleOpenNotification();
            loadUsers();
            //axios.request(config).then((res) => setUsers(res.data));
        } catch {
            window.location = '/login';
        }

        console.log(userId);
    };

    //Modal status open, close
    const [openStatus, setOpenStatus] = useState(false);
    const handleOpenStatus = (id) => {
        setOpenStatus(true);
        setUserId(id);
        console.log('open' + userId);
    };
    const handleCloseStatus = () => {
        setOpenStatus(false);
        console.log('close' + userId);
    };
    const handleUpdateStatus = async () => {
        try {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `/admin/updateUserStatus/${userId}`,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            const response = await axios.request(config);
            setMessage(response.data.message);
            handleCloseStatus();
            handleOpenNotification();
            loadUsers();
            //axios.request(config).then((res) => setUsers(res.data));
        } catch {
            window.location = '/login';
        }

        console.log(userId);
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
        { field: 'userId', headerName: 'ID', flex: 0.2 },
        {
            field: 'name',
            headerName: 'Tên',
            flex: 1,
            cellClassName: 'name-column--cell',
        },
        {
            field: 'image',
            headerName: 'Ảnh đại diện',
            type: 'image',
            headerAlign: 'center',
            align: 'center',

            renderCell: ({ row: { image } }) => {
                return <img width="auto" height="80%" src={image}></img>;
            },
        },
        {
            field: 'phone',
            headerName: 'Số điện thoại',
            flex: 1,
        },
        {
            field: 'address',
            headerName: 'Địa chỉ',
            flex: 1,
        },
        {
            field: 'username',
            headerName: 'Tên tài khoản',
            flex: 1,
        },
        {
            field: 'role',
            headerName: 'Quyền',
            flex: 0.5,
            renderCell: ({ row: { role } }) => {
                return (
                    <Box
                        width="100%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={role === 'ADMIN' ? colors.greenAccent[600] : colors.greenAccent[700]}
                        borderRadius="4px"
                    >
                        {role === 'ADMIN' && <AdminPanelSettingsOutlinedIcon />}
                        {role === 'USER' && <AccountCircleOutlinedIcon />}
                        <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
                            {role}
                        </Typography>
                    </Box>
                );
            },
        },
        {
            field: 'status',
            headerName: 'Trạng thái',
            flex: 0.5,
            renderCell: ({ row: { status } }) => {
                return [
                    <>
                        <Box
                            width="100%"
                            m="0 auto"
                            p="5px"
                            display="flex"
                            justifyContent="center"
                            backgroundColor={status === 'active' ? colors.blueAccent[600] : colors.redAccent[600]}
                            borderRadius="4px"
                        >
                            {status === 'active' && <MoodOutlinedIcon />}
                            {status === 'inactive' && <SentimentDissatisfiedOutlinedIcon />}
                            <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
                                {status}
                            </Typography>
                            <Modal
                                open={openStatus}
                                onClose={handleCloseStatus}
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
                                        Thay đổi trạng thái người dùng ?
                                    </Typography>
                                    <Stack marginTop={5} spacing={2} direction="row" justifyContent="center">
                                        <Button
                                            variant="contained"
                                            sx={{ backgroundColor: '#3e4396' }}
                                            onClick={() => handleUpdateStatus()}
                                        >
                                            Có
                                        </Button>
                                        <Button
                                            variant="contained"
                                            sx={{ backgroundColor: '#3e4396' }}
                                            onClick={handleCloseStatus}
                                        >
                                            Không
                                        </Button>
                                    </Stack>
                                </Box>
                            </Modal>
                        </Box>
                    </>,
                ];
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

                        <IconButton onClick={() => handleOpenStatus(id)}>
                            <LockOpenOutlinedIcon />
                        </IconButton>

                        {/** Detail button */}
                        <Link to={`/admin/users/detail/${id}`}>
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
                                    Xóa người dùng này ?
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
            <HeaderAdmin title="NGƯỜI DÙNG" subtitle="Quản lý người dùng" />
            {/** Add button */}
            <Link to={`/admin/users/create`} m="0px">
                <IconButton>
                    <PersonAddOutlinedIcon />
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
                    rows={users}
                    columns={columns}
                    getRowId={(row) => row.userId}
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
export default ManageUsers;
