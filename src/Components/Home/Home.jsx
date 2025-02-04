// import React, { useEffect, useState } from "react";
// import axios from 'axios';
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"; // Import CSS của react-toastify

// const Home = () => {
//   const [data, setData] = useState([]);
//   const [results, setResults] = useState("");
//   const apiUrl =process.env.REACT_APP_API_URL

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await axios.get('https://truestore.vn/wp-json/api/v1/getlistpixeladmin');
//         setData(response.data.data);
//         // console.log(response.data.data)
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     fetchData();
//   }, []);


//   // const handleSharePixel = async () => {
//   //   // Lấy giá trị từ textarea
//   //   const textarea = document.getElementById("idads");
//   //   const idAdsList = textarea.value.split("\n").map((id) => id.trim()).filter((id) => id);

//   //   // Lấy các checkbox được chọn
//   //   const checkboxes = Array.from(document.querySelectorAll(".checkbox__input:checked"));
//   //   const selectedPixels = checkboxes.map((checkbox) => ({
//   //     idpixel: checkbox.dataset.idpixel,
//   //     bmid: checkbox.dataset.bmid,
//   //   }));

//   //   if (!idAdsList.length || !selectedPixels.length) {
//   //     toast.error("Vui lòng chọn ít nhất một tài khoản quảng cáo và một pixel.");
//   //     return;
//   //   }

//   //   // Gửi request cho từng pixel và từng ID quảng cáo
//   //   try {
//   //     for (const pixel of selectedPixels) {
//   //       for (const idAds of idAdsList) {
//   //         await axios.post(`${apiUrl}tokenfb/sharepixelfb`, {
//   //           idpixel: pixel.idpixel,
//   //           idads: idAds,
//   //           idbm: pixel.bmid,
//   //         });
//   //       }
//   //     }
//   //     toast.success("Pixel đã được share thành công!");
//   //   } catch (error) {
//   //     console.error(error);
//   //     toast.error("Có lỗi xảy ra khi share pixel.");
//   //   }
//   // };
//   const handleSharePixel = async () => {

//     const textarea = document.getElementById("idads");
//     const idAdsList = textarea.value.split("\n").map((id) => id.trim()).filter((id) => id);
  
//     // Kiểm tra từng giá trị trong idAdsList
//     const isValid = idAdsList.every((id) => /^\d+$/.test(id));
//     if (!isValid) {
//       toast.error("Vui lòng chỉ nhập các số, không được có chữ trong danh sách ID quảng cáo.");
//       return;
//     }

//     const checkboxes = Array.from(document.querySelectorAll(".checkbox__input:checked"));
//     const selectedPixels = checkboxes.map((checkbox) => ({
//       idpixel: checkbox.dataset.idpixel,
//       bmid: checkbox.dataset.bmid,
//     }));
  
//     if (!idAdsList.length || !selectedPixels.length) {
//       toast.error("Vui lòng chọn ít nhất một tài khoản quảng cáo và một pixel.");
//       return;
//     }
  
//     try {
//       // Sử dụng vòng lặp để gửi yêu cầu theo từng nhóm nhỏ
//       const chunkSize = 50; // Giới hạn mỗi nhóm là 50 yêu cầu
//       for (let i = 0; i < selectedPixels.length; i += chunkSize) {
//         const chunk = selectedPixels.slice(i, i + chunkSize);
//         const promises = chunk.map((pixel) =>
//           idAdsList.map((idAds) =>
//             axios.post(`${apiUrl}tokenfb/sharepixelfb`, {
//               idpixel: pixel.idpixel,
//               idads: idAds,
//               idbm: pixel.bmid,
//             })
//             .then((response) => {
//               if (response.data.success) {
//                 setResults((prev) => prev + `Pixel ${pixel.idpixel} được share thành công cho tài khoản quảng cáo ${idAds}\n`);
//               } else {
//                 setResults((prev) => prev + `******Không thể share pixel ${pixel.idpixel} cho tài khoản quảng cáo ${idAds}. Token: ${response.data.usedToken}*****\n`);
//               }
//             })
//             .catch((error) => {
//               setResults((prev) => prev + `**********Lỗi khi share pixel ${pixel.idpixel} cho tài khoản quảng cáo ${idAds}: ${error.message}*******\n`);
//             })
//           )
//         );
//         await Promise.all(promises.flat());
//         await new Promise((resolve) => setTimeout(resolve, 2000)); 
//       }


