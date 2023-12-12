import {
  Button,
  DatePicker,
  Form,
  Input,
  Popconfirm,
  Select,
  message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/scss/admin/appointments.scss";
import TableAdmin from "../../../components/table";
import { TAppointmentSchemaRes } from "../../../schema/appointments";
import { TpetHouse } from "../../../schema/pethouse";
import {
  useGetAllappointmentDataQuery,
  useSearchAddAppointmentMutation,
  useUpdateStatusAppointmentMutation,
} from "../../../services/appointments";
import * as XLSX from "xlsx";
import { useGetAllpetHouseQuery } from "../../../services/pethouse";
import { useStatusQuery } from "../../../services/status_appointment";
const AppointmentsAdmin: React.FC = () => {
  const nameFile: string = "lịch đặt"
  const navigate = useNavigate();
  const [updateStatusAppointment] = useUpdateStatusAppointmentMutation();
  const confirm = async (id: number) => {
    try {
      await updateStatusAppointment({ id: id, status_id: 5 });
    } catch (error) {}
  };

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

  const exportToExcel = () => {
    const flattenData = dataAppoiment.map((item: any) => ({
      "Id": item.id,
      "Email người đặt": item.user_email,
      "Tên người đặt": item.user_name,
      "Thú cưng": item.pets && item.pets.length > 0 ? item.pets.map((pet: { name: string; }) => pet.name).join(', ') : '',
      "Dịch vụ": item.services && item.services.length > 0 ? item.services.map((service: { name: string; }) => service.name).join(', ') : '',
      "Ngày đặt": dayjs(item.day).format("DD-MM-YYYY HH:mm"),
      "Ngày làm": dayjs(item.start_time).format("DD-MM-YYYY HH:mm"),  
      "Phòng": item.pethouse_name,
      "Thành tiền": item.total,
      "Trạng thái": item.status_name,
      "Trạng thái thanh toán": item.statusPaymentName
    }));
    const ws = XLSX.utils.json_to_sheet(flattenData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${nameFile}.xlsx`);
  };
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
  const redirectToAdd = () => {
    navigate("/admin/appointment/add");
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
      title: "Thanh toán",
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
            {data.status_id === 1 || data.status_id === 2 ? (
              <Popconfirm
                onConfirm={() => confirm(data.id)}
                title="Hủy lịch"
                description="Bạn có chắc chắn hủy lịch này không?"
              >
                <Button className="btn">Hủy</Button>
              </Popconfirm>
            ) : null}
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

    console.log(values);

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
      <h2>Tìm kiếm</h2>
      <Form
        name="validateOnly"
        className="search-appointments"
        layout="vertical"
        autoComplete="off"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{ marginTop: 10 }}
      >
        <div className="search-appointments-form">
          <Form.Item name="nameUser">
            <Input placeholder="Tên người đặt" />
          </Form.Item>
          <Form.Item name="pethouse_id" label="">
            <Select options={optionsPetHouse} placeholder="Phòng" />
          </Form.Item>
          <Form.Item name="start_time" style={{ width: "100%" }}>
            <DatePicker
              placeholder="Ngày"
              style={{ width: "100%" }}
              format="YYYY-MM-DD"
              showNow={false}
            />
          </Form.Item>
          <Form.Item name="status_id">
            <Select options={optionsStatus} placeholder="Trạng thái" />
          </Form.Item>
        </div>
        <div>
          <Button htmlType="submit">Tìm kiếm</Button>
        </div>
      </Form>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          style={{ marginTop: 20, marginBottom: 20 }}
          className="btn"
          onClick={() => redirectToAdd()}
        >
          Thêm lịch đặt
        </Button>
        <Button
          style={{ marginTop: 20, marginBottom: 20 }}
          className="btn"
          onClick={() => exportToExcel()}
        >
          Xuất
        </Button>
      </div>
        <TableAdmin columns={columns} data={dataAppoiment} />;
    </>
  );
};

export default AppointmentsAdmin;
