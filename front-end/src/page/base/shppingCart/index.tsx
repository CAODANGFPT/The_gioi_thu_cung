import "../../../assets/scss/page/shoppingCart.scss";
import { Breadcrumbs } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import imge from "../../../assets/image/project12.png";
import TrashAlt from "../../../assets/svg/trash-alt";

type Props = {};

const ShoppingCart = (props: Props) => {

  const [dataOrder, setdataOrder] = useState<any>([]);
  const [quantity, setQuantity] = useState<number>(1);
  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
  const handleDecreaseQuantity = (id: number) => {
    setQuantity(id-1)
    // const cart = dataOrder.map((cartItem: { id: number; quantity: number; quantityProduct: number; }) =>
    //   cartItem.id === id && cartItem.quantity < cartItem.quantityProduct
    //     ? { ...cartItem, quantity: cartItem.quantity + 1 }
    //     : cartItem
    // );
    // setdataOrder(cart);
    // updateOrderMutation({
    //     id: id,
    //     quantity: cart.find((item: { id: number }) => item.id === id)?.quantity
    // });
  };
  const handleIncreaseQuantity = (id: number) => {
    setQuantity(id+1)
    // const cart = dataOrder.map((cartItem: { id: number; quantity: number; }) =>
    //   cartItem.id === id && cartItem.quantity != 0
    //     ? { ...cartItem, quantity: cartItem.quantity - 1 }
    //     : cartItem
    // );
    // const check = cart.find((item: { id: number }) => item.id === id)?.quantity;
    // if(check > 0){
    //   updateOrderMutation({
    //     id: id,
    //     quantity: cart.find((item: { id: number }) => item.id === id)?.quantity
    //   });
    //   setdataOrder(cart);
    // }else{
    //   const confirm = window.confirm("Bạn có muốn xóa");
    //   if(confirm){
    //     removeOrderMutation(id);
    //   }
    }
  return (
    <div className="shoppingCart">
      <div className="breadcrumbs" role="presentation" onClick={handleClick}>
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
                  <input type="checkbox" />
                </th>
                <th className="product">Sản phẩm</th>
                <th className="quantity">Số lượng</th>
                <th className="sum">Tổng cộng</th>
              </tr>
            </thead>
          </table>
          <table border={0} className="shoppingCart-blog-left-table">
            <tbody className="shoppingCart-blog-left-table-tbody">
              <tr>
                <td className="checkbox">
                  <input type="checkbox" />
                </td>
                <td className="product">
                  <div className="product-item">
                    <div className="product-item-img">
                      <img src={imge} alt="" />
                    </div>
                    <div className="product-item-text">
                      <div className="product-item-text-title">
                        Sunglasses for Cats
                      </div>
                      <div>
                        <TrashAlt />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="quantity">
                  <div className="quantity-blog">
                    <button
                      className="border border-slate-200 h-6 w-6 lg:h-8 lg:w-8"
                      onClick={() => handleIncreaseQuantity(quantity)}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      className="border border-slate-200 h-6 w-6 lg:h-8 lg:w-8 text-center"
                      value={quantity}
                    />
                    <button
                      className="border border-slate-200 h-6 w-6 lg:h-8 lg:w-8"
                      onClick={() => handleDecreaseQuantity(quantity)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="sum">1232131</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="shoppingCart-blog-right">
          <div className="shoppingCart-blog-right-item">
            <p className="shoppingCart-blog-right-item-title">
              Tổng số mặt hàng
            </p>
            <p>$12312</p>
          </div>
          <div className="shoppingCart-blog-right-item">
            <p className="shoppingCart-blog-right-item-title">Tiền ship</p>
            <p>$12312</p>
          </div>
          <hr />
          <div className="shoppingCart-blog-right-item">
            <p className="shoppingCart-blog-right-item-title">Tổng cộng</p>
            <p>$12312</p>
          </div>
          <div className="shoppingCart-blog-right-checkOut">CHECK OUT</div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