//       // toast.success("Tất cả pixel đã được share thành công!");
//     } catch (error) {
//       console.error(error);
//       toast.error("Có lỗi xảy ra khi share pixel-Liên hệ Trường Dev");
//     }
//   };
  
  
//   return (
//     <div className="home flex container">
//       <ToastContainer />
//       <div className="mainText">
//         <h1>Share pixel</h1>
//       </div>
//       <div className="homeBoxLeftRight">
//         <div className="homeContentLeft">
//           <label htmlFor="idads">ID Tài Khoản Quảng Cáo</label>
//           <textarea
//             id="idads"
//             placeholder={`1 item on a single line\nID_Ads_1\nID_Ads_2\n...\nID_Ads_10`}
//             rows="15"
//             cols="50"
//           ></textarea>
//           <button className="btn submitSharePixel" onClick={handleSharePixel}>
//             Share Pixel
//           </button>
//           <div className="shareResults" 
//           style={{ marginTop: '20px', whiteSpace: 'pre-wrap', wordBreak: 'break-word',textAlign:'justify' }}
//           >
//             {results}
//           </div>
//         </div>
//         <div className="homeContentRight">
//           <label htmlFor="">Danh sách pixel</label>
//           <div className="homeListCheckboxPixel">
//             <div className="input-group">
//               {data.map((user) => (
//                 <label className="checkbox" key={user.id}>
//                   <input
//                     className="checkbox__input"
//                     data-idpixel={user.idpixel}
//                     data-bmid={user.BMpixel}
//                     type="checkbox"
//                     name="dummy1"
//                   />
//                   <span className="checkbox__label">
//                     <span>{user.namepixel}</span>
//                     <span>{user.idpixel}</span>
//                   </span>
//                 </label>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
      
//     </div>
//   );
// };

