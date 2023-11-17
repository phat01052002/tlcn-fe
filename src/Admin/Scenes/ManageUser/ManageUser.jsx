import { Box, IconButton, Typography, Modal, useTheme, Button, Stack } from '@mui/material';
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
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const ManageUsers = () => {
    //Theme
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState();
    const [message, setMessage] = useState();

    //Modal open, close
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
            handleClose();
            //axios.request(config).then((res) => setUsers(res.data));
        } catch {
            window.location = '/login';
        }

        console.log(userId);
    };
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

    //Data of Grid
    const columns = [
        { field: 'userId', headerName: 'ID', flex: 0.2 },
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            cellClassName: 'name-column--cell',
        },
        {
            field: 'image',
            headerName: 'Image',
            type: 'image',
            headerAlign: 'center',
            align: 'center',

            renderCell: ({ row: { image } }) => {
                return <img width="auto" height="80%" src={image}></img>;
            },
        },
        {
            field: 'phone',
            headerName: 'Phone Number',
            flex: 1,
        },
        {
            field: 'address',
            headerName: 'Address',
            flex: 1,
        },
        {
            field: 'username',
            headerName: 'Username',
            flex: 1,
        },
        {
            field: 'role',
            headerName: 'Role',
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
            headerName: 'Status',
            flex: 0.5,
            renderCell: ({ row: { status } }) => {
                return (
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
                        {status === 'lock' && <SentimentDissatisfiedOutlinedIcon />}
                        <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
                            {status}
                        </Typography>
                    </Box>
                );
            },
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            flex: 0.75,
            getActions: ({ id }) => {
                return [
                    <>
                        {/** Edit button */}
                        <Link to={`/admin/users/edit/${id}`}>
                            <IconButton>
                                <LockOpenOutlinedIcon />
                            </IconButton>
                        </Link>
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
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: 350,
                                    bgcolor: 'background.paper',
                                    border: '2px solid #000',
                                    boxShadow: 24,
                                    p: 4,
                                }}
                            >
                                <Typography
                                    id="modal-modal-title"
                                    variant="h2"
                                    color={colors.grey[100]}
                                    fontWeight="bold"
                                    sx={{ mb: '5px' }}
                                >
                                    Delete this user ?
                                </Typography>
                                {/*<div style={{display: "flex", flexDirection:"row", marginTop: "20px", justifyContent:"center"}}>
                    <Button sx={{backgroundColor: "red", width:"50px", marginRight:"10px", fontWeight:"bold"}}>Yes</Button>
                    <Button sx={{backgroundColor: "blue", width:"50px", fontWeight:"bold"}}>No</Button>
                  </div>*/}
                                <Stack spacing={2} direction="row" justifyContent="center">
                                    <Button
                                        variant="contained"
                                        sx={{ backgroundColor: '#3e4396' }}
                                        onClick={() => handleDelete()}
                                    >
                                        {userId}
                                    </Button>
                                    <Button
                                        variant="contained"
                                        sx={{ backgroundColor: '#3e4396' }}
                                        onClick={handleClose}
                                    >
                                        No
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
            <HeaderAdmin title="USER" subtitle="Managing users" />
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
        </Box>
    );
};

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

export default ManageUsers;
