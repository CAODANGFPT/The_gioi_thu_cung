/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, Input, message } from "antd";
import { useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { TFooter } from "../../../schema/footer";
import {
  useGetFooterByIdQuery,
  useUpdateFooterMutation,
} from "../../../services/footer";

const EditFooterAdmin = () => {
  const { TextArea } = Input;
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const footer = useGetFooterByIdQuery(Number(id));
  const [form] = Form.useForm();

  const [updateFooterMutation, { reset }] = useUpdateFooterMutation();
  const confirm = () => {
    message.success("Cập nhật thành công.");
  };

  const cancel = () => {
    message.error("Cập nhật không công.");
  };

  useEffect(() => {
    form.setFieldsValue({
      id: footer.data?.id,
      slogan: footer.data?.slogan,
      content_left: footer.data?.content_left,
      content_right: footer.data?.content_right,
      license: footer.data?.license,
    });
  }, [
    form,
    footer.data?.id,
    footer.data?.slogan,
    footer.data?.content_left,
    footer.data?.content_right,
    footer.data?.license,
  ]);

  const onFinish = async (values: TFooter) => {
    try {
      await updateFooterMutation(values).unwrap();
      confirm();
      reset();
      navigate("/admin/footer");
    } catch (error) {
      cancel();
      console.error("Lỗi cập nhật kiểu menu:", error);
      reset();
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <h1 className="md:ml-16 md:text-left text-center mt-5 text-3xl font-semibold dark:text-white text-black">
        Cập nhật Footer
      </h1>
      <div className="md:ml-16 sm:mx-auto mx-2 mt-5">
        <Form
          form={form}
          name="updateMenuTypeForm"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item name="id" label="ID">
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="slogan"
            label="Slogan"
            rules={[{ required: true, message: "Vui lòng nhập slogan!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="content_left"
            label="Nội dung trái"
            rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
          >
            <TextArea rows={6} placeholder="Vui lòng nhập nội dung..." />
          </Form.Item>

          <Form.Item
            name="content_right"
            label="Nội dung phải"
            rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
          >
            <TextArea rows={6} placeholder="Vui lòng nhập nội dung..." />
          </Form.Item>

          <Form.Item
            name="license"
            label="Bản quyền"
            rules={[{ required: true, message: "Vui lòng nhập bản quyền!" }]}
          >
            <Input />
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

export default EditFooterAdmin;
