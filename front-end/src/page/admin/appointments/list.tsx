import { Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import TableAdmin from "../../../components/table";
import { TAppointment } from "../../../schema/appointments";
import dayjs from "dayjs";
import { useGetAllappointmentDataQuery } from "../../../services/appointments";
const confirm = () => {
  message.success("Xóa thành công.");
};

const cancel = () => {
  message.error("Xóa không thành công.");
};

const columns: ColumnsType<TAppointment> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 150,
  },
  {
    title: "Ngày đặt",
    dataIndex: "day",
    key: "day",
    render: (text) => <div>{dayjs(text).format("DD-MM-YYYY")}</div>,
    width: 150,
  },
  {
    title: "Tên thú cưng",
    dataIndex: "pet_name",
    key: "pet_name",
    width: 150,
  },
  {
    title: "Tên dịch vụ",
    dataIndex: "service_name",
    key: "service_name",
    width: 150,
  },
  {
    title: "Email người dùng",
    dataIndex: "user_email",
    key: "user_email",
    width: 150,
  },
  {
    title: "Tên phòng",
    dataIndex: "pethouse_name",
    key: "pethouse_name",
    width: 150,
  },
  {
    title: "Ca Trực",
    dataIndex: "settime_name",
    key: "settime_name",
    width: 150,
  },
  {
    title: "Thời gian ca",
    dataIndex: "time",
    key: "settime_time",
    width: 150,
  },
  {
    title: "Thao tác",
    key: "action",
    width: 100,
    render: (Appointment: TAppointment) => (
      <div>
        <Popconfirm
          title="Xóa trạng thái."
          description="Bạn có muốn xóa không?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Đồng ý"
          cancelText="Không"
        >
          <Button danger className="btn-delete">
            Xóa
          </Button>
        </Popconfirm>
      </div>
    ),
  },
];

const AppointmentsAdmin: React.FC = () => {
  const { data } = useGetAllappointmentDataQuery();

  return (
    <div>
      <TableAdmin columns={columns} data={data} />;
    </div>
  );
};

export default AppointmentsAdmin;
