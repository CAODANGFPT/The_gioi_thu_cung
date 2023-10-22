import React from "react";
import banner from "../../../assets/image/banner.png";
import "../../../assets/scss/page/homePage/index.scss";
import ArrowRightIcon from "../../../assets/svg/arrowRightIcon";

import "react-multi-carousel/lib/styles.css";
import CarouselProduct from "../../../components/carouselProduct";
import ServiceCard from "../../../components/serviceCard";
import { ServiceCardData, blogData, productData } from "./data";
import CarouseBlog from "../../../components/carouselBlog";

const Home: React.FC = () => {


  return (
    <div className="bg">
      <div className="home">
        <div className="home-banner">
          <div className="home-banner-img">
            <img src={banner} alt="" />
          </div>
          <div className="home-banner-text">
            <div className="top">
              <p>CAT SUPPLIES</p>
              <div className="top-title">SALE UP TO 50%</div>
            </div>
            <div className="bottom">
              <button>
                <div>Explore Now</div> <ArrowRightIcon />
              </button>
            </div>
          </div>
        </div>
        <div className="home-listCate">
          {ServiceCardData.map((ServiceCardData) => {
            return (
              <ServiceCard image={ServiceCardData.imageUrl} name={ServiceCard.name}/>
            )
          })}
        </div>
        <CarouselProduct productData={productData} name="Deals Of The Month "/>
        <CarouselProduct productData={productData} name="New  Arrivals"/>
        <CarouselProduct productData={productData} name="Best-selling"/>

        <CarouseBlog blogData={blogData}/>
      </div>
    </div>
  );
};

export default Home;
