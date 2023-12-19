import React, { useCallback, useEffect, useState } from 'react';
import { ColorModeContext, useMode } from '../../theme';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import axios from 'axios';
import { changeRole, useStore } from '../../../Store';
import Topbar from '../../Scenes/Topbar/Topbar';
import SidebarAdmin from '../../Scenes/Sidebar/Sidebar';
import Dashboard from '../../Scenes/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../../PageAdmin.css'
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin';
import ManageCategories from '../../Scenes/ManageCategory/ManageCategory';
export default function CategoryAdmin() {
    
    const [theme, colorMode] = useMode();

    return (<ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className='app'>
            <SidebarAdmin select="Quản lý loại sản phẩm"/>
                <main className='content'>
                    <Topbar></Topbar>
                    <Box >
                        <ManageCategories></ManageCategories>
                    </Box>   
                </main>
            </div>
        </ThemeProvider>
    </ColorModeContext.Provider>
    )
}
