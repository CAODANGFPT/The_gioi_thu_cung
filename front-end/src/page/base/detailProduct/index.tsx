import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import * as React from "react";
import "../../../assets/scss/page/detailProduct.scss";
import imageDetail from "../../../assets/image/blog3.png";
import user from "../../../assets/image/user.png";
import FacebookIcon from "../../../assets/svg/facebookIcon2";
import MessageIcon from "../../../assets/svg/startIcon";
import TwitterIcon from "../../../assets/svg/twitterIcon";
import StartIcon from "../../../assets/svg/startIcon";
import CartIcon from "../../../assets/svg/cardIcon";
import HeartIcon from "../../../assets/svg/heartIcon";
import CarouselProduct from "../../../components/carouselProduct";
import { productData, productData2 } from "./data";
import ListProductCard from "../../../components/listProduct";
import { Pagination, Stack } from "@mui/material";
import { useState } from "react";

const DetailProduct: React.FC = () => {
  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  //pagination list
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (
    _event: any,
    page: React.SetStateAction<number>
  ) => {
    setCurrentPage(page);
  };
  const itemsPerPage = 8; // Số sản phẩm trên mỗi trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productData2.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(productData2.length / itemsPerPage);

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
                <Link className="underline-hover" color="inherit" to="/">
                  <FacebookIcon />
                </Link>
                <Link className="underline-hover" color="inherit" to="/">
                  <MessageIcon />
                </Link>
                <Link className="underline-hover" color="inherit" to="/">
                  <TwitterIcon />
                </Link>
              </div>
            </div>

            <div className="product-rating">
              <div>
                {" "}
                <span>4.8</span> / 5
              </div>
              <div>
                <div>
                  All <span>( 17.5k )</span>
                </div>
                <div>
                  5 star <span>( 17.5k )</span>
                </div>
                <div>
                  4 sttart <span>( 17.5k )</span>
                </div>
                <div>
                  3 start <span>( 17.5k )</span>
                </div>
                <div>
                  2 start <span>( 17.5k )</span>
                </div>
                <div>
                  1 start <span>( 17.5k )</span>
                </div>
              </div>
            </div>

            <div className="feedback">
              <div className="userName">
                <div className="avt">{/* <img src={user} alt="" /> */}</div>
                <div className="name">
                  <h3>mr.bean</h3>
                  <p>Mar 7, 2022</p>
                </div>
              </div>

              <div className="content">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Deleniti ullam praesentium quis molestias atque sapiente
                  nulla, rem cupiditate magni eveniet!
                </p>
              </div>
            </div>
          </div>

          <div className="detail-right">
            <h2>Name Product</h2>

            <p>
              <span>20,000 đã mua</span>
              <span>
                4.5 <StartIcon />
              </span>
              <span>( 15.123 đánh giá )</span>
            </p>

            <h1>200.000 VNĐ</h1>

            <div>
              <label htmlFor="">Màu sắc</label>

              <select name="color" id="">
                <option value="red">Đỏ</option>
                <option value="green">Xanh</option>
                <option value="violet">Hồng</option>
                <option value="blue">Xanh dương</option>
              </select>
            </div>

            <div className="quantity">
              <label htmlFor="">Số lượng</label>
              <input type="number" />
            </div>

            <div>
              <button>
                <CartIcon />
                Thêm vào giỏ hàng
              </button>

              <HeartIcon />
            </div>

            <button>
              <Link className="underline-hover" color="inherit" to="/">
                Mua ngay
              </Link>
            </button>

            <div>
              <h3>Chi tiết</h3>
              <p>
                - Color: yellow, dark blue, pink, dark green, light green. -
                Brand:Coolrunner. - Fabric: Type AC resin, alloy. - Material: AC
                resin, Alloy. - Pattern: Retro. - Size: Frame width about
                8cm/3.15in
              </p>
            </div>

            <div>
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
        {/* <div className="pagination">
          <Stack direction="row" spacing={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              variant="outlined"
              onChange={handlePageChange}
            />
          </Stack>
        </div> */}
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
