import React from "react";
import type { FormInstance } from "antd";
import { Button, Form, Input, Space, message } from "antd";
import { useProfileQuery } from "../../../services/profile";
import { useNavigate } from "react-router-dom";
import { useAddProfileMutation } from "../../../services/profile";

const AddProfile: React.FC = () => {
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

  const [form] = Form.useForm();

  const [createProfile] = useAddProfileMutation();

  const navigate = useNavigate();

  const { refetch } = useProfileQuery();

  const handleFormSubmit = async (values: any) => {
    try {
      await createProfile(values);
      message.success("Profile đã được thêm thành công.");

      refetch();

      navigate("/admin/profile");
    } catch (error: any) {
      message.error("Lỗi khi thêm Profile: " + error.message);
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
        name="logo"
        label="Logo"
        rules={[{ required: true, message: "Vui lòng nhập logo!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="email"
        rules={[{ required: true, message: "Vui lòng nhập email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Số điện thoại"
        rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="fb"
        label="Facebook"
        rules={[{ required: true, message: "Vui lòng nhập facebook!" }]}
      >
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

export default AddProfile;
