import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, InputNumber, message } from "antd";
import {
  useUpdatePetHouseMutation,
  usePetHouseByIdQuery,
} from "../../../services/pethouse";
import { TpetHouse } from "../../../schema/pethouse";
import { useEffect } from "react";

const confirm = () => {
  message.success("Cập nhật trạng thái thành công.");
};

const cancel = () => {
  message.error("Cập nhật trạng thái không thành công.");
};

const EditPetHouse = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const pethouse = usePetHouseByIdQuery(Number(id));
  const [form] = Form.useForm();

  const [updatePetHouseMutation, { reset }] = useUpdatePetHouseMutation();

  useEffect(() => {
    if (pethouse.data) {
      form.setFieldsValue({
        id: pethouse.data.id,
        name: pethouse.data.name,
        price: pethouse.data.price,
      });
    }
  }, [pethouse.data, form]);

  const onFinish = async (values: {
    id: number;
    name: string;
    price: number;
  }) => {
    try {
      const updatedPetHouse: TpetHouse = {
        id: Number(id),
        name: values.name,
        price: values.price,
      };
      await updatePetHouseMutation(updatedPetHouse).unwrap();
      confirm();

      reset();

      navigate("/admin/pethouse");
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
        Cập nhật phòng _ {id}
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
            rules={[{ required: true, message: "Vui lòng nhập phòng" }]}
            initialValue={pethouse.data ? pethouse.data.name : ""}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<span className="text-base dark:text-white">Giá phòng</span>}
            name="price"
            rules={[{ required: true, message: "Vui lòng nhập giá phòng!" }]}
          >
            <InputNumber
              min={1}
              className="dark:hover:border-[#00c6ab] w-full transition-colors duration-300"
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

export default EditPetHouse;
