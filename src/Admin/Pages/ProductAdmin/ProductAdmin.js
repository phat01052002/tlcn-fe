import React, { useCallback, useEffect, useState } from 'react';
import { ColorModeContext, useMode } from '../../theme';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import axios from 'axios';
import Topbar from '../../Scenes/Topbar/Topbar';
import SidebarAdmin from '../../Scenes/Sidebar/Sidebar';
import Dashboard from '../../Scenes/Dashboard';
import '../../PageAdmin.css'
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin';
import ManageProducts from '../../Scenes/ManageProduct/ManageProduct';
export default function ProductAdmin() {
    
    const [theme, colorMode] = useMode();

    return (<ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className='app' style={{display: 'flex', flexDirection: 'row'}}>
            <SidebarAdmin/>
                <main className='content' style={{columnWidth: '75vw'}}>
                    <Topbar></Topbar>
                    <ManageProducts></ManageProducts>  
                </main>
            </div>
        </ThemeProvider>
    </ColorModeContext.Provider>
    )
}
