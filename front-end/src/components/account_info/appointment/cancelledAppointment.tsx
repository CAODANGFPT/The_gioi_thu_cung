import dayjs from "dayjs";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../assets/scss/page/account/appointment.scss";
import { useGetAppointmentUserStatusQuery } from "../../../services/appointments";
import imageNot from "../../../assets/image/notAppoiment.png";

const CancelledAppointment: FC = () => {
  const { data: listAppointment } = useGetAppointmentUserStatusQuery(5);
  const navigate = useNavigate();
  const redirectToAppointment = (item: any) => {
    navigate("/appointment", {
      state: {
        appointmentData: {
          ...item,
          type: 2,
        },
      },
    });
  };
  return (
    <>
      {listAppointment?.length ? (
        <div className="cancelledAppointment">
          <h4>Lịch đặt chờ xác nhận</h4>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>STT</th>
                  <th>Dịch vụ</th>
                  <th>Thú cưng</th>
                  <th>Ngày giờ đặt</th>
                  <th>Phòng</th>
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
                        <td>{item.total}</td>
                        <td style={{ textAlign: "center" }}>
                          {item.status_name}
                        </td>
                        <td className="action" style={{ width: "150px" }}>
                          <div
                            className="btn"
                            onClick={() => redirectToAppointment(item)}
                          >
                            Đặt lại
                          </div>
                          <Link to={""} className="chitiet" onClick={() => {}}>
                            Chi tiết
                          </Link>
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

export default CancelledAppointment;
