import { Box, IconButton, Typography, Modal, useTheme, Button, Stack, styled } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin';
import BuildIcon from '@mui/icons-material/Build';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const ManageDiscounts = () => {
    //Theme
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [discounts, setDiscounts] = useState([]);
    const [discountId, setDiscountId] = useState();
    const [message, setMessage] = useState();

    //Load data from server
    const loadDiscounts = () => {
        try {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: '/admin/discounts',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            axios.request(config).then((res) => setDiscounts(res.data));
        } catch {
            window.location = '/login';
        }
    };

    useEffect(() => {
        loadDiscounts();
    }, []);

    //Modal delete open, close
    const [open, setOpen] = useState(false);
    const handleOpen = (id) => {
        setOpen(true);
        setDiscountId(id);
        console.log('open' + discountId);
    };
    const handleClose = () => {
        setOpen(false);
        console.log('close' + discountId);
    };

    const handleDelete = async () => {
        try {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `/admin/deleteDiscount/${discountId}`,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            const response = await axios.request(config);
            setMessage(response.data.message);
            handleClose();
            handleOpenNotification();
            loadDiscounts();
        } catch {
            window.location = '/login';
        }

        console.log(discountId);
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
        { field: 'discountId', headerName: 'ID', flex: 0.2 },
        {
            field: 'discountName',
            headerName: 'Tên',
            flex: 1,
            align: 'center',
            cellClassName: 'name-column--cell',
        },
        {
            field: 'percentDiscount',
            headerName: 'Tỷ lệ giảm',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Hành động',
            flex: 1,
            getActions: ({ id }) => {
                return [
                    <>
                        {/** Edit button */}

                        <Link to={`/admin/discounts/edit/${id}`}>
                        <IconButton>
                            <BuildIcon />
                        </IconButton>
                        </Link>

                        {/** Detail button */}
                        <Link to={`/admin/discounts/detail/${id}`}>
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
                                    Xóa giảm giá này ?
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
            <HeaderAdmin title="GIẢM GIÁ" subtitle="Quản lý giảm giá" />
            {/** Add button */}
            <Link to={`/admin/discounts/create`} m="0px">
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
                    rows={discounts}
                    columns={columns}
                    getRowId={(row) => row.discountId}
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
export default ManageDiscounts;
