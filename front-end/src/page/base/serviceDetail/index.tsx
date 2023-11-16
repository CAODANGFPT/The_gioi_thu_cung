import React from "react";
import { Link, useParams } from "react-router-dom";

import Breadcrumb from "../../../components/breadcrumb";
import { useServicesByIdQuery } from "../../../services/services";

const formatCurrency = (price?: number) => {
  return price
    ? price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
    : "0 VNĐ";
};

const ServiceDetail = () => {
  const { id } = useParams();

  const { data: serviceDetails } = useServicesByIdQuery(Number(id));

  return (
    <div className="backg">
      <div className="">
        <Breadcrumb name="dịch vụ" />
      </div>
      <div className="serviceContent">
        <div className="content-left">
          <img src={serviceDetails?.image} alt="ảnh dịch vụ" />
        </div>
        <div className="content-right">
          <div className="item-flex">
            <div className="title-name">Loại hình dịch vụ:</div>
            <div className="list">{serviceDetails?.name}</div>
          </div>
          <div className="item-flex">
            <div className="title-name-2">Giá dịch vụ:</div>
            <div className="price-flex">
              <div className="list-price">
                {formatCurrency(serviceDetails?.price)}
              </div>
              <div className="list-price-sale">100đ</div>
            </div>
          </div>
          <div className="flex-btn">
            <button className="btn-router">
              <Link to="/appointment">
                <p>Đến đặt lịch</p>
              </Link>
            </button>
            <button className="btn-router">
              <Link to="/service">
                <p>Quay lại dịch vụ</p>
              </Link>
            </button>
          </div>
        </div>
      </div>
      <div className="bottom-service">
        <div className="description-box">
          <div className="description-title">Mô tả dịch vụ</div>
          <div
            className="description-text"
            dangerouslySetInnerHTML={{
              __html: serviceDetails?.description || "",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
