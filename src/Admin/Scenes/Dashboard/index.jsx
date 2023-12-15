import React from 'react'
import { Box, FormControl, FormControlLabel, FormHelperText, IconButton, InputLabel, MenuItem, Radio, RadioGroup, Select, Typography, useTheme } from "@mui/material";
import { tokens } from '../../theme'
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LineChart from '../../../components/DashboardComponents/LineChart';
import SmartphoneOutlinedIcon from '@mui/icons-material/SmartphoneOutlined';
import BarChart from '../../../components/DashboardComponents/BarChart';
import StatBox from '../../../components/DashboardComponents/StatBox';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [dataCard, setDataCard] = useState([])
  const [chartData, setChartData] = useState([]);
  const [top10RecentOrder, setTop10RecentOrder] = useState([]);
  const [top3BestUser, setTop3BestUser] = useState([]);
  const [revenueOfRooms, setRevenueOfRooms] = useState([]);
  //Radio
  const [value, setValue] = React.useState('line');
  const [time, setTime] = React.useState('month');

  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };
  const handleRadioTimeChange = (event) => {
    setTime(event.target.value);
  };

  const [month, setMonth] = React.useState(new Date().getMonth()+1);
  const [year, setYear] = React.useState(new Date().getFullYear());
  const handleChange = (event) => {
    setMonth(event.target.value);
  };
  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };
  const formatter = new Intl.NumberFormat('vi', {
    style: 'currency',
    currency: 'VND',
  });
  //Load data from server
  const loadDataCardInMonth = (value) => {
    try {
        const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `/admin/dataCardDashboardInMonth/${value}`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        axios.request(config).then((res) => setDataCard(res.data.object));
    } catch {
        window.location = '/login';
    }
};
const loadChartDataInMonth = (value) => {
  try {
      const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
      let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `/admin/dataChartInMonth/${value}`,
          headers: {
              Authorization: `Bearer ${accessToken}`,
          },
      };
      axios.request(config).then((res) => setChartData(res.data.object));
  } catch {
      window.location = '/login';
  }
};
const loadDataCardInYear = (value) => {
  try {
      const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
      let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `/admin/dataCardDashboardInYear/${value}`,
          headers: {
              Authorization: `Bearer ${accessToken}`,
          },
      };
      axios.request(config).then((res) => setDataCard(res.data.object));
  } catch {
      window.location = '/login';
  }
};
const loadChartDataInYear = (value) => {
try {
    const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `/admin/dataChartInYear/${value}`,
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
const loadRevenueOfRoomInYear = (value) => {
  try {
      const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
      let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `/admin/revenueOfRoomInYear/${value}`,
          headers: {
              Authorization: `Bearer ${accessToken}`,
          },
      };
      axios.request(config).then((res) => setRevenueOfRooms(res.data.object));
  } catch {
      window.location = '/login';
  }
};
const loadRevenueOfRoomInMonth = (value) => {
  try {
      const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
      let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `/admin/revenueOfRoomInMonth/${value}`,
          headers: {
              Authorization: `Bearer ${accessToken}`,
          },
      };
      axios.request(config).then((res) => setRevenueOfRooms(res.data.object));
  } catch {
      window.location = '/login';
  }
};

useEffect(() => {
  if(time == "month")
  {
    loadDataCardInMonth(month);
    loadChartDataInMonth(month);
    loadRevenueOfRoomInMonth(month);
  }else{
    loadDataCardInYear(year);
    loadChartDataInYear(year);
    loadRevenueOfRoomInYear(year);
  }
  loadRecent10OrderData();
  loadTop3BestUser();
}, [time, month, year]);
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

  const dataPieRoomChart = revenueOfRooms.map((item,index)=>({
    id: index + 1,
    value: item.revenue,
    label: item.roomName,
  }))
    
  console.log(chartData)
  console.log(dataLineChart)
  console.log(dataPieChart)

  return (
    <Box m="0px 20px 20px 20px">
      
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
          <RadioGroup value={time} onChange={handleRadioTimeChange}>
          <Box display="flex">
            <FormControlLabel  value="month" control={<Radio sx={{ '& .MuiSvgIcon-root': {fontSize: 14,},}}/>} label="Tháng" />
            <FormControl sx={{ m: 1, width: 80, height: 50 }}>
              <InputLabel>Tháng</InputLabel>
              <Select
                value={month}
                onChange={handleChange}
                disabled = {time === "year"}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={11}>11</MenuItem>
                <MenuItem value={12}>12</MenuItem>
              </Select>
            </FormControl>
            </Box>
            <Box display="flex">
            <FormControlLabel value="year" control={<Radio sx={{ '& .MuiSvgIcon-root': {fontSize: 14,},}}/>} label="Năm" />
            <FormControl sx={{ m: "0px 0px 10px 17px", width: 80, height: 50 }}>
              <InputLabel>Năm  </InputLabel>
              <Select
                value={year}
                onChange={handleChangeYear}
                disabled = {time === "month"}
              >
                <MenuItem value={2023}>2023</MenuItem>
                <MenuItem value={2024}>2024</MenuItem>
                <MenuItem value={2025}>2025</MenuItem>
                <MenuItem value={2026}>2026</MenuItem>
                <MenuItem value={2027}>2027</MenuItem>
              </Select>
            </FormControl>
            </Box>
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
               Top 5 sản phẩm doanh thu cao nhất
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
              height={200}
            />}
            
            <RadioGroup value={value} onChange={handleRadioChange}>
            <FormControlLabel  value="line"  control={<Radio sx={{ '& .MuiSvgIcon-root': {fontSize: 14, color: "white"},}} />} label="Line" />
            <FormControlLabel  value="bar" control={<Radio sx={{ '& .MuiSvgIcon-root': {fontSize: 14, color: "white"},}}/>} label="Bar" />
            <FormControlLabel value="pie" control={<Radio sx={{ '& .MuiSvgIcon-root': {fontSize: 14, color: "white"},}}/>} label="Pie" />
          </RadioGroup>
          </Box>
          
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 4"
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
          gridColumn="span 8"
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
            <PieChart
              series={[
                {
                  data: dataPieRoomChart,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                },
              ]}
              height={200}
            />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "10px" }}
            >
              
            </Typography>
            <Typography></Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Dashboard