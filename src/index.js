// import React, { createContext, useState, useContext } from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./main.css";
// import Navbar from "./Components/Navbar/Navbar";
// import Home from "./Components/Home/Home";
// import InputToken from "./Components/InputToken/InputToken";
// import {BrowserRouter,Routes,Route} from 'react-router-dom'
// import History from "./Components/History/History";
// import Login from "./Components/Login/Login";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   // <React.StrictMode>
//     <BrowserRouter>
//     <Navbar/>
//     <Login/>
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/accesstokenfacebook" element={<InputToken />} />
//       <Route path="/historysharepx" element={<History />} />
//     </Routes>
//     </BrowserRouter>
//   // </React.StrictMode>
// );
import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import InputToken from "./Components/InputToken/InputToken";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import History from "./Components/History/History";
import Login from "./Components/Login/Login";
import { AuthProvider } from "./Components/AuthContext/AuthContext"; // Import AuthContext
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute"; // Import PrivateRoute
import Historyadmin from "./Components/HistoryAdmin/Historyadmin";
import Historytotal from "./Components/Historytotaladmin/Historytotal";
import { SpeedInsights } from "@vercel/speed-insights/react"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <Navbar />
      <SpeedInsights/>
      <Routes>
        <Route
          path="/"
          element={<PrivateRoute element={<Home />} />}
        />
        <Route
          path="/accesstokenfacebook"
          element={<PrivateRoute element={<InputToken />} />}
        />
        <Route
          path="/historysharepx"
          element={<PrivateRoute element={<History />} />}
        />
        <Route
          path="/historysharepxadmin"
          element={<PrivateRoute element={<Historyadmin />} />}
        />
        <Route
          path="/historysharepxtotal"
          element={<PrivateRoute element={<Historytotal />} />}
        />
        <Route path="/login" element={<Login />} /> {/* Đường dẫn tới trang login */}
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
