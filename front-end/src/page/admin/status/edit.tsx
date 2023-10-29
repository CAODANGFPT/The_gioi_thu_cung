import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import {
  useUpdateStatusMutation,
  useGetStatusByIdQuery,
} from "../../../services/status";
import { TStatus } from "../../../schema/status";
import { useEffect } from "react";

const confirm = () => {
  message.success("Cập nhật trạng thái thành công.");
};

const cancel = () => {
  message.error("Cập nhật trạng thái không thành công.");
};

const EditStatus = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const status = useGetStatusByIdQuery(Number(id));
  const [form] = Form.useForm();

  const [updateStatusMutation, { reset }] = useUpdateStatusMutation();

  useEffect(() => {
    if (status.data) {
      form.setFieldsValue({
        name: status.data.name,
      });
    }
  }, [status.data, form]);

  const onFinish = async (values: { name: string }) => {
    try {
      const updatedStatus: TStatus = {
        id: Number(id),
        name: values.name,
      };
      await updateStatusMutation(updatedStatus).unwrap();
      confirm();

      reset();

      navigate("/admin/status");
    } catch (error) {
      console.log(error);
      cancel();
      console.error("Error updating stauts:", error);
      reset();
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <h1 className="md:ml-16 md:text-left text-center mt-5 text-3xl font-semibold dark:text-white text-black">
        Cập nhật trạng thái _ {id}
      </h1>
      <div className="md:ml-16 sm:mx-auto mx-2 mt-5">
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            label="Trạng thái"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập trạng thái" }]}
            initialValue={status.data ? status.data.name : ""}
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

export default EditStatus;
