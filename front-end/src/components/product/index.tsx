import { FC } from "react";
import React from "react";
import Heart from "../../assets/svg/heart";
import { TProduct } from "../../schema/products";

type ProductProps = {
  item: TProduct;
};

const Product: FC<ProductProps> = ({ item }) => {
  return (
    <div className="card">
      <div className="product--image">
        <img src={item.img} alt="productImage" />
        <div className="svg">
          <Heart />
        </div>
      </div>
      <div className="card-name">
        <div>{item.name}</div>
      </div>
      <div className="card-information">
        <div className="price">
          {new Intl.NumberFormat("vi-VN").format(item.price ?? 0)} VNĐ
        </div>
        <div className="sold">10 sold</div>
      </div>
    </div>
  );
};

export default Product;
