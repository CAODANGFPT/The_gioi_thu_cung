import { Radio, message } from "antd";
import React, { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../../assets/scss/page/orderPay.scss";
import Location from "../../../assets/svg/loaction";
import { useCreateOrderMutation } from "../../../services/order";
import { useGetAllPaymentMethodsQuery } from "../../../services/paymentMethods";
// import { CheckCircleFilled } from "@ant-design/icons";
// import vnpay from "../../../assets/image/logoVNPAY.jpeg";
import axios from "axios";
const API_URL = "http://localhost:8080/api";
type Props = {};

const OrderPay: FC<Props> = () => {
  const shippingCost: number = 10000;
  const [status_id, setStatusId] = useState<number>();
  const [paymentMethods_id, setPaymentMethods_id] = useState<number>(1);
  const { data: getAllPaymentMethods } = useGetAllPaymentMethodsQuery();
  const [createOrder] = useCreateOrderMutation();
  const [note, setNote] = useState<string | null>();
  const navigate = useNavigate();
  const location = useLocation();
  const [data] = useState<any>(location.state?.data);

  useEffect(() => {
    if (!data) {
      navigate("/shoppingCart");
    }
  }, [data, navigate]);

  const calculateTotalAmount = () => {
    let totalAmount = 0;
    data.products.forEach(
      (item: { id: number; price: number; quantity: number }) => {
        totalAmount += item.price * item.quantity;
      }
    );
    return totalAmount;
  };
  useEffect(() => {
    if (paymentMethods_id === 1) {
      setStatusId(2);
    } else {
      setStatusId(1);
    }
  }, [paymentMethods_id]);

  const onSubmit = async () => {
    const dataSubmit = {
      user_id: data.userId,
      products: [
        ...data.products.map(
          (product: { id: any; quantity: any; price: any }) => ({
            id: product.id,
            quantity: product.quantity,
            price: product.price,
          })
        ),
      ],
      total: calculateTotalAmount() + shippingCost,
      note: note,
      paymentMethods_id: paymentMethods_id,
      status_payment: 1,
      address_id: 2,
      status_id: status_id,
    };
    console.log(dataSubmit);
    try {
      const res = await createOrder(dataSubmit);
      if ("data" in res) {
        const orderId = res.data.id;
        const totalAmount = calculateTotalAmount() + shippingCost;
        message.success("Đặt hàng thành công");
        if (paymentMethods_id === 1) {
          axios
            .post(`${API_URL}/create-payment`, {
              OrderID: orderId,
              amount: totalAmount,
            })
            .then((response) => {
              localStorage.setItem(
                "paymentInfo",
                JSON.stringify({ orderId, totalAmount })
              );
              window.location.href = response.data.paymentUrl;
            })
            .catch((error) => {
              console.error("Error", error);
            });
        } else {
        }
      } else {
        message.error("Đặt thất bại");
      }
    } catch (error) {
      message.error("Đặt thất bại");
    }
  };

  const onChange = (e: any) => {
    setPaymentMethods_id(e.target.value);
  };
  return (
    <>
      <div className="container-order">
        <div className="orderPay">
          <h3>Thông tin thanh toán </h3>
          <div className="orderPay-address">
            <div className="orderPay-address-border"></div>
            <div className="orderPay-address-title">
              <div className="orderPay-address-title-icon">
                <Location /> Địa chỉ nhận hàng
              </div>
              <div className="orderPay-address-title-item">
                <div className="orderPay-address-title-item-user">
                  Nguyễn Văn Hải (+84) 971397545
                </div>
                <div>
                  140 vũ trọng phụng, Phường Minh Khai, Thành Phố Hưng Yên, Hưng
                  Yên
                </div>
              </div>
            </div>
          </div>

          <div className="orderPay-product">
            <table className="orderPay-product-table thead">
              <thead className="orderPay-product-table-thead">
                <tr className="orderPay-product-table">
                  <th className="product">
                    <p>Sản phẩm</p>
                  </th>
                  <th className="price">Đơn giá</th>
                  <th className="quantity">Số lượng</th>
                  <th className="sum">Thành tiền</th>
                </tr>
              </thead>
            </table>
            <table className="orderPay-product-table tbody">
              <tbody className="orderPay-product-table">
                {data.products &&
                  data.products.map((data: any) => (
                    <tr key={data.id}>
                      <td className="product">
                        <div className="product-item">
                          <div className="product-item-img">
                            <img src={data.img} alt="" />
                          </div>
                          <div className="product-item-text">
                            <div className="product-item-text-title">
                              {data.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="price">
                        {data.price.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </td>
                      <td className="quantity">{data.quantity}</td>
                      <td className="sum">
                        {" "}
                        {(data.price * data.quantity).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="orderPay-product-node">
              <form action="" className="orderPay-product-node-form">
                <div>Lời nhắn:</div>
                <input
                  style={{ width: 300 }}
                  type="text"
                  placeholder="Lưu ý cho cửa hàng"
                  onChange={(e) => setNote(e.target.value)}
                />
              </form>
            </div>
            <div className="orderPay-product-total">
              <p>Tổng số tiền ({data.products.length} sản phẩm): </p>
              <div>
                {new Intl.NumberFormat("vi-VN").format(calculateTotalAmount())}
                <span style={{ fontSize: 16, color: "#00575c" }}> VNĐ</span>
              </div>
            </div>
          </div>

          <div className="orderPay-paymentMethods">
            <div className="orderPay-paymentMethods-title">
              <div>Phương thức thanh toán:</div>
              <Radio.Group
                onChange={onChange}
                value={paymentMethods_id}
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  columnGap: 10,
                  marginTop: 30,
                }}
              >
                {getAllPaymentMethods &&
                  getAllPaymentMethods.map((item) => (
                    <Radio
                      value={item.id}
                      style={{
                        width: 252,
                        height: 172,
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                        border: "1px solid #00575c",
                      }}
                    >
                      <img
                        style={{
                          width: 250,
                          height: 170,
                          overflow: "hidden",
                          position: "absolute",
                          top: 0,
                          left: 0,
                        }}
                        src={item.image}
                        alt="ảnh"
                      />
                      <p
                        style={{
                          zIndex: 10,
                          position: "absolute",
                          top: 7,
                          left: 40,
                          color: "#00575c",
                          textShadow:
                            "0 0 0.2em white, 0 0 0.2em white, 0 0 0.2em white",
                        }}
                      >
                        {item.name}
                      </p>
                    </Radio>
                  ))}
              </Radio.Group>
            </div>
            <div className="orderPay-paymentMethods-money">
              <div className="orderPay-paymentMethods-money-item">
                <div className="orderPay-paymentMethods-money-item-text">
                  Tổng tiền hàng
                </div>
                <div className="orderPay-paymentMethods-money-item-price">
                  {new Intl.NumberFormat("vi-VN").format(
                    calculateTotalAmount()
                  )}
                  <span style={{ fontSize: 16, color: "#00575c" }}> VNĐ</span>
                </div>
              </div>
              <div className="orderPay-paymentMethods-money-item">
                <div className="orderPay-paymentMethods-money-item-text">
                  Phí vận chuyển
                </div>
                <div className="orderPay-paymentMethods-money-item-price">
                  {new Intl.NumberFormat("vi-VN").format(shippingCost)}
                  <span style={{ fontSize: 16, color: "#00575c" }}> VNĐ</span>
                </div>
              </div>
              <div className="orderPay-paymentMethods-money-item">
                <div className="orderPay-paymentMethods-money-item-text">
                  Tổng thanh toán
                </div>
                <div className="orderPay-paymentMethods-money-item-price">
                  <span style={{ fontSize: 24, color: "#00575c" }}>
                    {new Intl.NumberFormat("vi-VN").format(
                      calculateTotalAmount() + shippingCost ?? 0
                    )}
                  </span>
                  <span style={{ fontSize: 16, color: "#00575c" }}>VNĐ</span>
                </div>
              </div>
            </div>
            <div className="orderPay-paymentMethods-submit">
              <div className="orderPay-paymentMethods-submit-item">
                <div className="orderPay-paymentMethods-submit-item-text">
                  Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo Điều
                  khoản cửa hàng
                </div>
                <div className="orderPay-paymentMethods-submit-item-btn">
                  <button onClick={() => onSubmit()}>Đặt hàng</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderPay;
