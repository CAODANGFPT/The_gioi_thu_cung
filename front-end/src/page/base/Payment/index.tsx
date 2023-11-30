import React, { useEffect, useState } from "react";
import "../../../assets/scss/page/paymentPage.scss";
import { Link, useParams } from "react-router-dom";
import logo from "../../../assets/image/logo.png";
import axios from "axios";
const API_URL = "http://localhost:8080/api";
const PaymentPage = () => {
  const { id, total } = useParams();
  console.log("Appointment ID nhận được:", id);
  console.log("Tiền nhận được:", total);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(loadingTimeout);
  }, []);
  const handlePayment = () => {
    axios
      .post(`${API_URL}/create-payment`, { amount: total })
      .then((response) => {
        window.location.href = response.data.paymentUrl;
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <div className="login-now">
        <p>Bạn chưa đăng nhập.</p>
        <img src={logo} alt="logo" />
        <Link to="/SignIn">Đăng nhập ngay</Link>
      </div>
    );
  }
  return (
    <div className="payment-page">
      {isLoading ? (
        <div className="loading-overlay">
          <div className="loader"></div>
        </div>
      ) : null}
      <div className="h-payment">
        <img className="logo" src={logo} alt="logo" />
      </div>
      <div className="h-payment">
        <h1>Chọn phương thức thanh toán</h1>
      </div>
      <div className="payment-options">
        <div className="payment-padding btn-f bg-with">
          <h3 className="">Thanh Toán Bằng Tiền Mặt</h3>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1vztU8IzuRgDR1QVXxz5LVwtjwOm2YW2h9w&usqp=CAU"
            alt="VNPAY"
            className="payment-image"
          />
        </div>
        <div className="payment-padding btn-f bg-with" onClick={handlePayment}>
          <h3 className="">Thanh Toán Online VNPAY</h3>
          <img
            src="https://sandbox.vnpayment.vn/paymentv2/images/icons/mics/64x64-vi-vnpay.svg"
            alt="VNPAY"
            className="payment-image"
          />
        </div>
      </div>
    </div>
  );
};
export default PaymentPage;
