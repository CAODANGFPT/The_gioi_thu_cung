import React from "react";
import type { FormInstance } from "antd";
import { Button, Form, Input, Space, message } from "antd";
import {
  useCreateStatusOrderMutation,
  useGetAllStatusOrderQuery,
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

  const { refetch } = useGetAllStatusOrderQuery();

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
    <>
      <h2
        style={{
          marginBottom: "1rem",
          fontSize: "25px",
          padding: "0.8rem",
          borderRadius: "3px",
          boxShadow: "0px 0px 5px #c3c3c3",
        }}
      >
        Thêm trạng thái đặt hàng
      </h2>
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
          <Space style={{ float: "right" }}>
            <SubmitButton form={form} />
            <Button htmlType="reset">Reset</Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddStatusOrderAdmin;
