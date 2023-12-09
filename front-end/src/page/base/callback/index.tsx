import React, { useEffect, useState } from "react";
import axios from "axios";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../../../services/user";
import { useCreateInvoiceMutation } from "../../../services/invoice";

interface PaymentResultProps {
  isSuccess: boolean;
  title: string;
  subTitle: string;
  handle: () => void;
}

const PaymentResult: React.FC<PaymentResultProps> = ({
  isSuccess,
  title,
  subTitle,
  handle,
}) => {
  const redirectHome = () => {
    window.location.href = "/";
  };
  return (
    <Result
      status={isSuccess ? "success" : "error"}
      title={title}
      subTitle={subTitle}
      extra={
        isSuccess
          ? [
              <Button type="primary" key="back" onClick={handle}>
                Về Trang Chủ
              </Button>,
            ]
          : [
              <Button key="home" onClick={redirectHome} type="primary">
                Về Trang Chủ
              </Button>,
            ]
      }
    />
  );
};

const CallbackVNPAY: React.FC = () => {
  const [vnpResponse, setVnpResponse] = useState<any>(null);
  const navigate = useNavigate();
  const [addInvoice] = useCreateInvoiceMutation();
  const { data: user } = useGetUserQuery();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const apiUrl = "http://localhost:8080/api/vnpay_return";
        const apiResponse = await axios.get(apiUrl, {
          params: Object.fromEntries(urlParams),
        });

        setVnpResponse(apiResponse.data);

        const vnp_TxnRef = urlParams.get("vnp_TxnRef");
        const vnp_OrderInfo = urlParams.get("vnp_OrderInfo");

        if (apiResponse.data.responseCode === "00") {
          if (user?.id) {
            await addInvoiceVNPAY();
          }
          sendCallbackInfo({
            vnp_ResponseCode: apiResponse.data.responseCode,
            vnp_TxnRef,
            vnp_OrderInfo,
          });
        }
      } catch (error) {
        console.error("Error", error);
      }
    };

    const sendCallbackInfo = async (callbackInfo: any) => {
      try {
        const callbackApiUrl = "http://localhost:8080/api/callbackVNPAY";
        await axios.post(callbackApiUrl, callbackInfo);
        console.log("Callback success!");
      } catch (error) {
        console.error("Error", error);
      }
    };

    const addInvoiceVNPAY = async () => {
      const paymentInfo = JSON.parse(
        localStorage.getItem("paymentInfo") || "{}"
      );
      console.log("paymentInfo", paymentInfo);

      try {
        const amount = parseInt(paymentInfo.total, 10);
        const appointmentId = parseInt(paymentInfo.id, 10);
        console.log("userid", user?.id);
        console.log("giá", amount);
        console.log("appointmenid", appointmentId);

        await addInvoice({
          user_id: user?.id,
          paymentMethod: "VNPAY",
          amount: amount,
          appointments_id: appointmentId,
        });
      } catch (error) {
        console.error("Error adding invoice", error);
      }
    };

    fetchData();
  }, [addInvoice, user, user?.id]);

  const handleContinue = () => {
    navigate("/");
  };

  return (
    <div>
      <div>
        {vnpResponse && (
          <PaymentResult
            isSuccess={vnpResponse.responseCode === "00"}
            title={
              vnpResponse.responseCode === "00"
                ? "Thanh toán thành công!"
                : "Thanh toán bị hủy!"
            }
            subTitle={
              vnpResponse.responseCode === "00"
                ? "Cảm ơn bạn đã thanh toán!"
                : "Đơn hàng của bạn đã bị hủy."
            }
            handle={handleContinue}
          />
        )}
      </div>
    </div>
  );
};

export default CallbackVNPAY;
