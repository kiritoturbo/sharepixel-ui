import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const InputToken = () => {
  const apiUrl =process.env.REACT_APP_API_URL
  const [result, setResult] = useState(""); // Kết quả trả về từ API
  const [loading, setLoading] = useState(false); // Trạng thái loading

  const handleUpdateToken = async () => {
    const tokenText = document.getElementById("input-124").value;
    const bmid = document.getElementById("listbmid").value;

    if (!tokenText.trim() ) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    // Xử lý dữ liệu textarea
    const tokenbm = tokenText
      .split(/[\n\s]+/) // Tách bởi xuống dòng hoặc khoảng trắng
      .filter((token) => token.trim()) // Loại bỏ các phần tử rỗng
      .join("|"); // Ghép bằng dấu |

    try {
      setLoading(true);
        const token = localStorage.getItem("token"); 
        if (!token) {
          toast.error("Token not found. Please log in.");
          return;
        }
          axios
              .post(`${apiUrl}tokenfb/updatetokenfb`, {
                tokenbm, bmid
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Gửi token từ localStorage trong header
                },
              })
              .then((response) => {
                console.log(response)
                // const data = response.json();
                if(response.status==200){
                  setResult(response.data.mess || "Cập nhật thành công!");

                }
              })
              .catch((error) => {
                // toast.error(error.response.data.mes)
                // setResult(`Lỗi: ${error.message}`);
                if (error.response && error.response.status === 401) {
                  // Nếu mã lỗi 401 (Unauthorized), có thể là token hết hạn
                  toast.error("Token has expired. Please log in again.");
                  localStorage.removeItem("token"); // Xóa token khỏi localStorage
                  // Chuyển hướng đến trang đăng nhập
                  setTimeout(() => {
                    window.location.href = "/login"; // Chuyển hướng đến trang đăng nhập
                  }, 3000); 
                } else {
                  toast.error(error.response?.data?.mes || "Lỗi khi xử lý yêu cầu");
                  setResult(`Lỗi: ${error.message}`);
                }
              })
      
    } catch (error) {
      setResult(`Lỗi: ${error.message}`);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home flex container">
      <ToastContainer />
      <div className="mainText">
        <h1>Update Token Admin</h1>
      </div>
      <div className="homeBoxLeftRight">
        <div className="homeContentLeft">
          <textarea
            id="input-124"
            placeholder="Nhập list token mới"
            rows="15"
            cols="500"
          ></textarea>
          <input type="hidden" placeholder="Nhập BM ID" id="listbmid"  />
          <button
            className="btn submitSharePixel"
            onClick={handleUpdateToken}
            disabled={loading}
          >
            {loading ? "Đang cập nhật..." : "Update token"}
          </button>
        </div>
        <div className="homeContentRight">
          <label htmlFor="">Kết quả</label>
          <div className="homeListCheckboxPixel">{result}</div>
        </div>
      </div>
    </div>
  );
};

export default InputToken;
