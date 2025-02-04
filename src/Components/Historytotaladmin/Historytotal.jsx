import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Typography, Box,TextField, Button } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import moment from 'moment'

const Historytotal = () => {
  const [data, setData] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const getTodayInUTC7 = () => {
    return moment().utcOffset("-07:00").format("YYYY-MM-DD");
  };
  const [startDate, setStartDate] = useState(getTodayInUTC7()); // Giá trị mặc định
  const [endDate, setEndDate] = useState(getTodayInUTC7()); // Giá trị mặc định

  const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        // Kiểm tra nếu không có token
        if (!token) {
          toast.error("Token không tồn tại, vui lòng đăng nhập lại!");
          return;
        }
        const response = await axios.get(`${apiUrl}tokenfb/getAllHistorySharePixeladmin?startDate=${startDate}&endDate=${endDate}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token trong header Authorization
          },
        });
        // setData(response.data.data.map((item, index) => ({ id: index + 1, ...item }))); 
        const sortedData = response?.data?.data
        .map((item, index) => ({ id: index + 1, ...item }))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sắp xếp theo thời gian gần nhất
      setData(sortedData); 
      } catch (error) {
        toast.error(error?.response?.data?.mes ||error?.response?.data?.mess||error.message)
        console.log(error?.response?.data?.mes);
      }
  }

  useEffect(() => {
      fetchData();
    }, []);

  // console.log(data)

  const columns = [
    { field: "idads", headerName: "ID Ads", width: 200 },
    { field: "idpixel", headerName: "ID Pixel", width: 200 },
    { field: "trangthai", headerName: "Status", width: 120 },
    { field: "tokenbm", headerName: "Token BM", width: 300 },
    { field: "name", headerName: "User", width: 300 },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
      valueFormatter: ( value ) => {
        if (!value) return "N/A"; // Trả về "N/A" nếu không có giá trị
        return moment(value).utcOffset('-07:00').format('YYYY-MM-DD HH:mm:ss');
      }
    },
  ];

  return (
    <div className="home flex container">
            <ToastContainer />
      
      <div className="homeBoxLeftRight homehistoryshare">
        <div className="homeContentLeft homehistoryitem">
          <Box sx={{ height: "100%", width: "100%" }}>
            <Typography variant="h4" gutterBottom>
              History Share Pixel For Admin
            </Typography>
            <Box display="flex" gap={2} mb={2}>
              <TextField
                label="Start Date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="End Date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
              <Button variant="contained" onClick={fetchData}>
                Load Data
              </Button>
            </Box>
            <DataGrid
              rows={data}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5, 10, 20]}
              // checkboxSelection
              disableSelectionOnClick
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Historytotal;
