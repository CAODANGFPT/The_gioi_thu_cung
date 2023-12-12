import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import {
  useUpdateStatuspetMutation,
  useGetStatusPetByIdQuery,
} from "../../../services/status_pet";
import { TStatusPet } from "../../../schema/status_pet";
import { useEffect } from "react";

const confirm = () => {
  message.success("Cập nhật trạng thái thành công.");
};

const cancel = () => {
  message.error("Cập nhật trạng thái không thành công.");
};

const EditStatusPet = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const status_pet = useGetStatusPetByIdQuery(Number(id));
  const [form] = Form.useForm();

  const [updateStatusMutation, { reset }] = useUpdateStatuspetMutation();

  useEffect(() => {
    if (status_pet.data) {
      form.setFieldsValue({
        name: status_pet.data.name,
      });
    }
  }, [status_pet.data, form]);

  const onFinish = async (values: { name: string }) => {
    try {
      const updatedStatus: TStatusPet = {
        id: Number(id),
        name: values.name,
      };
      await updateStatusMutation(updatedStatus).unwrap();
      confirm();

      reset();

      navigate("/admin/status_pet");
    } catch (error) {
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
        Cập nhật trạng thái liên hệ _ {id}
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
            initialValue={status_pet.data ? status_pet.data.name : ""}
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

export default EditStatusPet;
