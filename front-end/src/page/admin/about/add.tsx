import React, { useState } from "react";
import type { FormInstance } from "antd";
import { Button, Form, Input, Space, message } from "antd";
import { useAddAboutMutation, useAboutQuery } from "../../../services/about";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";

const AddAbout: React.FC = () => {
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
  const [value, setValue] = useState("");

  const [form] = Form.useForm();

  const [createAbout] = useAddAboutMutation();

  const navigate = useNavigate();

  const { refetch } = useAboutQuery();

  const handleFormSubmit = async (values: any) => {
    try {
      await createAbout(values);
      message.success("About đã được thêm thành công.");

      refetch();

      navigate("/admin/about");
    } catch (error: any) {
      message.error("Lỗi khi thêm About: " + error.message);
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
        name="image"
        label="Ảnh"
        rules={[{ required: true, message: "Vui lòng nhập image!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="description"
        label="Mô tả"
        rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
      >
        <ReactQuill
          style={{ height: 500 }}
          theme="snow"
          value={value}
          onChange={setValue}
        />
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

export default AddAbout;
