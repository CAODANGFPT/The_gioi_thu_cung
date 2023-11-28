import React from "react";
import banner from "../../../assets/image/banner.png";
import "../../../assets/scss/page/home.scss";
import ArrowRightIcon from "../../../assets/svg/arrowRightIcon";

import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import CarouseBlog from "../../../components/carouselBlog";
import CarouselProduct from "../../../components/carouselProduct";
import ServiceCard from "../../../components/serviceCard";
import { useServicesTop8Query } from "../../../services/services";
import { blogData, productData } from "./data";

const Home: React.FC = () => {
  const navigator = useNavigate();
  const { data: listServices } = useServicesTop8Query();
  return (
    <div className="bg">
      <div className="home">
        <div className="home-banner">
          <div className="home-banner-img">
            <img src={banner} alt="" />
          </div>
          <div className="home-banner-text">
            <div className="top">
              <h1>PET CARE</h1>
            </div>
            <div>
              <p>HẠNH PHÚC BẮT ĐẦU TỪ CHĂM SÓC</p>
            </div>
            <div className="bottom">
              <button
                onClick={() =>
                  navigator("/appointment", {
                    state: {
                      appointmentData: {
                        pets: [],
                        services: [],
                        type: 1,
                      },
                    },
                  })
                }
              >
                <div>Khám phá ngay</div> <ArrowRightIcon />
              </button>
            </div>
          </div>
        </div>
        <div className="home-listCate">
          {listServices?.map((serviceCardData) => {
            return (
              <ServiceCard
                key={serviceCardData.id}
                id={serviceCardData.id}
                image={serviceCardData.image}
                name={serviceCardData.name}
              />
            );
          })}
        </div>
        <CarouselProduct productData={productData} name="Ưu đãi của tháng " />
        <CarouselProduct productData={productData} name="Điểm đến mới" />
        <CarouselProduct productData={productData} name="Siêu giảm giá" />

        <CarouseBlog blogData={blogData} />
      </div>
    </div>
  );
};

export default Home;
