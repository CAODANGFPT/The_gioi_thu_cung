import React, { useEffect, useState } from "react";
import "../../../assets/scss/page/servicesPage.scss";
import { Link, useLocation } from "react-router-dom";
import Breadcrumb from "../../../components/breadcrumb";
import { TServices } from "../../../schema/services";
import { useServicesQuery } from "../../../services/services";
import banner from "../../../assets/image/banner.png";
const formatCurrency = (price: number) => {
  return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};
const ServicePage = () => {
  const location = useLocation();
  const [data, setData] = useState<TServices[]>();
  const { data: listService } = useServicesQuery();
  useEffect(() => {
    if (location.pathname !== "/services") {
      setData(listService);
    }
  }, [listService, location.pathname]);
  return (
    <div className="backg">
      <div className="">
        <Breadcrumb name="dịch vụ" />
      </div>
      <div className="service_info-row">
        <h4 className="service_info-heading">Dịch vụ</h4>
      </div>
      <div className="serviceCardContainer">
        <div className="Filter">
          <h2>New Feat</h2>
          <div className="Filter-box">
            <div className="title-box">HỆ THỐNG DỊCH VỤ</div>
            <img src={banner} alt="" />
            <div className="text-box">dịch vụ được dùng nhiều nhất</div>
          </div>
          <div className="Filter-box">
            <div className="title-box">HỆ THỐNG DỊCH VỤ</div>
            <img src={banner} alt="" />
            <div className="text-box">dịch vụ được dùng nhiều nhất</div>
          </div>
        </div>
        <div className="serviceCard">
          <div className="content">
            {data?.map((item) => (
              <div key={item.id}>
                <Link to={`/services/${item.id}`}>
                  <img src={item.image} alt="" />
                  <div className="nameService">{item.name}</div>
                </Link>
                <div className="sold-flex">
                  <div className="priceService">
                    {formatCurrency(item.price)}
                  </div>
                  <div className="sold">20 sold</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
