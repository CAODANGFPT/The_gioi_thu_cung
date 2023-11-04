import React from "react";
import type { FormInstance } from "antd";
import { Button, Form, Input, Select, Space, message } from "antd";
import {
  useCreatePetsMutation,
  useGetAllPetsQuery,
} from "../../../services/pets";
import { useNavigate } from "react-router-dom";
import { useGetAllpetHouseQuery } from "../../../services/pethouse";
import { TpetHouse } from "../../../schema/pethouse";
import { useServicesQuery } from "../../../services/services";
import { TServices } from "../../../schema/services";
import { useSetTimeQuery } from "../../../services/setTime";
import { TSetTime } from "../../../schema/setTime";
import { useAddAppointmentMutation } from "../../../services/appointments";

const SubmitButton = ({ form }: { form: FormInstance }) => {
  const [submittable, setSubmittable] = React.useState(false);

  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [form, values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      Submit
    </Button>
  );
};

const Appointment: React.FC = () => {
  const [form] = Form.useForm();

  const [createAppointment] = useAddAppointmentMutation();

  const navigate = useNavigate();

  const pethouse = useGetAllpetHouseQuery();

  const services = useServicesQuery();

  const settime = useSetTimeQuery();

  const { refetch } = useGetAllPetsQuery();

  const user = JSON.parse(localStorage.getItem("user") as string);

  const handleFormSubmit = async (values: any) => {
    try {
      await createAppointment(values);
      message.success("Thêm loại thành công");

      refetch();

      navigate("/appointment");
    } catch (error: any) {
      message.error("Thêm loại thất bại : " + error.message);
    }
  };

  return (
    <Form
      form={form}
      name="validateOnly"
      layout="vertical"
      autoComplete="off"
      onFinish={handleFormSubmit}
    >
      <Form.Item
        // style={{ display: "none" }}
        name="day"
        label="Thời gian"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        // style={{ display: "none" }}
        name="pet_id"
        label="Pet_id"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        style={{ display: "none" }}
        name="pet_id"
        label="Pet_ID"
        rules={[{ required: true }]}
        // initialValue={user.user.id}
      >
        <Input disabled={true} />
      </Form.Item>

      <Form.Item
        name="services_id"
        label="Dịch vụ"
        rules={[{ required: true }]}
      >
        <Select>
          {services.data?.map((item: TServices) => (
            <Select.Option key={item.id} value={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        style={{ display: "none" }}
        name="user_id"
        label="Tài Khoản Login"
        rules={[{ required: true }]}
        initialValue={user.user.id}
      >
        <Input disabled={true} />
      </Form.Item>

      <Form.Item
        name="pethouse_id"
        label="Loại phòng"
        rules={[{ required: true }]}
      >
        <Select>
          {pethouse.data?.map((item: TpetHouse) => (
            <Select.Option key={item.id} value={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="time_id" label="Thời gian" rules={[{ required: true }]}>
        <Select>
          {settime.data?.map((item: TSetTime) => (
            <Select.Option key={item.id} value={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="status_id" label="Status">
        <Input />
      </Form.Item>

      <Form.Item
        style={{ marginTop: 60 }}
        label={
          <span className="text-base dark:text-white">Tên người đăng</span>
        }
      >
        <span className="dark:text-white">{user.user.name}</span>
      </Form.Item>

      <Form.Item>
        <Space>
          <SubmitButton form={form} />
          <Button htmlType="reset">Reset</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default Appointment;
