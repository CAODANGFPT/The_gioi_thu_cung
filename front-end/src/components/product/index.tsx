import { FC } from "react";
import React from "react";
import Heart from "../../assets/svg/heart";

type ProductProps = {
  name: string;
  price: string;
  description?: string;
  url: string;
  sold: string;
};

const Product: FC<ProductProps> = ({ name, sold, url, price }) => {
  return (
    <div className="card">
      <div className="product--image">
        <img src={url} alt="productImage" />
        <div className="svg">
          <Heart />
        </div>
      </div>
      <div className="card-name">
        <div>{name}</div>
      </div>
      <div className="card-information">
        <div className="price">{price}</div>
        <div className="sold">{sold}</div>
      </div>
    </div>
  );
};

export default Product;
