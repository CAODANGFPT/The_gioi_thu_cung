import { Link, useNavigate, useParams } from "react-router-dom";
import { useServicesByIdQuery } from "../../../services/services";
import "../../../assets/scss/page/detailServices.scss";

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: serviceDetails } = useServicesByIdQuery(Number(id));

  return (
    <div className="detailServices">
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
                {new Intl.NumberFormat("vi-VN").format(
                  serviceDetails?.price ?? 0
                )}
                VNĐ
              </div>
            </div>
          </div>
          <div className="flex-btn">
            <button
              className="btn-router"
              onClick={() =>
                navigate(`/appointment`, {
                  state: {
                    appointmentData: {
                      pets: [],
                      services: [{ id: Number(id) }],
                      type: 1,
                    },
                  },
                })
              }
            >
              <p>Đến đặt lịch</p>
            </button>
            <button className="btn-router">
              <Link to="/services">
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
