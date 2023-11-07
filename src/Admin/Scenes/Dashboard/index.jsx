import React from 'react'
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin'
import { Box } from '@mui/material'

const Dashboard = () => {
  return (
    <div>
        <Box m="20px">
            <HeaderAdmin title='Dashboard' subtitle='Welcome to your dashboard'></HeaderAdmin>
        </Box>
    </div>
  )
}
export default Dashboard