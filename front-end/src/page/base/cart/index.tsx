import { FC } from "react";
import { Link } from "react-router-dom";
import "../../../assets/scss/page/cart.scss";
import { useGetAppointmentUserQuery } from "../../../services/appointments";
import { useGetUserQuery } from "../../../services/user";

const CartPage: FC = () => {
  const { data: listAppointment } = useGetAppointmentUserQuery();
  console.log(listAppointment);

  return (
    <div className="cart">
      <h1>Thông tin lịch đặt</h1>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Thông tin người đặt</th>
              <th>Loại thú cưng</th>
              <th>Nhân viên thực hiện</th>
              <th>Phòng</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {listAppointment?.map((item, index) => (
              <tr key={item.id}>
                <td>{index}</td>
                <td>{item.user_email}</td>
                <td>{item.pet_name}</td>
                <td></td>
                <td>{item.pethouse_name}</td>
                <td>{item.status_name}</td>
                <td>
                  <button onClick={() => {}}>Hủy</button>
                </td>
                <td>
                  <Link to={""} className="chitiet" onClick={() => {}}>
                    Chi tiết
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CartPage;