// export default Home;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import * as XLSX from "xlsx"; // Import thư viện xlsx
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [data, setData] = useState([]);
  const [results, setResults] = useState("");
  const [resultsArray, setResultsArray] = useState([]); // Lưu kết quả dạng mảng
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
                if (!token) {
                  toast.error("Token not found. Please log in.");
                  return;
                }
        const response = await axios.get(
          `https://truestore.vn/wp-json/api/v1/getlistpixeladmin?accesstoken=${token}`
        );
        setData(response.data.data.results);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          // Nếu mã lỗi 401 (Unauthorized), có thể là token hết hạn
          toast.error("Token has expired. Please log in again.");
          localStorage.removeItem("token"); 
          
          setTimeout(() => {
            window.location.href = "/login"; 
          }, 3000); 
        } else {
          toast.error(error.response?.data?.mes || "Lỗi khi xử lý yêu cầu");
        }
      }
    }
    fetchData();
  }, []);

  const handleSharePixel = async () => {
    setIsLoading(true);
    const textarea = document.getElementById("idads");
    const idAdsList = textarea.value
      .split("\n")
      .map((id) => id.trim())
      .filter((id) => id);

    const isValid = idAdsList.every((id) => /^\d+$/.test(id));
    if (!isValid) {
      toast.error(
        "Vui lòng chỉ nhập các số, không được có chữ trong danh sách ID quảng cáo."
      );
      setIsLoading(false);
      return;
    }

    const checkboxes = Array.from(
      document.querySelectorAll(".checkbox__input:checked")
    );
    const selectedPixels = checkboxes.map((checkbox) => ({
      idpixel: checkbox.dataset.idpixel,
      bmid: checkbox.dataset.bmid,
    }));

    if (!idAdsList.length || !selectedPixels.length) {
      toast.error(
        "Vui lòng chọn ít nhất một tài khoản quảng cáo và một pixel."
      );
      setIsLoading(false);
      return;
    }

    try {
      // Lấy token từ localStorage
      const token = localStorage.getItem("token"); 
      if (!token) {
        toast.error("Token not found. Please log in.");
        return;
      }
      const chunkSize = 50;
      for (let i = 0; i < selectedPixels.length; i += chunkSize) {
        const chunk = selectedPixels.slice(i, i + chunkSize);
        const promises = chunk.map((pixel) =>
          idAdsList.map((idAds) =>
            axios
              .post(`${apiUrl}tokenfb/sharepixelfb`, {
                idpixel: pixel.idpixel,
                idads: idAds,
                idbm: pixel.bmid,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Gửi token từ localStorage trong header
                },
              })
              .then((response) => {
                const result = response.data.success
                  ? `Pixel ${pixel.idpixel} - share thành công cho tài khoản quảng cáo ${idAds}`
                  : `******Không thể share pixel ${pixel.idpixel} cho tài khoản quảng cáo ${idAds}*****`;
                setResults((prev) => prev + result + "\n");
                setResultsArray((prev) => [
                  ...prev,
                  { idpixel: pixel.idpixel, idads: idAds, status: result },
                ]);
              })
              .catch((error) => {
                console.log(error)
                const errorMessage = `**********Lỗi khi share pixel ${pixel.idpixel} cho tài khoản quảng cáo ${idAds}: ${error.response.data.mess||error.message}*******`;
                setResults((prev) => prev + errorMessage + "\n");
                setResultsArray((prev) => [
                  ...prev,
                  { idpixel: pixel.idpixel, idads: idAds, status: errorMessage },
                ]);
              })
          )
        );
        await Promise.all(promises.flat());
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    } catch (error) {
      console.error(error);
      // toast.error("Có lỗi xảy ra khi share pixel-Liên hệ Trường Dev");
    }finally {
      setIsLoading(false); // Kết thúc tải
    }
  };
  
  
  const handleExportExcel = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${currentDate
        .getDate()
        .toString()
        .padStart(2, "0")}`;
    const worksheet = XLSX.utils.json_to_sheet(resultsArray);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "ShareResults");
    const fileName = `Share_results_${formattedDate}.xlsx`;
    // XLSX.writeFile(workbook, "Share_results.xlsx");
    // Xuất file
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div className="home flex container">
      <ToastContainer />
      <div className="mainText">
        <h1>Share pixel</h1>
      </div>
      <div className="homeBoxLeftRight">
        <div className="homeContentLeft">
          <label htmlFor="idads">ID Tài Khoản Quảng Cáo</label>
          <textarea
            id="idads"
            placeholder={`1 item on a single line\nID_Ads_1\nID_Ads_2\n...\nID_Ads_10`}
            rows="15"
            cols="50"
          ></textarea>
          <button className="btn submitSharePixel" onClick={handleSharePixel}>
            {isLoading ? "Đang xử lý..." : "Share Pixel"}
          </button>
          <button
            className="btn exportExcel"
            onClick={handleExportExcel}
            style={{ marginLeft: "10px" }}
          >
            Xuất Excel
          </button>
          <div
            className="shareResults"
            style={{
              marginTop: "20px",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              textAlign: "justify",
            }}
          >
            {results}
          </div>
        </div>
        <div className="homeContentRight">
          <label htmlFor="">Danh sách pixel</label>
          <div className="homeListCheckboxPixel">
            <div className="input-group">
              {data?.map((user) => (
                <label className="checkbox" key={user.id}>
                  <input
                    className="checkbox__input"
                    data-idpixel={user.idpixel}
                    data-bmid={user.BMpixel}
                    type="checkbox"
                    name="dummy1"
                  />
                  <span className="checkbox__label">
                    <span>{user.namepixel}</span>
                    <span>{user.idpixel}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

