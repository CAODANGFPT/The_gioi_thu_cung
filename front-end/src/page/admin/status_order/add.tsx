import React from "react";
import type { FormInstance } from "antd";
import { Button, Form, Input, Space, message } from "antd";
import {
  useCreateStatusOrderMutation,
  useGetAllstatusOrderQuery,
} from "../../../services/status_order";
import { useNavigate } from "react-router-dom";

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

const AddStatusOrderAdmin: React.FC = () => {
  const [form] = Form.useForm();

  const [createStatusOrder] = useCreateStatusOrderMutation();

  const navigate = useNavigate();

  const { refetch } = useGetAllstatusOrderQuery();

  const handleFormSubmit = async (values: any) => {
    try {
      await createStatusOrder(values);
      message.success("Trạng thái đã được thêm thành công.");

      refetch();

      navigate("/admin/status_order");
    } catch (error: any) {
      message.error("Lỗi khi thêm trạng thái: " + error.message);
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
      <Form.Item name="name" label="Trạng thái" rules={[{ required: true }]}>
        <Input />
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

export default AddStatusOrderAdmin;
