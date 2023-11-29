import React from 'react'
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin'
import { Box, Button, FormControlLabel, IconButton, Radio, RadioGroup, Typography, useTheme } from "@mui/material";
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
import { PieChart } from '@mui/x-charts/PieChart';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [dataCard, setDataCard] = useState([])
  const [chartData, setChartData] = useState([]);
  const [top10RecentOrder, setTop10RecentOrder] = useState([]);
  const [top3BestUser, setTop3BestUser] = useState([]);

  const formatter = new Intl.NumberFormat('vi', {
    style: 'currency',
    currency: 'VND',
  });
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
const loadChartData = () => {
  try {
      const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
      let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: '/admin/dataChart',
          headers: {
              Authorization: `Bearer ${accessToken}`,
          },
      };
      axios.request(config).then((res) => setChartData(res.data.object));
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
  loadChartData();
  loadRecent10OrderData();
  loadTop3BestUser();
}, []);
  const data = chartData.map((product,index)=>({
    x: product.productId,
    y: product.revenue,
  }))
  const dataLineChart = [{
    id: `product`,
    color: tokens("dark").redAccent[200], 
    data
  }]
  const dataBarChart = chartData.map((product,index)=>({
    id: `product_${index + 1}`,
    name: product.productId,
    revenue: product.revenue,
    revenueColor: "hsl(340, 70%, 50%)",
  }))
  const dataPieChart = chartData.map((product,index)=>({
    id: index + 1,
    value: product.revenue,
    label: product.productName,
  }))
    
  console.log(chartData)
  console.log(dataLineChart)
  console.log(dataPieChart)
  //Radio
  const [value, setValue] = React.useState('line');

  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };

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
          gridColumn="span 2"
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
          gridColumn="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={formatter.format(dataCard.totalRevenue)}
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
          gridColumn="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <RadioGroup value={value} onChange={handleRadioChange}>
            <FormControlLabel value="day"  control={<Radio sx={{ '& .MuiSvgIcon-root': {fontSize: 14,},}} />} label="Ngày" />
            <FormControlLabel value="month" control={<Radio sx={{ '& .MuiSvgIcon-root': {fontSize: 14,},}}/>} label="Tháng" />
            <FormControlLabel value="year" control={<Radio sx={{ '& .MuiSvgIcon-root': {fontSize: 14,},}}/>} label="Năm" />
          </RadioGroup>
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
          <Box height="230px"  m="-20px 0 0 0" display="flex" >
            {value === 'bar' && <BarChart isDashboard={true} data={dataBarChart} />}
            {value === 'line' && <LineChart isDashboard={true} data={dataLineChart}/>}
            {value === 'pie' && <PieChart
              series={[
                {
                  data: dataPieChart,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                },
              ]}
            />}
            
            <RadioGroup value={value} onChange={handleRadioChange}>
            <FormControlLabel value="line"  control={<Radio sx={{ '& .MuiSvgIcon-root': {fontSize: 14,},}} />} label="Line" />
            <FormControlLabel value="bar" control={<Radio sx={{ '& .MuiSvgIcon-root': {fontSize: 14,},}}/>} label="Bar" />
            <FormControlLabel value="pie" control={<Radio sx={{ '& .MuiSvgIcon-root': {fontSize: 14,},}}/>} label="Pie" />
          </RadioGroup>
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
                {formatter.format(transaction.total)}
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
            
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="10px"
          >
            <ProgressCircle size='125'></ProgressCircle>
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "10px" }}
            >
              
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