import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import {
  useUpdateSpeciesMutation,
  useGetSpeciesByIdQuery,
} from "../../../services/species";
import { Tspecies } from "../../../schema/species";
import { useEffect } from "react";


const confirm = () => {
  message.success("Cập nhật Species thành công.");
};

const cancel = () => {
  message.error("Cập nhật Species không thành công.");
};

const EditSpecies = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const species = useGetSpeciesByIdQuery(Number(id));
  const [form] = Form.useForm();

  const [updatePethouseMutation, { reset }] = useUpdateSpeciesMutation();

  useEffect(() => {
    if (species.data) {
      form.setFieldsValue({
        name: species.data.name,
      });
    }
  }, [species.data, form]);

  const onFinish = async (values: { name: string;}) => {
    try {
      const updatedSpecies: Tspecies = {
        id: Number(id),
        name: values.name,
      };
      await updatePethouseMutation(updatedSpecies).unwrap();
      confirm();
      reset();
      navigate("/admin/species");
    } catch (error) {
      cancel();
      console.error("Error updating species:", error);
      reset();
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <h1 className="md:ml-16 md:text-left text-center mt-5 text-3xl font-semibold dark:text-white text-black">
        Cập nhật Loại ĐV _ {id}
      </h1>
      <div className="md:ml-16 sm:mx-auto mx-2 mt-5">
        <Form
          form={form}
          name="updateUserRoleForm"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên" }]}
            initialValue={species.data ? species.data.name : ""}
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

export default EditSpecies;