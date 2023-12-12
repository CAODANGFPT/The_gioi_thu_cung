import React, { FC, useEffect, useState } from "react";
import Location from "../../../assets/svg/loaction";
import { useLocation, useNavigate } from "react-router-dom";
import "../../../assets/scss/page/orderPay.scss";
const DetailOrderAdmin: FC = () => {
  const shippingCost: number = 10000;
  const location = useLocation();
  const navigate = useNavigate();
  const [data] = useState<any>(location.state);
  useEffect(() => {
    if (!data) {
      navigate("/admin/order");
    }
  }, [data]);
  console.log(data);

  const calculateTotalAmount = () => {
    let totalAmount = 0;
    data.products.forEach(
      (item: { id: number; price: number; quantity: number }) => {
        totalAmount += item.price * item.quantity;
      }
    );
    return totalAmount;
  };
  return (
    <div className="container-order">
      <div className="orderPay">
        <div className="orderPay-address">
          <div className="orderPay-address-border"></div>
          <div className="orderPay-address-title">
            <div className="orderPay-address-title-icon">
              <Location /> Địa chỉ nhận hàng
            </div>
            <div className="orderPay-address-title-item">
              <div className="orderPay-address-title-item-user">
                Họ và tên: {data?.address.name}
              </div>
              <div className="orderPay-address-title-item-user">
                Số điện thoại: +84{data?.address.phone}
              </div>
            </div>
            <div className="orderPay-address-title-item-user">
              Điạ chỉ: {data?.address.address}
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
          <div className="orderPay-product-node node-admin">
            <div>Lời nhắn:</div>
            <div>{data.note}</div>
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
          <div
            className="orderPay-paymentMethods-title"
            style={{ display: "flex", gap: 10 }}
          >
            <div style={{ fontWeight: 500 }}>Phương thức thanh toán:</div>
            <div
              style={{
                border: "1px solid #00575c",
                padding: "2px 10px",
                color: "#00575c",
              }}
            >
              {data.paymentMethods.name}
            </div>
          </div>
          <div
            className="orderPay-paymentMethods-title"
            style={{ display: "flex", gap: 10, borderTop: "1px solid #f1f0ed" }}
          >
            <div style={{ fontWeight: 500 }}>Trạng thái đơn hàng:</div>
            <div
              style={{
                border: "1px solid #00575c",
                padding: "2px 10px",
                color: "#00575c",
              }}
            >
              {data.status.name}
            </div>
          </div>
          <div className="orderPay-paymentMethods-money orderPay-paymentMethods-admin">
            <div className="orderPay-paymentMethods-money-box">
              <div className="orderPay-paymentMethods-money-box-item">
                <div className="orderPay-paymentMethods-money-box-item-text">
                  Tên khách hàng
                </div>
                <div className="orderPay-paymentMethods-money-box-item-price">
                  {data.address.name}
                </div>
              </div>
              <div className="orderPay-paymentMethods-money-box-item">
                <div className="orderPay-paymentMethods-money-box-item-text">
                  Số điện thoại
                </div>
                <div className="orderPay-paymentMethods-money-box-item-price">
                  +84{data.address.phone}
                </div>
              </div>
              <div className="orderPay-paymentMethods-money-box-item">
                <div className="orderPay-paymentMethods-money-box-item-text">
                  Địa chỉ
                </div>
                <div className="orderPay-paymentMethods-money-box-item-price">
                  {data.address.address}
                </div>
              </div>
            </div>
            <div className="orderPay-paymentMethods-money-box">
              <div className="orderPay-paymentMethods-money-box-item">
                <div className="orderPay-paymentMethods-money-box-item-text">
                  Tổng tiền hàng
                </div>
                <div className="orderPay-paymentMethods-money-box-item-price">
                  {new Intl.NumberFormat("vi-VN").format(
                    calculateTotalAmount()
                  )}
                  <span style={{ fontSize: 16, color: "#00575c" }}> VNĐ</span>
                </div>
              </div>
              <div className="orderPay-paymentMethods-money-box-item">
                <div className="orderPay-paymentMethods-money-box-item-text">
                  Phí vận chuyển
                </div>
                <div className="orderPay-paymentMethods-money-box-item-price">
                  {new Intl.NumberFormat("vi-VN").format(shippingCost)}
                  <span style={{ fontSize: 16, color: "#00575c" }}> VNĐ</span>
                </div>
              </div>
              <div className="orderPay-paymentMethods-money-box-item">
                <div className="orderPay-paymentMethods-money-box-item-text">
                  Tổng thanh toán
                </div>
                <div className="orderPay-paymentMethods-money-box-item-price">
                  <span style={{ fontSize: 24, color: "#00575c" }}>
                    {new Intl.NumberFormat("vi-VN").format(data.total)}
                  </span>
                  <span style={{ fontSize: 16, color: "#00575c" }}>VNĐ</span>
                </div>
              </div>
              <div className="orderPay-paymentMethods-money-box-pay">
                <button className="true">Xác nhận</button>
                <button className="close">Hủy đơn hàng</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailOrderAdmin;
