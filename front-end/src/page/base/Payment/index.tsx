import React, { useEffect, useState, useRef } from "react";
import "../../../assets/scss/page/paymentPage.scss";
import { useParams, useNavigate, Link } from "react-router-dom";
import logo from "../../../assets/image/logo.png";
import axios from "axios";
import { useCreateInvoiceMutation } from "../../../services/invoice";
import { useGetUserQuery } from "../../../services/user";
import { useShowStatusPaymentQuery } from "../../../services/appointments";

const API_URL = "http://localhost:8080/api";

const PaymentPage = () => {
  const { id, total } = useParams();
  const navigate = useNavigate();
  const [addInvoice] = useCreateInvoiceMutation();
  const idRef = useRef(id);
  const totalRef = useRef(total);
  useEffect(() => {
    idRef.current = id;
    totalRef.current = total;
  }, [id, total]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(loadingTimeout);
  }, []);

  const { data: user } = useGetUserQuery();
  const { data: status_payment } = useShowStatusPaymentQuery(Number(id));

  const handlePayment = () => {
    axios
      .post(`${API_URL}/create-payment`, { appointmentID: id, amount: total })
      .then((response) => {
        localStorage.setItem("paymentInfo", JSON.stringify({ id, total }));
        window.location.href = response.data.paymentUrl;
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  const handlePaymentCash = async () => {
    const amount = totalRef.current
      ? parseInt(totalRef.current, 10)
      : undefined;
    const appointmentId = idRef.current
      ? parseInt(idRef.current, 10)
      : undefined;
    try {
      if (status_payment && status_payment.status_payment !== undefined) {
        if (status_payment.status_payment === 1) {
          const response = await addInvoice({
            user_id: user?.id,
            paymentMethod: "CASH",
            amount: amount,
            appointments_id: appointmentId,
          });

          console.log("Invoice creation response:", response);
          navigate(`/pay-cash`);
        } else if (status_payment.status_payment === 2) {
          console.log("Invoice has already been printed for this appointment.");
          navigate(`/pay-cash`);
        } else {
          console.log("Invalid status_payment:", status_payment);
        }
      } else {
        console.log("Status_payment is not defined or is undefined.");
      }
    } catch (error) {
      console.error("Error creating or navigating to the invoice", error);
    }
  };
  if (!user) {
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
        <div
          className="payment-padding btn-f bg-with"
          onClick={handlePaymentCash}
        >
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
