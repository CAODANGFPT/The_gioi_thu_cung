import "../../../assets/scss/page/orderPay.scss";
import { Breadcrumbs } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Location from "../../../assets/svg/loaction";

type Props = {};

const OrderPay: FC<Props> = () => {
  const shippingCost: number = 10000;
  const [total, setTotal] = useState<number>();
  const navigate = useNavigate();
  const location = useLocation();
  const [data] = useState<any>(location.state?.data);
  console.log(data);
  useEffect(() => {
    if (!data) {
      navigate("/shoppingCart");
    }
  }, [data]);
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
    <>
      <div className="container-order">
        <div className="orderPay">
          <div className="breadcrumbs" role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
              <Link className="underline-hover" color="inherit" to="/">
                Trang chủ
              </Link>
              <Link
                className="underline-hover"
                color="inherit"
                to="  /shoppingCart"
              >
                Thanh toán
              </Link>
            </Breadcrumbs>
          </div>
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
              <div className="orderPay-paymentMethods-title-item">
                <button className="orderPay-paymentMethods-title-item-box">
                  VNPAY
                </button>
                <button className="orderPay-paymentMethods-title-item-box">
                  Chuyển khoản ngân hàng
                </button>
                <button className="orderPay-paymentMethods-title-item-box">
                  Thanh toán khi nhận hàng
                </button>
              </div>
            </div>
            <div className="orderPay-paymentMethods-money">
              <div className="orderPay-paymentMethods-money-item">
                <div className="orderPay-paymentMethods-money-item-text">Tổng tiền hàng</div>
                <div className="orderPay-paymentMethods-money-item-price">
                  {new Intl.NumberFormat("vi-VN").format(
                    calculateTotalAmount()
                  )}
                  <span style={{ fontSize: 16, color: "#00575c" }}> VNĐ</span>
                </div>
              </div>
              <div  className="orderPay-paymentMethods-money-item">
                <div className="orderPay-paymentMethods-money-item-text">Phí vận chuyển</div>
                <div className="orderPay-paymentMethods-money-item-price">
                  {new Intl.NumberFormat("vi-VN").format(
                    shippingCost
                  )}
                  <span style={{ fontSize: 16, color: "#00575c" }}> VNĐ</span>
                </div>
              </div>
              <div className="orderPay-paymentMethods-money-item">
                <div className="orderPay-paymentMethods-money-item-text">Tổng thanh toán</div>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderPay;
