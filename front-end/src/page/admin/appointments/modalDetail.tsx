import { CloseOutlined } from "@ant-design/icons";
import { FC } from "react";
import "../../../assets/scss/page/orderPay.scss";
import { TAppointment } from "../../../schema/appointments";
import dayjs from "dayjs";
import { Tag } from "antd";

type TDetailAppointment = {
  openDetail: boolean;
  setOpenDetail: React.Dispatch<React.SetStateAction<boolean>>;
  dataDetail?: TAppointment;
};

const DetailAppointment: FC<TDetailAppointment> = ({
  openDetail,
  setOpenDetail,
  dataDetail,
}) => {
  return (
    <>
      {openDetail && (
        <div className="detailAppointment">
          <div className="detailAppointment_modal">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "0 10px",
              }}
            >
              <h1>Chi tiết đơn hàng</h1>
              <div
                className="detailAppointment_modal_close"
                onClick={() => setOpenDetail(false)}
              >
                <CloseOutlined />
              </div>
            </div>
            <table className="table">
              <tr className="table_vertical">
                <td className="text-left">Email</td>
                <td className="text-left">{dataDetail?.user_email}</td>
              </tr>
              <tr className="table_vertical">
                <td className="text-left">Tên</td>
                <td className="text-left">{dataDetail?.user_name}</td>
              </tr>
              <tr className="table_vertical">
                <td className="text-left">Ngày đặt</td>
                <td className="text-left">
                  {dayjs(dataDetail?.start_time).format("DD-MM-YYYY")}
                </td>
              </tr>
              <tr className="table_vertical">
                <td className="text-left">Ca</td>
                <td className="text-left">
                  <div>
                    {dayjs(dataDetail?.start_time).format("HH:mm")} -
                    {dayjs(dataDetail?.end_time).format("HH:mm")}
                  </div>
                </td>
              </tr>
              <tr className="table_vertical">
                <td className="text-left">Tên thú cưng</td>
                <td className="text-left">
                  {Array.isArray(dataDetail?.pets) &&
                    dataDetail?.pets.map((pet, serviceIndex) => (
                      <span key={serviceIndex}>
                        {pet.name}
                        {serviceIndex < dataDetail?.pets.length - 1 ? ", " : ""}
                      </span>
                    ))}
                </td>
              </tr>
              <tr className="table_vertical">
                <td className="text-left">Tên dịch vụ</td>
                <td className="text-left">
                  {Array.isArray(dataDetail?.services) &&
                    dataDetail?.services.map((service, serviceIndex) => (
                      <span key={serviceIndex}>
                        {service.name}
                        {serviceIndex < dataDetail?.services.length - 1
                          ? ", "
                          : ""}
                      </span>
                    ))}
                </td>
              </tr>
              <tr className="table_vertical">
                <td className="text-left">Phòng</td>
                <td className="text-left">{dataDetail?.pethouse_name}</td>
              </tr>
              <tr className="table_vertical">
                <td className="text-left">Tổng số tiền</td>
                <td className="text-left">{dataDetail?.total}</td>
              </tr>
              <tr className="table_vertical">
                <td className="text-left">Thanh toán</td>
                <td className="text-left">
                  <Tag
                    color={dataDetail?.statusPaymentId === 1 ? "red" : "cyan"}
                  >
                    {dataDetail?.statusPaymentName}
                  </Tag>
                </td>
              </tr>
              <tr className="table_vertical">
                <td className="text-left">Trạng thái</td>
                <td className="text-left">
                  <Tag
                    color={
                      dataDetail?.status_id === 1
                        ? "blue"
                        : dataDetail?.status_id === 2
                        ? "cyan"
                        : dataDetail?.status_id === 3
                        ? "orange"
                        : dataDetail?.status_id === 4
                        ? "green"
                        : dataDetail?.status_id === 5
                        ? "red"
                        : ""
                    }
                  >
                    {dataDetail?.status_name}
                  </Tag>
                </td>
              </tr>
            </table>
          </div>
          <div className="background" />
        </div>
      )}
    </>
  );
};

export default DetailAppointment;
