import dayjs from "dayjs";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import imageNot from "../../../assets/image/notAppoiment.png";
import { useGetAppointmentUserStatusQuery } from "../../../services/appointments";
import "../../../assets/scss/page/account/appointment.scss";
import { Button, Tag } from "antd";

const DoingAppointment: FC = () => {
  const { data: listAppointment } = useGetAppointmentUserStatusQuery(3);
  console.log("data", listAppointment);
  const navigate = useNavigate();

  const handlePayment = (id: number | undefined, total: number | undefined) => {
    if (total !== undefined) {
      navigate(`/payment/${id}/${total}`);
    } else {
      console.error("Không có thông tin thanh toán");
    }
  };
  return (
    <>
      {listAppointment?.length ? (
        <div className="cancelledAppointment">
          <h4>Lịch đặt đang làm</h4>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>STT</th>
                  <th>Dịch vụ</th>
                  <th>Thú cưng</th>
                  <th>Ngày giờ đặt</th>
                  <th>Phòng</th>
                  <th>Thanh toán</th>
                  <th>Tổng tiền</th>
                  <th style={{ textAlign: "center" }}>Trạng thái</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {listAppointment &&
                  listAppointment.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td style={{ textAlign: "center" }}>{index + 1}</td>
                        <td>
                          {item.services &&
                            Array.isArray(item.services) &&
                            item.services.map((service, serviceIndex) => (
                              <span key={serviceIndex}>
                                {service.name}
                                {serviceIndex < item.services.length - 1
                                  ? ", "
                                  : ""}
                              </span>
                            ))}
                        </td>
                        <td>
                          {item.pets &&
                            Array.isArray(item.pets) &&
                            item.pets.map((pet, serviceIndex) => (
                              <span key={serviceIndex}>
                                {pet.name}
                                {serviceIndex < item.pets.length - 1
                                  ? ", "
                                  : ""}
                              </span>
                            ))}
                        </td>
                        <td>
                          {dayjs(item.start_time).format("HH:mm DD-MM-YYYY")}
                        </td>
                        <td>{item.pethouse_name}</td>
                        <td>{item.statusPaymentName}</td>
                        <td>
                          {new Intl.NumberFormat("vi-VN").format(
                            item.total ?? 0
                          )}{" "}
                          VNĐ
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <Tag
                            color={
                              item.status_name === "Đang chờ xác nhận"
                                ? "blue"
                                : item.status_name === "Đã xác nhận"
                                ? "cyan"
                                : item.status_name === "Đang làm"
                                ? "orange"
                                : item.status_name === "Đã hoàn thành"
                                ? "green"
                                : item.status_name === "Hủy"
                                ? "red"
                                : ""
                            }
                          >
                            {item.status_name}
                          </Tag>
                        </td>
                        <td className="action">
                          <div>
                            {typeof item.total === "number" &&
                            typeof item.id === "number" ? (
                              <Button
                                className="btn-done"
                                onClick={() => {
                                  handlePayment(item.id, item.total);
                                  navigate(`/payment/${item.id}/${item.total}`);
                                }}
                              >
                                Thanh toán
                              </Button>
                            ) : (
                              <p>Không có thông tin thanh toán</p>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="notAppointment">
          <div>
            <img src={imageNot} alt="" />
          </div>
          <div>Chưa có lịch nào</div>
        </div>
      )}
    </>
  );
};

export default DoingAppointment;
