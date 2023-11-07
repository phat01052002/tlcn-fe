import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { changeRole, useStore } from '../../../Store';
import { Box, IconButton, useTheme } from '@mui/material'
import { useContext } from 'react'
import { ColorModeContext, tokens } from '../../theme'
import InputBase from '@mui/material/InputBase'
import LightModeOutlinedICon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedICon from '@mui/icons-material/DarkModeOutlined'
import NotificationsOutlinedICon from '@mui/icons-material/NotificationsOutlined'
import SettingsOutlinedICon from '@mui/icons-material/SettingsOutlined'
import PersonOutlinedICon from '@mui/icons-material/PersonOutlined'
import SearchICon from '@mui/icons-material/Search'

const Topbar = () => {
    const [globalState, dispatch] = useStore();
    const { numberCart, roleState } = globalState; //numberCart is state get from StoreF
    //user
    const [admin, setAdmin] = useState(null);
    //check admin fist
    const checkAdmin = async () => {
        try {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: '/admin/check',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };

            const request = await axios.request(config);
            dispatch(changeRole('admin'));
        } catch {
            window.location = '/login';
        }
    };
    const getAdmin = () => {
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
            axios.request(config).then((res) => setAdmin(res.data));
        } catch {
            window.location = '/login';
        }
    };
    useEffect(() => {
        checkAdmin();
    }, []);
    useEffect(() => {
        if (roleState === 'admin') getAdmin();
    }, [roleState]);
    const getName = () => {
        if (admin) {
            return admin.name;
        } else {
            return '';
        }
    };

    //Theme
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    //Topbar
  return (
    <Box display='flex' justifyContent='space-between' p={2} >
        {/* Search bar */}
        <Box display='flex' backgroundColor={colors.primary[400]} borderRadius='3px'>
        <InputBase sx={{ml: 2, flex: 1}} placeHolder="Search"/>
        <IconButton type='button' sx={{p: 1}}>
            <SearchICon/>
        </IconButton>
        </Box>
        {/*Icons */}
        <Box display='flex'>
            <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode == 'dark' ? (   
                    <DarkModeOutlinedICon/>
                ):(
                    <LightModeOutlinedICon/>
                )}
                
            </IconButton>
            <IconButton>
                <NotificationsOutlinedICon/>
            </IconButton>
            <IconButton>
                <SettingsOutlinedICon/>
            </IconButton>
            <IconButton>
                <PersonOutlinedICon/>
            </IconButton>
        </Box>
        

    </Box>
  )
}
export default Topbar