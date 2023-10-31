import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import {
  useUpdateAboutMutation,
  useGetAboutByIdQuery,
} from "../../../services/about";
import { TAbout } from "../../../schema/about";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";

const confirm = () => {
  message.success("Cập nhật trạng thái thành công.");
};

const cancel = () => {
  message.error("Cập nhật trạng thái không thành công.");
};

const EditAbout = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const about = useGetAboutByIdQuery(Number(id));
  const [form] = Form.useForm();

  const [updateAboutMutation, { reset }] = useUpdateAboutMutation();

  useEffect(() => {
    if (about.data) {
      form.setFieldsValue({
        image: about.data.image,
        description: about.data.description,
      });
    }
  }, [about.data, form]);

  const onFinish = async (values: { image: string; description: string }) => {
    try {
      const updatedAbout: TAbout = {
        id: Number(id),
        image: values.image,
        description: values.description,
      };
      await updateAboutMutation(updatedAbout).unwrap();
      confirm();

      reset();

      navigate("/admin/about");
    } catch (error) {
      console.log(error);
      cancel();
      console.error("Error updating About:", error);
      reset();
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <h1 className="md:ml-16 md:text-left text-center mt-5 text-3xl font-semibold dark:text-white text-black">
        Cập nhật About _ {id}
      </h1>
      <div className="md:ml-16 sm:mx-auto mx-2 mt-5">
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            label="Image"
            name="image"
            rules={[{ required: true, message: "Vui lòng nhập About" }]}
            initialValue={about.data ? about.data.image : ""}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={<span className="text-base dark:text-white">Mô tả</span>}
            name="description"
            rules={[{ required: true, message: "Vui lòng nhập giá mô tả!" }]}
            initialValue={about.data ? about.data.description : ""}
          >
            <ReactQuill
              style={{ height: 500 }}
              theme="snow"
              value={value}
              onChange={setValue}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default EditAbout;
