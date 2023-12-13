import React from "react";
import "../../../assets/scss/page/account/order.scss";
import imageNot from "../../../assets/image/notAppoiment.png";
import { useGetOrderByIdUserAndIdStatusQuery } from "../../../services/order";
import { useNavigate } from "react-router-dom";

const ToPay: React.FC = () => {
  const { data } = useGetOrderByIdUserAndIdStatusQuery(1);
  const navigate = useNavigate();

  const detailOrderPage = (Item: any) => {
    navigate("detailOrder", {
      state: {
        ...Item,
      },
    });
  };
  return (
    <>
      {data?.length ? (
        data.map((Item) => (
          <div key={Item.id} className="toShip">
            <div className="toShip-status">
              <div>{Item.paymentMethods.name}</div>
              <div className="toShip-status-name">{Item.status.name}</div>
            </div>
            <div className="toShip-box">
              {Item.products.map((item) => (
                <div key={item.id} className="toShip-box-top">
                  <div
                    onClick={() => detailOrderPage(Item)}
                    className="toShip-box-top-item"
                  >
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
                  <div className="toShip-box-bottom-action-abort">
                    Hủy đơn hàng
                  </div>
                </div>
                <div className="toShip-box-bottom-total">
                  Thành tiền:{" "}
                  <span>
                    {new Intl.NumberFormat("vi-VN").format(Item.total)} VNĐ
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

export default ToPay;
