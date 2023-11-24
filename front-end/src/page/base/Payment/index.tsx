import React, { useEffect, useState } from "react";
import "../../../assets/scss/page/paymentPage.scss";
import logo from "../../../assets/image/logo.png";
import axios from "axios";
const API_URL = "http://127.0.0.1:8080/api";
const PaymentPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(loadingTimeout);
  }, []);
  const handlePayment = () => {
    axios
      .post(`${API_URL}/create-payment`, { amount: 100000 })
      .then((response) => {
        window.location.href = response.data.paymentUrl;
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };
  return (
    <div className="payment-page">
      {" "}
      {isLoading ? (
        <div className="loading-overlay">
          {" "}
          <div className="loader"></div>{" "}
        </div>
      ) : null}{" "}
      <div className="h-payment">
        {" "}
        <img src={logo} alt="logo" />{" "}
      </div>{" "}
      <div className="h-payment">
        {" "}
        <h1>Chọn phương thức thanh toán</h1>{" "}
      </div>{" "}
      <div className="payment-options">
        {" "}
        <div className="payment-padding btn-f bg-with">
          {" "}
          <h3 className="">Thanh Toán Bằng Tiền Mặt</h3>{" "}
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1vztU8IzuRgDR1QVXxz5LVwtjwOm2YW2h9w&usqp=CAU"
            alt="VNPAY"
            className="payment-image"
          />{" "}
        </div>{" "}
        <div className="payment-padding btn-f bg-with" onClick={handlePayment}>
          {" "}
          <h3 className="">Thanh Toán Online VNPAY</h3>{" "}
          <img
            src="https://sandbox.vnpayment.vn/paymentv2/images/icons/mics/64x64-vi-vnpay.svg"
            alt="VNPAY"
            className="payment-image"
          />{" "}
        </div>{" "}
        <div className="payment-padding btn-f bg-with">
          {" "}
          <h3 className="">Thanh Toán Online MoMo</h3>{" "}
          <img
            src="https://i.imgur.com/1CPJVhy.jpg"
            alt="MoMo"
            className="payment-image"
          />{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
export default PaymentPage;
