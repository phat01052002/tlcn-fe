import React, { useCallback, useEffect, useState } from 'react';
import { ColorModeContext, useMode } from '../../theme';
import { CssBaseline, ThemeProvider } from '@mui/material';

import Topbar from '../../Scenes/Topbar/Topbar';
import SidebarAdmin from '../../Scenes/Sidebar/Sidebar';
import '../../PageAdmin.css'
import NotFoundScene from '../../Scenes/NotFound/NotFoundScene';
export default function NotFoundAdmin() {
    
    const [theme, colorMode] = useMode();

    return (<ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className='app' style={{display: 'flex', flexDirection: 'row'}}>
            <SidebarAdmin/>
                <main className='content' style={{columnWidth: '75vw'}}>
                    <Topbar></Topbar>
                    <NotFoundScene/>
                </main>
            </div>
        </ThemeProvider>
    </ColorModeContext.Provider>
    )
}
