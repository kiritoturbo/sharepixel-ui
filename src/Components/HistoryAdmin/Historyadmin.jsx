import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { DataGrid } from "@mui/x-data-grid";
import { Typography, Box,TextField, Button  } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Historyadmin = () => {
  const [data, setData] = useState([]);
  const getTodayInUTC7 = () => {
    return moment().utcOffset("-07:00").format("YYYY-MM-DD");
  };
  const [startDate, setStartDate] = useState(getTodayInUTC7()); // Giá trị mặc định
  const [endDate, setEndDate] = useState(getTodayInUTC7()); // Giá trị mặc định
  const apiUrl = process.env.REACT_APP_API_URL;

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       // Lấy token từ localStorage
  //       const token = localStorage.getItem("token");
  //       if (!token) {
  //         toast.error("Token not found. Please log in.");
  //         return;
  //       }
  //       const response = await axios.get(`${apiUrl}tokenfb/gettokenfbforadmin`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`, // Gửi token trong header Authorization
  //         },
  //         params: { startDate, endDate },
  //       });

  //       // Chuyển đổi dữ liệu từ object sang array
  //       const transformedData = Object.entries(response.data.data).map(([key, value], index) => ({
  //         id: index + 1, // Tạo id duy nhất
  //         idKey: key, // Lấy key như là ID (ví dụ: 4222)
  //         ...value, // Sao chép các thuộc tính bên trong object
  //       }));

  //       setData(transformedData);
  //     } catch (error) {
  //       toast.error(error.response?.data?.mes || "Error fetching data");
  //     }
  //   }
  //   fetchData();
  // }, []);

  // Định nghĩa các cột cho DataGrid
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Token not found. Please log in.");
        return;
      }

      const response = await axios.get(`${apiUrl}tokenfb/gettokenfbforadmin`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { startDate, endDate },
      });

      const transformedData = Object.entries(response.data.data).map(([key, value], index) => ({
        id: index + 1,
        idKey: key,
        ...value,
      }));

      setData(transformedData);
    } catch (error) {
      toast.error(error.response?.data?.mes || "Error fetching data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const columns = [
    { field: "idKey", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 2},
    { field: "totalShares", headerName: "Total Shares", flex: 1 },
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
            {/* Chọn ngày động */}
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
              disableSelectionOnClick
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Historyadmin;
