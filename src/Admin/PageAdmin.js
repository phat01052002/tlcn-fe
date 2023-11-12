import React, { useCallback, useEffect, useState } from 'react';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import axios from 'axios';
import { changeRole, useStore } from '../Store';
import Topbar from './Scenes/Topbar/Topbar';
import SidebarAdmin from './Scenes/Sidebar/Sidebar';
import Dashboard from './Scenes/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './PageAdmin.css';
import ChatMessage from '../components/ChatMessage/ChatMessage';
export default function PageAdmin() {
    const [theme, colorMode] = useMode();
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    <SidebarAdmin />
                    <main className="content">
                        <Topbar></Topbar>
                        <Dashboard></Dashboard>
                    </main>
                    <ChatMessage role={'admin'}></ChatMessage>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}
