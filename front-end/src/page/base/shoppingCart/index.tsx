import React, { useEffect, useState } from "react";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import TrashAlt from "../../../assets/svg/trash-alt";
import {
  useGetUserListCartsQuery,
  useRemoveCartsByIdMutation,
  useUpdateQuantityCartsMutation,
} from "../../../services/shoppingCart";
import "../../../assets/scss/page/shoppingCart.scss";
import AddIcon from "../../../assets/svg/add";
import Minus from "../../../assets/svg/minus";
import logo from "../../../assets/image/logo.png";
const ShoppingCart = () => {
  const { data } = useGetUserListCartsQuery();
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [dataOrder, setDataOrder] = useState<any>([]);
  const [updateOrderMutation] = useUpdateQuantityCartsMutation();
  const [removeOrder] = useRemoveCartsByIdMutation();
  const shippingCost: number = 12312;
  useEffect(() => {
    if (data) {
      setDataOrder(data);
    }
  }, [data]);

  const handleCheckboxChange = (itemId: number) => {
    setCheckedItems((prevItems) =>
      prevItems.includes(itemId)
        ? prevItems.filter((id) => id !== itemId)
        : [...prevItems, itemId]
    );
  };

  const calculateTotalAmount = () => {
    let totalAmount = 0;
    dataOrder.forEach(
      (item: { id: number; priceCart: number; quantity: number }) => {
        if (checkedItems.includes(item.id)) {
          totalAmount += item.priceCart * item.quantity;
        }
      }
    );
    return totalAmount;
  };

  const handleSelectAll = (e: any) => {
    setSelectAll(!selectAll);
    const allItemIds = dataOrder.map((item: { id: any }) => item.id);
    setCheckedItems(selectAll ? [] : allItemIds);
  };

  const handleDecreaseQuantity = (id: number) => {
    const cart = dataOrder.map((cartItem: { id: number; quantity: number }) =>
      cartItem.id === id && cartItem.quantity < 40
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    setDataOrder(cart);
    updateOrderMutation({
      id: id,
      quantity: cart.find((item: { id: number }) => item.id === id)?.quantity,
    });
  };

  const handleIncreaseQuantity = (id: number) => {
    const cart = dataOrder.map((cartItem: { id: number; quantity: number }) =>
      cartItem.id === id && cartItem.quantity !== 0
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );

    const check = cart.find((item: { id: number }) => item.id === id)?.quantity;

    if (check > 0) {
      updateOrderMutation({
        id: id,
        quantity: cart.find((item: { id: number }) => item.id === id)?.quantity,
      });
      setDataOrder(cart);
    } else {
      const confirm = window.confirm("Bạn có muốn xóa");
      if (confirm) {
        removeOrder(id);
      }
    }
  };
  const remove = (id: number) => {
    const confirm = window.confirm("Bạn có muốn xóa");
    if (confirm) {
      removeOrder(id);
    }
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
    <div className="shoppingCart">
      <div className="breadcrumbs" role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <Link className="underline-hover" color="inherit" to="/">
            Trang chủ
          </Link>
          <Link className="underline-hover" color="inherit" to="/listproduct">
            Danh sách sản phẩm
          </Link>
        </Breadcrumbs>
      </div>
      <div className="shoppingCart-blog">
        <div className="shoppingCart-blog-left">
          <table className="shoppingCart-blog-left-table">
            <thead className="shoppingCart-blog-left-table-thead">
              <tr>
                <th className="checkbox">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="product">
                  <p>Sản phẩm</p>
                </th>
                <th className="quantity">Số lượng</th>
                <th className="sum">Tổng cộng</th>
              </tr>
            </thead>
          </table>
          <table border={0} className="shoppingCart-blog-left-table">
            <tbody className="shoppingCart-blog-left-table-tbody">
              {dataOrder &&
                dataOrder.map((data: any) => (
                  <tr key={data.id}>
                    <td className="checkbox">
                      <input
                        type="checkbox"
                        checked={selectAll || checkedItems.includes(data.id)}
                        onChange={() => handleCheckboxChange(data.id)}
                      />
                    </td>
                    <td className="product">
                      <div className="product-item">
                        <div className="product-item-img">
                          <img src={data.imgCart} alt="" />
                        </div>
                        <div className="product-item-text">
                          <div className="product-item-text-title">
                            {data.productCart}
                          </div>
                          <div
                            className="remove"
                            onClick={() => remove(data.id)}
                          >
                            <TrashAlt />
                          </div>
                          <div className="price">
                            {(data.priceCart * data.quantity).toLocaleString(
                              "vi-VN",
                              {
                                style: "currency",
                                currency: "VND",
                              }
                            )}
                          </div>
                          <div className="quantity-blog quantity-rq">
                            <button
                              className="border border-slate-200 h-6 w-6 lg:h-8 lg:w-8"
                              onClick={() => handleIncreaseQuantity(data.id)}
                            >
                              <Minus />
                            </button>
                            <input
                              type="text"
                              className=""
                              value={data.quantity}
                              readOnly
                            />
                            <button
                              className="border border-slate-200 h-6 w-6 lg:h-8 lg:w-8"
                              onClick={() => handleDecreaseQuantity(data.id)}
                            >
                              <AddIcon />
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="quantity">
                      <div className="quantity-blog">
                        <button
                          className="border border-slate-200 h-6 w-6 lg:h-8 lg:w-8"
                          onClick={() => handleIncreaseQuantity(data.id)}
                        >
                          <Minus />
                        </button>
                        <input
                          type="text"
                          readOnly
                          className="border border-slate-200 h-6 w-6 lg:h-8 lg:w-8 text-center"
                          value={data.quantity}
                        />
                        <button
                          className="border border-slate-200 h-6 w-6 lg:h-8 lg:w-8"
                          onClick={() => handleDecreaseQuantity(data.id)}
                        >
                          <AddIcon />
                        </button>
                      </div>
                    </td>
                    <td className="sum">
                      {" "}
                      {(data.priceCart * data.quantity).toLocaleString(
                        "vi-VN",
                        {
                          style: "currency",
                          currency: "VND",
                        }
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {dataOrder.length === 0 && (
            <div className="text">Không có sản phẩm nào trong giỏ hàng</div>
          )}
        </div>
        <div className="shoppingCart-blog-right">
          <div className="shoppingCart-blog-right-item">
            <p className="shoppingCart-blog-right-item-title">
              Tổng số mặt hàng
            </p>
            <p>
              <span style={{ fontSize: 24, color: "#00575c" }}>
                {new Intl.NumberFormat("vi-VN").format(
                  calculateTotalAmount() ?? 0
                )}
              </span>
              <span style={{ fontSize: 16, color: "#00575c" }}>VNĐ</span>
            </p>
          </div>
          <div className="shoppingCart-blog-right-item">
            <p className="shoppingCart-blog-right-item-title">Tiền ship</p>
            <p>
              <span style={{ fontSize: 24, color: "#00575c" }}>
                {new Intl.NumberFormat("vi-VN").format(shippingCost ?? 0)}
              </span>
              <span style={{ fontSize: 16, color: "#00575c" }}>VNĐ</span>
            </p>
          </div>
          <hr />
          <div className="shoppingCart-blog-right-item">
            <p className="shoppingCart-blog-right-item-title">Tổng cộng</p>
            <p>
              <span style={{ fontSize: 24, color: "#00575c" }}>
                {new Intl.NumberFormat("vi-VN").format(
                  calculateTotalAmount() + shippingCost ?? 0
                )}
              </span>
              <span style={{ fontSize: 16, color: "#00575c" }}>VNĐ</span>
            </p>
          </div>
          <div className="shoppingCart-blog-right-checkOut">CHECK OUT</div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
