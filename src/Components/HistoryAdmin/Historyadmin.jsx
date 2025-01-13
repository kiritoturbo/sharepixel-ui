import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Typography, Box } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Historyadmin = () => {
  const [data, setData] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        // Lấy token từ localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Token not found. Please log in.");
          return;
        }
        const response = await axios.get(`${apiUrl}tokenfb/gettokenfbforadmin`, {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token trong header Authorization
          },
          params: {
            startDate: '2025-01-10', 
            endDate: '2025-01-10', 
          },
        });

        // Chuyển đổi dữ liệu từ object sang array
        const transformedData = Object.entries(response.data.data).map(([key, value], index) => ({
          id: index + 1, // Tạo id duy nhất
          idKey: key, // Lấy key như là ID (ví dụ: 4222)
          ...value, // Sao chép các thuộc tính bên trong object
        }));

        setData(transformedData);
      } catch (error) {
        toast.error(error.response?.data?.mes || "Error fetching data");
      }
    }
    fetchData();
  }, []);

  // Định nghĩa các cột cho DataGrid
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
              History Share Pixel
            </Typography>
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
