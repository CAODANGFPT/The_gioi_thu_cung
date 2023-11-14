import "../../../assets/scss/page/shoppingCart.scss";
import { Breadcrumbs } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import imge from "../../../assets/image/project12.png";
import TrashAlt from "../../../assets/svg/trash-alt";

type Props = {};

const ShoppingCart = (props: Props) => {
  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
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
          <table className="shoppingCart-blog-left-table">
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
                    <button>-</button>
                    <div>1</div>
                    <button>+</button>
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
