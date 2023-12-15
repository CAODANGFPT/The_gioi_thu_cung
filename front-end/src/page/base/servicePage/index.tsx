import { Rate } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import banner from "../../../assets/image/banner.png";
import "../../../assets/scss/page/servicesPage.scss";
import { TServices } from "../../../schema/services";
import { useServicesClientQuery } from "../../../services/services";

const ServicePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState<TServices[]>();
  const { data: listService } = useServicesClientQuery();

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
              <div
                key={item.id}
                style={{cursor: 'pointer'}}
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
