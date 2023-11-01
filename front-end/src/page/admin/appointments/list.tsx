import { Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import React from "react";
import TableAdmin from "../../../components/table";
import { TAppointment } from "../../../schema/appointments";
import {
  useGetAllappointmentDataQuery,
  useUpdateStatusAppointmentMutation,
} from "../../../services/appointments";
import { useStatusQuery } from "../../../services/status_appointment";
const AppointmentsAdmin: React.FC = () => {
  const { data } = useGetAllappointmentDataQuery();
  const { data: status } = useStatusQuery();
  const [updateStatusAppointment] = useUpdateStatusAppointmentMutation();

  const options = status?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const handleChange = async ({
    id,
    status_id,
  }: {
    id: number;
    status_id: number;
  }) => {
    console.log(id, status_id);
    await updateStatusAppointment({ id, status_id });
  };

  const columns: ColumnsType<TAppointment> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 50,
    },
    {
      title: "Email người dùng",
      dataIndex: "user_email",
      key: "user_email",
      width: 150,
    },
    {
      title: "Ngày đặt",
      dataIndex: "day",
      key: "day",
      render: (text) => <div>{dayjs(text).format("DD-MM-YYYY")}</div>,
      width: 100,
    },
    {
      title: "Tên thú cưng",
      dataIndex: "pet_name",
      key: "pet_name",
      width: 100,
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "service_name",
      key: "service_name",
      width: 100,
    },

    {
      title: "Tên phòng",
      dataIndex: "pethouse_name",
      key: "pethouse_name",
      width: 150,
    },
    {
      title: "Thời gian Ca",
      key: "settime",
      width: 100,
      render: (setTime) => (
        <>
          {setTime.start_time && setTime.end_time ? (
            <div>
              ({dayjs(setTime.start_time, "HH:mm:ss").format("HH:mm")} -
              {dayjs(setTime.end_time, "HH:mm:ss").format("HH:mm")})
            </div>
          ) : (
            <div>null</div>
          )}
        </>
      ),
    },
    {
      title: "Trạng thái",
      key: "status_name",
      width: 100,
      render: (appointment) => (
        <>
          {console.log(appointment)}
          <Select
            defaultValue={appointment.status_name}
            style={{ width: "100%" }}
            onChange={(status_id) =>
              handleChange({ id: appointment.id, status_id: status_id })
            }
            options={options}
          />
        </>
      ),
    },
  ];

  return <TableAdmin columns={columns} data={data} />;
};

export default AppointmentsAdmin;
