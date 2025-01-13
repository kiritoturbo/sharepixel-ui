// src/Components/Login/Login.js
import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useAuth } from "../AuthContext/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `https://truestore.vn/wp-json/api/v1/checkloginsharepixel`,
        { username, password }
      );
      if (response.data.success) {
        const token = response.data.data.accesstoken; 
        login(token); 
        window.location.href = "/";
      } else {
        toast.error("Invalid login credentials.");
      }
    } catch (error) {
      if (error.response) {
        // Máy chủ trả về phản hồi lỗi
        const status = error.response.status;
        const message = error.response.data.data.message || "An error occurred.";
        toast.error(`Error ${status}: ${message}`);
      } else if (error.request) {
        // Không nhận được phản hồi từ máy chủ
        toast.error("No response received from the server.");
      } else {
        // Lỗi khác
        toast.error("An error occurred: " + error.message);
      }
      // console.error("Login error:", error);
    
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Paper elevation={3} sx={{ padding: 4, width: 400, position: "relative",overflow:'hidden' }}>
      <div style={{
          width: "100%",
          whiteSpace: "nowrap",
          overflow: "hidden",
          position: "absolute",
          // top: "-20px",
          bottom:"8px",
          // backgroundColor: "#1976d2",
          color: "#000",
          fontWeight: "bold",
          animation: "marquee 10s linear infinite",
          textAlign: "center"
        }}>
          Login with account Truestore
        </div>
        <Typography variant="h5" sx={{ marginBottom: 2, textAlign: "center" }}>Login</Typography>
        <TextField
          fullWidth
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <ToastContainer />
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginBottom: 2 }}
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
        />
        <Button fullWidth variant="contained" color="primary" onClick={handleLogin}>Login</Button>
      </Paper>
    </Box>
  );
};

export default Login;
