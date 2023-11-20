import dayjs from "dayjs";
import { FC } from "react";
import { Link } from "react-router-dom";
import "../../assets/scss/page/cancelledAppointment.scss";
import { useGetAppointmentUserStatusQuery } from "../../services/appointments";

const CancelledAppointment: FC = (p) => {
  const { data: listAppointment } = useGetAppointmentUserStatusQuery(5);
  return (
    <div className="cancelledAppointment">
    <h1>Thông tin lịch đặt</h1>
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Thông tin người đặt</th>
            <th>Ngày giờ đặt</th>
            <th>Phòng</th>
            <th>Trạng thái</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listAppointment?.map((item, index) => {
            if (item.is_delete) {
              return null;
            }
            return (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.user_email}</td>
                <td>
                  {dayjs(item.start_time).format("DD-MM-YYYY (HH:mm:ss")}
                </td>
                <td>{item.pethouse_name}</td>
                <td>{item.status_name}</td>
                <td>
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
  )
}

export default CancelledAppointment