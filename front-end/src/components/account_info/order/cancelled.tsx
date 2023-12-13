import React, { useEffect, useState } from "react";
import { useGetOrderByIdUserAndIdStatusQuery } from "../../../services/order";
import imageNot from "../../../assets/image/notAppoiment.png";
import { useNavigate } from "react-router-dom";
import {
  useAddToCartsMutation,
  useGetUserListCartsQuery,
  useUpdateQuantityCartsMutation,
} from "../../../services/shoppingCart";

const Cancelled: React.FC = () => {
  const { data } = useGetOrderByIdUserAndIdStatusQuery(5);
  const [AddToCart] = useAddToCartsMutation();
  const { data: dataCart } = useGetUserListCartsQuery();
  const navigate = useNavigate();
  const [updateOrderMutation] = useUpdateQuantityCartsMutation();

  const resetCart = async (items: any[], userId: number) => {
    const updatedCart: any[] = [];

    for (const item of items) {
      const existingCartItem = dataCart.find(
        (cartItem: any) => cartItem.productsId === item.id
      );

      if (existingCartItem) {
        const updatedQuantity = existingCartItem.quantity + item.quantity;
        await updateOrderMutation({
          id: existingCartItem.id,
          quantity: updatedQuantity,
        }).unwrap();
      } else {
        const cartItem = {
          user_id: userId,
          products_id: item.id,
          quantity: item.quantity,
        };
        updatedCart.push(cartItem);
        await AddToCart(cartItem).unwrap();
      }
    }

    navigate("/shoppingCart", {
      state: {
        data: items,
      },
    });
  };
  
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
                <div
                  className="toShip-box-bottom-action"
                  onClick={() => resetCart(item.products, item.userId)}
                >
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
