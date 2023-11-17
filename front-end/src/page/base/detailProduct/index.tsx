import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link, useParams } from "react-router-dom";
import * as React from "react";
import "../../../assets/scss/page/detailProduct.scss";
import imageDetail from "../../../assets/image/blog3.png";
import userImg from "../../../assets/image/user.png";
import FacebookIcon from "../../../assets/svg/facebook";
import MessageIcon from "../../../assets/svg/mesageIcon2";
import TwitterIcon from "../../../assets/svg/twitterIcon";
import StartIcon from "../../../assets/svg/startIcon";
import ShoppingCartIcon from "../../../assets/svg/shoppingCartIcon";
import HeartIcon from "../../../assets/svg/heartIcon";
import CarouselProduct from "../../../components/carouselProduct";
import { productData, productData2 } from "./data";
import ListProductCard from "../../../components/listProduct";
import { Pagination, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import product10 from "../../../assets/image/project10.png";
import Minus from "../../../assets/svg/minus";
import AddIcon from "../../../assets/svg/add";
import {
  useAddToCartsMutation,
  useGetUserListCartsQuery,
  useUpdateQuantityCartsMutation,
} from "../../../services/shoppingCart";
import { message } from "antd";
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
  console.log(dataOrder);
  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
  useEffect(() => {
    if (data) {
      setDataOrder(data);
    }
  }, [data]);
  const Cong = () => {
    setQuantity(quantity + 1);
  };
  const Tru = () => {
    if (quantity >= 2) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(quantity);
    }
  };
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (
    _event: any,
    page: React.SetStateAction<number>
  ) => {
    setCurrentPage(page);
  };
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productData2.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(productData2.length / itemsPerPage);
  useEffect(() => {
    if (dataOrder) {
      const orderItem = dataOrder.find(
        (item: any) => item.productsId === Number(id)
      );
      console.log(orderItem);
      if (orderItem) {
        const { id, quantity } = orderItem;
        setQuantityCarts(quantity)
        setIdOrder(id);
      }
    }
  }, [id, dataOrder]);
  const addToCart = async () => {
    const isProductInCart = dataOrder?.some(
      (item: { productsId: number }) => item.productsId === Number(id)
    );
    console.log(isProductInCart);

    if (!isProductInCart) {
      if (user) {
        const cartItem = {
          user_id: user?.id,
          products_id: Number(id),
          quantity: quantity,
        };
        try {
          await AddToCart(cartItem).unwrap();
          message.success("Add to cart  successfully");
          reset();
        } catch (error) {
          message.error("Failed add to cart product");
          console.log(cartItem);
        }
      }
    } else {
      try {
        const dataQuantity = quantity + quantityCarts;
        await updateOrderMutation({ id: idOrder, quantity:dataQuantity });
        message.success("Add to cart  successfully");
        reset();
      } catch (error) {
        message.error("Failed add to cart product");
      }
    }
  };
  return (
    <div className="bg">
      <div className="breadcrumbs" role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link className="underline-hover" color="inherit" to="/">
            Trang chủ
          </Link>
          <Link className="underline-hover" color="inherit" to="/listproduct">
            Sản phẩm 1
          </Link>
        </Breadcrumbs>
      </div>

      <div>
        <div className="detail">
          <div className="detail-left">
            <div className="img">
              <img src={imageDetail} alt="" />

              <div className="share">
                Share:
                <Link
                  className="underline-hover icon-share"
                  color="inherit"
                  to="/"
                >
                  <FacebookIcon />
                </Link>
                <Link
                  className="underline-hover icon-share"
                  color="inherit"
                  to="/"
                >
                  <MessageIcon />
                </Link>
                <Link
                  className="underline-hover icon-share"
                  color="inherit"
                  to="/"
                >
                  <TwitterIcon />
                </Link>
              </div>
            </div>

            <h3>Product ratings</h3>
            <div className="product-rating">
              <div className="star">
                <span>5</span> out of 5
                <div>
                  <StartIcon />
                  <StartIcon />
                  <StartIcon />
                  <StartIcon />
                  <StartIcon />
                </div>
              </div>

              <div className="list-view">
                <div>
                  <p>All </p>
                  <span>( 17.5k )</span>
                </div>
                <div>
                  <p>5 star </p>
                  <span>( 17.5k )</span>
                </div>
                <div>
                  <p>4 star </p>
                  <span>( 17.5k )</span>
                </div>
                <div>
                  <p>3 star </p>
                  <span>( 17.5k )</span>
                </div>
                <div>
                  <p>2 star </p>
                  <span>( 17.5k )</span>
                </div>
                <div>
                  <p>1 star </p>
                  <span>( 17.5k )</span>
                </div>
              </div>
            </div>

            <div className="feedback">
              <div className="userName">
                <div className="avt">
                  <img src={userImg} alt="" />
                </div>
                <div className="name">
                  <h3>mr.bean</h3>
                  <div>
                    <StartIcon />
                    <StartIcon />
                    <StartIcon />
                    <StartIcon />
                    <StartIcon />
                  </div>
                  <p>Mar 7, 2022</p>
                </div>
              </div>

              <div className="content">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Deleniti ullam praesentium quis molestias atque sapiente
                  nulla, rem cupiditate magni eveniet!
                </p>

                <img src={product10} alt="" />
              </div>
            </div>

            <div className="feedback">
              <div className="userName">
                <div className="avt">
                  <img src={userImg} alt="" />
                </div>
                <div className="name">
                  <h3>mr.bean</h3>
                  <div>
                    <StartIcon />
                    <StartIcon />
                    <StartIcon />
                    <StartIcon />
                    <StartIcon />
                  </div>
                  <p>Mar 7, 2022</p>
                </div>
              </div>

              <div className="content">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Deleniti ullam praesentium quis molestias atque sapiente
                  nulla, rem cupiditate magni eveniet!
                </p>

                <img src={product10} alt="" />
              </div>
            </div>
          </div>

          <div className="detail-right">
            <h2>Name Product</h2>

            <p className="view">
              <span>20,000 đã mua</span>
              <span>
                4.5 <StartIcon />
              </span>
              <span style={{ border: "none" }}>( 15.123 đánh giá )</span>
            </p>

            <h1>200.000 VNĐ</h1>

            <div className="type-color">
              <label htmlFor="">Màu sắc:</label>

              <select name="color" id="">
                <option value="red">Đỏ</option>
                <option value="green">Xanh</option>
                <option value="violet">Hồng</option>
                <option value="blue">Xanh dương</option>
              </select>
            </div>

            <div className="quantity">
              <label htmlFor="">Số lượng: </label>
              <div className="quantity-input">
                <button className="" onClick={() => Tru()}>
                  <Minus />
                </button>
                <input type="text" className="" value={quantity} readOnly />
                <button className="" onClick={() => Cong()}>
                  <AddIcon />
                </button>
              </div>
            </div>

            <div className="add-to-cart" onClick={() => addToCart()}>
              <button>
                <div>
                  <ShoppingCartIcon />
                </div>
                Thêm vào giỏ hàng
              </button>

              <div className="heart-icon">
                <HeartIcon />
              </div>
            </div>

            <button className="buy-now">
              <Link
                className="underline-hover"
                color="white"
                style={{ color: "white" }}
                to="/"
              >
                Mua ngay
              </Link>
            </button>

            <div className="desc">
              <h3>Chi tiết</h3>
              <p>
                - Color: yellow, dark blue, pink, dark green, light green. -
                Brand:Coolrunner. - Fabric: Type AC resin, alloy. - Material: AC
                resin, Alloy. - Pattern: Retro. - Size: Frame width about
                8cm/3.15in
              </p>
            </div>

            <div className="desc">
              <h3>Mô tả</h3>
              <p>
                Your pets will looks fashion and cool with our sunglasses. The
                lenses are made of AC resin, spectacles frame using stainless
                steel, durable, lightweight, comfortable, easy to wear, fit for
                pet cat or dog as daily wear photo props or show Our glasses are
                available in a variety of colors and the are suitable for cats
                or small dogssuch as Chihuahua, Pomeranian, Small Poodle,
                Yorkshire, Shorthair, Persian, Puppet, etc. Suitable for small
                dogs or cats such as Chihuahua, Pomeranian, Small Poodle,
                Yorkshire, Shorthair, Persian, Puppet, etc. No clear lenses,
                your pets will looks fashion and cool with our punk rock
                sunglasses. The lenses are made of AC resin, spectacles frame
                using alloy metal, let the glasses looks very texture. Legs of
                glasses are made of spring, more comfortable to wear.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="combo">
        <CarouselProduct
          productData={productData}
          name="Combo Chăm Sóc Thú Cưng"
        />
      </div>

      <div className="list-pagination">
        <h3>Sản phẩm có liên quan</h3>
        <div className="product-list">
          {currentItems.map((productData2) => {
            return (
              <ListProductCard
                key={productData2.id}
                name={productData2.name}
                sold={productData2.sold}
                url={productData2.imageUrl}
                price={productData2.price}
              />
            );
          })}
        </div>
        <div className="pagination">
          <Stack direction="row" spacing={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              variant="outlined"
              onChange={handlePageChange}
            />
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;

