import React from "react";
import { useGetOrderByIdUserAndIdStatusQuery } from "../../../services/order";
import imageNot from "../../../assets/image/notAppoiment.png";

const Cancelled: React.FC = () => {
  const { data } = useGetOrderByIdUserAndIdStatusQuery(5);
  return (
    <>
      {data?.length ? (
        data.map((item) => (
          <div key={item.id} className="toShip">
            <div className="toShip-status">
              <div>{item.paymentMethods.name}</div>
              <div className="toShip-status-name">{item.status.name}</div>
            </div>
            <div className="toShip-box">
              {item.products.map((item) => (
                <div key={item.id} className="toShip-box-top">
                  <div className="toShip-box-top-item">
                    <div className="toShip-box-top-item-img">
                      <img src={item.img} alt="" />
                    </div>
                    <div>
                      <div>{item.name}</div>
                      <div>x{item.quantity}</div>
                    </div>
                  </div>
                  <div className="toShip-box-top-price">
                    {new Intl.NumberFormat("vi-VN").format(
                      item.quantity * item.price ?? 0
                    )}{" "}
                    VNĐ
                  </div>
                </div>
              ))}
              <div className="toShip-box-bottom">
                <div className="toShip-box-bottom-action">
                  <div className="toShip-box-bottom-action-abort">Đặt lại</div>
                </div>
                <div className="toShip-box-bottom-total">
                  Thành tiền:{" "}
                  <span>
                    {new Intl.NumberFormat("vi-VN").format(item.total)} VNĐ
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="notAppointment">
          <div>
            <img src={imageNot} alt="" />
          </div>
          <div>Chưa có đơn hàng</div>
        </div>
      )}
    </>
  );
};

export default Cancelled;
