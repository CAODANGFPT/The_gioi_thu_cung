import { Rate } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../../assets/scss/page/servicesPage.scss";
import { TServices } from "../../../schema/services";
import {
  useServicesClientQuery,
  useServicesTop1Query,
} from "../../../services/services";

const ServicePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState<TServices[]>();
  const { data: listService } = useServicesClientQuery();
  const { data: dataServiceTop1 } = useServicesTop1Query();
  useEffect(() => {
    if (location.pathname !== "/service") {
      setData(listService);
    }
  }, [listService, location.pathname]);

  return (
    <div className="backg">
      <div className="service_info-row">
        <h4 className="service_info-heading">Dịch vụ</h4>
      </div>
      <div className="serviceCardContainer">
        <div className="Filter">
          <h2>Dịch vụ mới</h2>
          {dataServiceTop1 &&
            dataServiceTop1.map((item) => (
              <div
                onClick={() => {
                  navigate(`/service/${item.id}`);
                }}
                key={item.id}
                className="Filter-box"
              >
                <div className="title-box">{item.name}</div>
                <img className="imgfilter" src={item.image} alt="" />
              </div>
            ))}
        </div>
        <div className="serviceCard">
          <div className="content">
            {data?.map((item) => (
              <div
                key={item.id}
                style={{ cursor: "pointer" }}
                className="card"
                onClick={() => navigate(`/service/${item.id}`)}
              >
                <img src={item.image} alt="" />
                <Rate disabled allowHalf defaultValue={2.5} />
                <div className="nameService">{item.name}</div>
                <div className="sold-flex">
                  <div className="priceService">
                    {new Intl.NumberFormat("vi-VN").format(item.price ?? 0)} VNĐ
                  </div>
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
