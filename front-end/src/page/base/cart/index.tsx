import { FC } from "react";
import { Link } from "react-router-dom";
import "../../../assets/scss/page/cart.scss";
import {
  useCancelHistoryAppointmentMutation,
  useGetAppointmentUserQuery,
} from "../../../services/appointments";
import { Button, Popconfirm, message } from "antd";

const CartPage: FC = () => {
  const { data: listAppointment } = useGetAppointmentUserQuery();
  const [CancelHistoryAppointmentMutation] =
    useCancelHistoryAppointmentMutation();

  const confirm = (id: number) => {
    try {
      const res = CancelHistoryAppointmentMutation({ id: id });
      if ("data" in res) {
        message.success("Hủy thành công.");
      }
    } catch (error) {
      message.error("Hủy không thành công.");
    }
  };

  const cancel = () => {
    message.error("Hủy không thành công.");
  };

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
            {listAppointment?.map((item, index) => {
              if (item.is_delete) {
                return null;
              }
              return (
                <tr key={item.id}>
                  <td>{index}</td>
                  <td>{item.user_email}</td>
                  <td>{item.pet_name}</td>
                  <td></td>
                  <td>{item.pethouse_name}</td>
                  <td>{item.status_name}</td>
                  <td>
                    <Popconfirm
                      title="Xóa trạng thái."
                      description="Bạn có muốn hủy không?"
                      onConfirm={() => confirm(item.id || 0)}
                      onCancel={cancel}
                      okText="Đồng ý"
                      cancelText="Không"
                    >
                      <Button
                        disabled={item.status_name !== "Đang chờ xác nhận"}
                        danger
                        className="btn-delete"
                      >
                        Hủy đặt lịch
                      </Button>
                    </Popconfirm>
                  </td>
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
  );
};

export default CartPage;
