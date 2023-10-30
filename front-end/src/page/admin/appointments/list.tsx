import { Button, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import TableAdmin from "../../../components/table";
import { TAppointment } from "../../../schema/appointments";
import dayjs from "dayjs";
import { useGetAllappointmentDataQuery } from "../../../services/appointments";
import { Navigate } from "react-router-dom";

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
    title: "Ca trực",
    dataIndex: "settime_name",
    key: "settime_name",
    width: 150,
  },
  {
    title: "Thời gian Ca",
    key: "settime",
    width: 150,
    render: (setTime) => (
      <>
        {setTime.start_time && setTime.end_time ? (
          <div>
            ({dayjs(setTime.start_time, "HH:mm:ss").format("HH:mm")} -{" "}
            {dayjs(setTime.end_time, "HH:mm:ss").format("HH:mm")})
          </div>
        ) : (
          <div>null</div>
        )}
      </>
    ),
  },
  {
    title: "Thao tác",
    key: "action",
    width: 100,
    render: (id) => (
      <div>
        <Button className="btn-edit" style={{ marginRight: "1rem" }}>
          Sửa
        </Button>
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
