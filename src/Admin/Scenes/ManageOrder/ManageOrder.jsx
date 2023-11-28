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
import NoCrashOutlinedIcon from '@mui/icons-material/NoCrashOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import MoodOutlinedIcon from '@mui/icons-material/MoodOutlined';
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const ManageOrders = () => {
    //Theme
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [orders, setOrders] = useState([]);
    const [orderId, setOrderId] = useState();
    const [message, setMessage] = useState();
    const [ask, setAsk] = useState();
    const handleConfirm = ()=>
    {
        setAsk("Xác nhận đơn hàng");
        console.log("confirm");
    }
    const handleDelivery = ()=>
    {
        setAsk("Bắt đầu vận chuyển đơn hàng");
    }
    const handleDelivered = ()=>
    {
        setAsk("Xác nhận đã giao");
    }

    //Load data from server
    const loadOrders = () => {
        try {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: '/admin/orders',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            axios.request(config).then((res) => setOrders(res.data));
        } catch {
            window.location = '/login';
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);
//Modal status open, close
const [openStatus, setOpenStatus] = useState(false);
const handleOpenStatus = (id) => {
    setOpenStatus(true);
    setOrderId(id);
    console.log('open' + orderId);
};
const handleCloseStatus = () => {
    setOpenStatus(false);
    console.log('close' + orderId);
};
const handleUpdateStatus = async () => {
    try {
        const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `/admin/updateOrderState/${orderId}`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const response = await axios.request(config);
        setMessage(response.data.message);
        handleCloseStatus();
        handleOpenNotification();
        loadOrders();
        //axios.request(config).then((res) => setUsers(res.data));
    } catch {
        window.location = '/login';
    }

    console.log(orderId);
};
    //Modal delete open, close
    const [open, setOpen] = useState(false);
    const handleOpen = (id) => {
        setOpen(true);
        setOrderId(id);
        console.log('open' + orderId);
    };
    const handleClose = () => {
        setOpen(false);
        console.log('close' + orderId);
    };

    const handleDelete = async () => {
        try {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `/admin/deleteOrder/${orderId}`,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            const response = await axios.request(config);
            setMessage(response.data.message);
            handleClose();
            handleOpenNotification();
            loadOrders();
            //axios.request(config).then((res) => setOrders(res.data));
        } catch {
            window.location = '/login';
        }

        console.log(orderId);
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
        { field: 'orderId', headerName: 'ID', flex: 0.2 },
        {
            field: 'productName',
            headerName: 'Sản phẩm',
            flex: 1,
            cellClassName: 'name-column--cell',
        },
        {
            field: 'imageProduct',
            headerName: 'Ảnh sản phẩm',
            type: 'image',
            headerAlign: 'center',
            align: 'center',

            renderCell: ({ row: { imageProduct } }) => {
                return <img width="auto" height="80%" src={imageProduct}></img>;
            },
        },
        {
            field: 'count',
            headerName: 'Số lượng',
            flex: 0.3,
        },
        {
            field: 'total',
            headerName: 'Tổng cộng',
            flex: 0.3,
        },
        
        {
            field: 'paid',
            headerName: 'Thanh toán',
            flex: 0.5, 
            renderCell: ({ row: { paid } }) => {
                return <>{paid === false && "Chưa thanh toán"}
                {paid === true && "Đã thanh toán"}</>;
            },
        },
        {
            field: 'state',
            headerName: 'Trạng thái',
            flex: 0.3,
            renderCell: ({ row: { state } }) => {
                return <>{state === "processing" && "Đang chờ xử lý" ||
                state === "processed" && "Đã xử lý" ||
                state === "delivering" && "Đang vận chuyển" ||
                state === "delivered" && "Đã giao" ||
                state === "canceled" && "Đã hủy"}
                
                </>;
            },
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Hành động',
            align: 'right',
            flex: 0.75,
            getActions: ({ id, row: {state} }) => {
                return [
                    <>
                        {/** Edit button */}

                        <IconButton 
                            disabled={state === "delivered" && 'true' || state === "canceled" && 'true'}
                            onClick={() => handleOpenStatus(id)}
                        >
                            {state === "processing" && <CheckOutlinedIcon onClick={()=>handleConfirm()}/> ||
                            state === "processed" && <LocalShippingOutlinedIcon onClick={()=>handleDelivery()}/> ||
                            state === "delivering" && <NoCrashOutlinedIcon onClick={()=>handleDelivered()}/> ||
                            state === "delivered" && "" ||
                            state === "canceled" && ""}
                        </IconButton>
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
                                        {ask}
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
                        {/** Detail button */}
                        <Link to={`/admin/orders/detail/${id}`}>
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
            <HeaderAdmin title="ĐƠN HÀNG" subtitle="Quản lý đơn hàng" />
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
                    rows={orders}
                    columns={columns}
                    getRowId={(row) => row.orderId}
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
export default ManageOrders;
