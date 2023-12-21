import { Rate, message } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import "../../../assets/scss/page/detailProduct.scss";
import FacebookIcon from "../../../assets/svg/facebook";
import ShoppingCartIcon from "../../../assets/svg/shoppingCartIcon";
import TwitterIcon from "../../../assets/svg/twitterIcon";
import CarouselProduct from "../../../components/carouselProduct";
import {
  useGetProductByIdQuery,
  useGetProductCateQuery,
} from "../../../services/products";
import {
  useAddToCartsMutation,
  useGetUserListCartsQuery,
  useUpdateQuantityCartsMutation,
} from "../../../services/shoppingCart";
import { useGetUserQuery } from "../../../services/user";

const DetailProduct: React.FC = () => {
  const { id } = useParams();
  const [idOrder, setIdOrder] = useState<number>(1);
  const [AddToCart, { reset }] = useAddToCartsMutation();
  const [dataOrder, setDataOrder] = useState<any>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [quantityCarts, setQuantityCarts] = useState<number>(0);
  const { data } = useGetUserListCartsQuery();
  const { data: user } = useGetUserQuery();
  const [updateOrderMutation] = useUpdateQuantityCartsMutation();

  const { data: product } = useGetProductByIdQuery(Number(id) || 0);
  const { data: productCate } = useGetProductCateQuery(
    product?.category_id || 0
  );

  useEffect(() => {
    if (data) {
      setDataOrder(data);
    }
  }, [data]);

  useEffect(() => {
    if (product) {
      window.scrollTo({
        top: 0,
      });
    }
  }, [product]);

  const Cong = () => {
    if (!(product?.quantity === quantity)) {
      setQuantity(quantity + 1);
    }
  };

  const Tru = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(quantity);
    }
  };

  useEffect(() => {
    if (dataOrder) {
      const orderItem = dataOrder.find(
        (item: any) => item.productsId === Number(id)
      );
      if (orderItem) {
        const { id, quantity } = orderItem;
        setQuantityCarts(quantity);
        setIdOrder(id);
      }
    }
  }, [id, dataOrder]);

  const addToCart = async () => {
    if (!user) {
      message.info("Vui lòng đăng nhập để thêm vào giỏ hàng");
      return;
    }
    const isProductInCart = dataOrder?.some(
      (item: { productsId: number }) => item.productsId === Number(id)
    );

    if (!isProductInCart) {
      if (user) {
        const cartItem = {
          user_id: user?.id,
          products_id: Number(id),
          quantity: quantity,
        };
        try {
          await AddToCart(cartItem).unwrap();
          message.success("Thêm vào giỏ hàng thành công");
          reset();
        } catch (error) {
          message.error("Thêm vào giở hàng thất bại");
        }
      }
    } else {
      try {
        const dataQuantity = quantity + quantityCarts;
        await updateOrderMutation({ id: idOrder, quantity: dataQuantity });
        message.success("Thêm vào giỏ hàng thành công");
        reset();
      } catch (error) {
        message.error("Thêm vào giở hàng thất bại");
      }
    }
  };

  return (
    <div className="bg">
      <div>
        <div className="detail">
          <div className="detail-left">
            <h2 className="name">{product?.name}</h2>
            <p className="view">
              <span className="view-title">20,000 đã mua</span>
              <span style={{ border: "none" }}>4.5</span>
              <Rate
                style={{ marginLeft: 5 }}
                allowHalf
                disabled
                defaultValue={4.5}
              />
            </p>
            <div className="img">
              <img src={product?.img} alt="anh" />
            </div>
          </div>

          <div className="detail-right">
            <h2 className="name">{product?.name}</h2>
            <p className="view">
              <span className="view-title">20,000 đã mua</span>
              <span style={{ border: "none" }}>4.5</span>
              <Rate
                style={{ marginLeft: 5 }}
                allowHalf
                disabled
                defaultValue={4.5}
              />
            </p>
            <h1>
              {new Intl.NumberFormat("vi-VN").format(product?.price ?? 0)} VNĐ
            </h1>
            {product?.quantity != 0 ? (
              <>
                <div className="quantity">
                  <label htmlFor="">Số lượng: </label>
                  <div className="quantity-input">
                    <button
                      className="tru"
                      style={
                        quantity > 1
                          ? { cursor: "pointer" }
                          : { cursor: "not-allowed" }
                      }
                      onClick={() => Tru()}
                    >
                      -
                    </button>
                    <input type="text" value={quantity} readOnly />
                    <button
                      style={
                        product?.quantity === quantity
                          ? { cursor: "not-allowed" }
                          : { cursor: "pointer" }
                      }
                      className="cong"
                      onClick={() => Cong()}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div
                  className="add-to-cart"
                  style={{ marginBottom: 10 }}
                  onClick={() => addToCart()}
                >
                  <button>
                    <ShoppingCartIcon />
                    <p>Thêm vào giỏ hàng</p>
                  </button>
                </div>
              </>
            ) : (
              <div style={{margin: "10px 0", fontSize: 30}}>Hết hàng</div>
            )}

            <div className="share">
              Chia sẻ:
              <FacebookShareButton
                url={`https://www.facebook.com/photo?fbid=637381223871648&set=a.437741090502330`}
                hashtag={"#PetCare"}
              >
                <FacebookIcon />
              </FacebookShareButton>
              <TwitterShareButton
                title={"PetCare"}
                url={
                  "https://x.com/AMAZlNGNATURE/status/1732214306660331685?s=20"
                }
                hashtags={["PetCare", "ThuCung"]}
              >
                <TwitterIcon />
              </TwitterShareButton>
            </div>
            <div className="desc">
              <h3>Mô tả</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: product?.description || "",
                }}
              />
            </div>
            {/* <button className="buy-now">
              <p className="underline-hover">Mua ngay</p>
            </button> */}
          </div>
        </div>
      </div>

      {/* <div className="combo">
        <CarouselProduct
          productData={productData}
          name="Combo Chăm Sóc Thú Cưng"
        />
      </div> */}

      <div className="list-pagination">
        <CarouselProduct
          productData={productCate || []}
          name="Sản phẩm liên quan"
        />
      </div>
    </div>
  );
};

export default DetailProduct;
