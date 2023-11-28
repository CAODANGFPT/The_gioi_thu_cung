// import "../../../assets/scss/admin/appoinments.scss";
import { useState, useEffect } from "react";
import { Button, DatePicker, Form, Input, Select, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import React from "react";
import TableAdmin from "../../../components/table";
import { TAppointmentSchemaRes } from "../../../schema/appointments";
import { TpetHouse } from "../../../schema/pethouse";
import {
  useGetAllappointmentDataQuery,
  useSearchAddAppointmentMutation,
} from "../../../services/appointments";
import { useGetAllpetHouseQuery } from "../../../services/pethouse";
import { useStatusQuery } from "../../../services/status_appointment";
import { Link, useNavigate } from "react-router-dom";
const AppointmentsAdmin: React.FC = () => {
  const navigate = useNavigate();

  const [dataAppoiment, setDataAppoiment] = useState<any | null>(null);
  const { data } = useGetAllappointmentDataQuery();
  useEffect(() => {
    if (data) {
      setDataAppoiment(data);
    }
  }, [data]);
  const { data: petHouse } = useGetAllpetHouseQuery();
  const [searchAddAppointment] = useSearchAddAppointmentMutation();

  const { data: petStatus } = useStatusQuery();

  const optionsPetHouse = petHouse?.map((item: TpetHouse) => ({
    value: item.id,
    label: item.name,
    disabled: item.status_id === 1,
  }));
  const optionsStatus = petStatus?.map((item: TpetHouse) => ({
    value: item.id,
    label: item.name,
    disabled: item.status_id === 1,
  }));

  const redirectToAppointment = (item: any) => {
    navigate("/admin/appointment/edit", {
      state: {
        appointmentData: item,
      },
    });
  };
  const columns: ColumnsType<TAppointmentSchemaRes> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 20,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Người đặt",
      dataIndex: "user_name",
      key: "user_name",
      width: 100,
    },
    {
      title: "Ngày đặt",
      dataIndex: "start_time",
      key: "day",
      render: (text) => <div>{dayjs(text).format("DD-MM-YYYY")}</div>,
      width: 100,
    },
    {
      title: "Tên thú cưng",
      dataIndex: "pets",
      key: "pets",
      width: 100,
      render: (pets) => (
        <div>
          {pets &&
            Array.isArray(pets) &&
            pets.map((pet, serviceIndex) => (
              <span key={serviceIndex}>
                {pet.name}
                {serviceIndex < pets.length - 1 ? ", " : ""}
              </span>
            ))}
        </div>
      ),
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "services",
      key: "services",
      width: 100,
      render: (services) => (
        <div>
          {services &&
            Array.isArray(services) &&
            services.map((service, serviceIndex) => (
              <span key={serviceIndex}>
                {service.name}
                {serviceIndex < services.length - 1 ? ", " : ""}
              </span>
            ))}
        </div>
      ),
    },

    {
      title: "Tên phòng",
      dataIndex: "pethouse_name",
      key: "pethouse_name",
      width: 150,
    },
    {
      title: "Thời gian Ca",
      key: "time",
      width: 100,
      render: (data) => (
        <>
          {data.start_time && data.end_time ? (
            <div>
              {dayjs(data.start_time).format("HH:mm")} -
              {dayjs(data.end_time).format("HH:mm")}
            </div>
          ) : (
            <div>null</div>
          )}
        </>
      ),
    },
    {
      title: "Thanh toán thái",
      dataIndex: "statusPaymentName",
      key: "statusPaymentName",
      width: 100,
      render: (statusPaymentName) => (
        <>
          <div>{statusPaymentName}</div>
        </>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status_name",
      key: "status_name",
      width: 100,
      render: (status_name) => (
        <>
          <div>{status_name}</div>
        </>
      ),
    },
    {
      key: "action",
      width: 100,
      render: (data) => (
        <>
          <div>
            <Button
              onClick={() => redirectToAppointment(data)}
              className="btn-edit"
              style={{ marginRight: "1rem" }}
            >
              Sửa
            </Button>
            <button>Hủy</button>
          </div>
        </>
      ),
    },
  ];
  const onFinish = async (values: any) => {
    if (values.start_time) {
      values.start_time = dayjs(values.start_time).format("YYYY-MM-DD");
    }
    const { nameUser, pethouse_id, start_time, status_id } = values;
    const servicesData = {
      nameUser,
      pethouse_id,
      start_time: start_time,
      status_id,
    };

    try {
      const data: any = await searchAddAppointment(servicesData).unwrap();
      setDataAppoiment(data.uniqueData);
    } catch (error) {
      console.log(error);
      message.error("Không tìm thấy bài nào phù hợp");
    }
  };
  return (
    <>
      <h4>Tìm kiếm</h4>
      <Form
        name="validateOnly"
        className="search-appointments"
        layout="vertical"
        autoComplete="off"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
      >
        <div className="search-appointments-form">
          <Form.Item name="nameUser" label="Tên người đặt">
            <Input />
          </Form.Item>
          <Form.Item name="pethouse_id" label="Phòng">
            <Select options={optionsPetHouse} />
          </Form.Item>
          <Form.Item label="Ngày" name="start_time" style={{ width: "100%" }}>
            <DatePicker
              style={{ width: "100%" }}
              format="YYYY-MM-DD"
              showNow={false}
            />
          </Form.Item>
          <Form.Item name="status_id" label="Trạng thái">
            <Select options={optionsStatus} />
          </Form.Item>
        </div>
        <div>
          <Button htmlType="submit">Tìm kiếm</Button>
        </div>
      </Form>
      <TableAdmin columns={columns} data={dataAppoiment} />;
    </>
  );
};

export default AppointmentsAdmin;
