import { FC } from "react";
import Heart from "../../assets/svg/heart";
import { TProduct } from "../../schema/products";
import { useNavigate } from "react-router-dom";

type ProductProps = {
  item: TProduct;
};

const ListProductCard: FC<ProductProps> = ({ item }) => {
  const navigate = useNavigate()
  return (
    <div className="card" onClick={() => navigate(`${item.id}`)}>
      <div className="product--image">
        <div style={{ width: "100%", minHeight: "16em", overflow: "none" }}>
          <img
            style={{ width: "100%", height: "16em" }}
            src={item.img}
            alt="productImage"
          />
        </div>
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

export default ListProductCard;
