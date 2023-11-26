import React from 'react'
import { useState } from 'react'
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { Link } from 'react-router-dom'
import { tokens } from '../../theme'
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import axios from 'axios'
import { useEffect } from 'react'

const Item = ({ title, to, icon, selected, setSelected}) =>
{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return(
        <MenuItem active={selected === title} style={{color: colors.grey[100]}} onClick={() => setSelected(title)} icon={icon}>
            <Typography>{title}</Typography>
            <Link to={to}></Link>
        </MenuItem>

    )
}

const SidebarAdmin = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [ isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] =  useState("Dashboard")

    const [admin, setAdmin] = useState([]);
    const getAdmin = async() => {
        try {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: '/admin/findByName',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            await axios.request(config).then((res) => setAdmin(res.data));
        } catch {
            window.location = '/login';
        }
    };
    useEffect(()=>{
        getAdmin();
    },[]);
    return (
        <Box sx={{
            "& .pro-sidebar-inner": {
            background: `${colors.primary[400]} !important`,
            },
            "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
            },
            "& .pro-inner-item": {
            padding: "5px 35px 5px 20px !important",
            },
            "& .pro-inner-item:hover": {
            color: "#868dfb !important",
            },
            "& .pro-menu-item.active": {
            color: "#6870fa !important",
            },
            
        }}>
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                {/* LOGO AND MENU ICON */}
                <MenuItem
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                    style={{
                    margin: "10px 0 20px 0",
                    color: colors.grey[100],
                    }}
                >
                    {!isCollapsed && (
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        ml="15px"
                    >
                        <Typography variant="h3" color={colors.grey[100]}>
                        {admin.name}
                        </Typography>
                        <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                        <MenuOutlinedIcon />
                        </IconButton>
                    </Box>
                    )}
                </MenuItem>
                {/*User */}
                {!isCollapsed && (
                    <Box mb="25px">
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <img
                        alt="profile-user"
                        width="100px"
                        height="100px"
                        src={admin.image}
                        style={{ cursor: "pointer", borderRadius: "50%" }}
                        />
                    </Box>
                    <Box textAlign="center">
                        <Typography
                        variant="h2"
                        color={colors.grey[100]}
                        fontWeight="bold"
                        sx={{ m: "10px 0 0 0" }}
                        >
                        Le Duan
                        </Typography>
                        <Typography variant="h5" color={colors.greenAccent[500]}>
                        Administrator
                        </Typography>
                    </Box>
                    </Box>
                )}
                {/**Menu Item */}
                <Box paddingLeft={isCollapsed ? undefined: "10%"}>
                    <Item 
                        title="Dashboard"
                        to="/admin"
                        icon={<HomeOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Typography variant='h6' color={colors.grey[300]} sx={{ m: "15px 0 5px 20px"}}>Manage</Typography>
                    <Item 
                        title="Quản lý người dùng"
                        to="/admin/users"
                        icon={<PeopleOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item 
                        title="Quản lý sản phẩm"
                        to="/admin/products"
                        icon={<Inventory2OutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item 
                        title="Quản lý loại sản phẩm"
                        to="/admin/categories"
                        icon={<CategoryOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item 
                        title="Quản lý đơn hàng"
                        to="/admin/orders"
                        icon={<ContactsOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item 
                        title="Quản lý banner"
                        to="/admin/banners"
                        icon={<CalendarTodayOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                </Box>
                </Menu>
            </ProSidebar>

        </Box>
  )
}
export default SidebarAdmin