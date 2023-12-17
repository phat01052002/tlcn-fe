import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { changeRole, useStore } from '../../../Store';
import { Box, IconButton, useTheme } from '@mui/material'
import { useContext } from 'react'
import { ColorModeContext, tokens } from '../../theme'
import LogoutIcon from '@mui/icons-material/Logout';
import LightModeOutlinedICon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedICon from '@mui/icons-material/DarkModeOutlined'
import { AlertLogout } from '../../../components/Alert/Alert';
import ChatMessage from '../../../components/ChatMessage/ChatMessage';


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
    const logOut = useCallback(() => {
        try {
            sessionStorage.removeItem('checkout');
            dispatch(changeRole('guest'));
            window.location = '/login';
        } catch {
            window.location = '/login';
        }
    }, []);
    const handleClickLogout = useCallback(() => {
        AlertLogout(logOut);
    });
    //Topbar
  return (
    <Box display='flex' justifyContent='space-between' p={2} >
        {/*Icons */}
        <Box display='flex'>
            <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode == 'dark' ? (   
                    <DarkModeOutlinedICon/>
                ):(
                    <LightModeOutlinedICon/>
                )}
                
            </IconButton>
            <IconButton onClick={handleClickLogout}>
                <LogoutIcon/>
            </IconButton>
        </Box>
        

    </Box>
  )
}
export default Topbar