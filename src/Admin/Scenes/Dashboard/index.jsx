import React from 'react'
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin'
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from '../../theme'
import { mockTransactions } from '../../Data/mockData'
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import LineChart from '../../../components/DashboardComponents/LineChart';
import SmartphoneOutlinedIcon from '@mui/icons-material/SmartphoneOutlined';
import BarChart from '../../../components/DashboardComponents/BarChart';
import StatBox from '../../../components/DashboardComponents/StatBox';
import ProgressCircle from '../../../components/DashboardComponents/ProgressCircle';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { mockLineData as dataMockLine} from '../../Data/mockData';
import { mockBarData as dataBarLine} from '../../Data/mockData';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [dataCard, setDataCard] = useState([])
  const [lineChartData, setLineChartData] = useState([]);
  const [top10RecentOrder, setTop10RecentOrder] = useState([]);
  const [top3BestUser, setTop3BestUser] = useState([]);
  //Load data from server
  const loadDataCard = () => {
    try {
        const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: '/admin/dataCardDashboard',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        axios.request(config).then((res) => setDataCard(res.data.object));
    } catch {
        window.location = '/login';
    }
};
const loadLineChartData = () => {
  try {
      const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
      let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: '/admin/dataLineChart',
          headers: {
              Authorization: `Bearer ${accessToken}`,
          },
      };
      axios.request(config).then((res) => setLineChartData(res.data.object));
  } catch {
      window.location = '/login';
  }
};
const loadRecent10OrderData = () => {
  try {
      const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
      let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: '/admin/10RecentOrder',
          headers: {
              Authorization: `Bearer ${accessToken}`,
          },
      };
      axios.request(config).then((res) => setTop10RecentOrder(res.data.object));
  } catch {
      window.location = '/login';
  }
};
const loadTop3BestUser = () => {
  try {
      const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
      let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: '/admin/top3BestUser',
          headers: {
              Authorization: `Bearer ${accessToken}`,
          },
      };
      axios.request(config).then((res) => setTop3BestUser(res.data.object));
  } catch {
      window.location = '/login';
  }
};

useEffect(() => {
  loadDataCard();
  loadLineChartData();
  loadRecent10OrderData();
  loadTop3BestUser();
}, []);
  const data = lineChartData.map((product,index)=>({
    x: product.productId,
    y: product.revenue,
  }))
  const dataLineChart = [{
    id: `product`,
    color: tokens("dark").redAccent[200], 
    data
  }]
  const dataBarChart = lineChartData.map((product,index)=>({
    id: `product_${index + 1}`,
    name: product.productId,
    revenue: product.revenue,
    revenueColor: "hsl(340, 70%, 50%)",
  }))
    
  console.log(data)
  console.log(dataLineChart)
  console.log(dataBarLine)
  console.log(top10RecentOrder)
  console.log(top3BestUser)
  
  return (
    <Box m="20px">
      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="120px"
        gap="10px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={dataCard.totalProductSold}
            subtitle="Tổng sản phẩm đã bán"
            progress="0.75"
            increase="+14%"
            icon={
              <SmartphoneOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={dataCard.totalRevenue  + " VNĐ"}
            subtitle="Doanh thu"
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={dataCard.totalNewUser}
            subtitle="Người dùng mới"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          sx={{overflowY: 'auto', overflowX: 'hidden'}}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Top 3 người dùng
            </Typography>
          </Box>
          {top3BestUser.map((user, i) => (
            <Box
              key={`${user.userId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                  maxWidth={150}
                >
                  {user.name}
                </Typography>
                <Typography color={colors.grey[100]}>
                  Point: {user.point}
                </Typography>
              </Box>
              
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
                width={80}
                alignContent='center'
              >
                {user.rank}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="15px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
               Top sản phẩm doanh thu cao nhất
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                
              </Typography>
            </Box>
            <Box>
            </Box>
          </Box>
          <Box height="230px" m="-20px 0 0 0">
            <LineChart isDashboard={true} data={dataLineChart}/>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Top 10 đơn hàng gần nhất
            </Typography>
          </Box>
          {top10RecentOrder.map((transaction, i) => (
            <Box
              key={`${transaction.orderId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.orderId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.userName}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.dateUpdate}
                </Typography>
              </Box>
              
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                {transaction.total} VND
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="20px"
        >
          <Typography variant="h5" fontWeight="600">
            Hãng điện thoại
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="10px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "10px" }}
            >
              Doanh thu hãng Iphone chiếm 75 %
            </Typography>
            <Typography></Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          p="0 0 0 10px"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "10px 10px 0 10px" }}
          >
            Top sản phẩm doanh thu cao nhất
          </Typography>
          <Box height="250px" mt="-30px">
            <BarChart isDashboard={true} data={dataBarChart} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Dashboard