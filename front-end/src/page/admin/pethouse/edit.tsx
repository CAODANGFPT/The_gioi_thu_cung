import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import {
  useUpdatePetHouseMutation,
  usePetHouseByIdQuery,
} from "../../../services/pethouse";
import { TpetHouse } from "../../../schema/pethouse";
import { useStatusQuery } from "../../../services/status";

const confirm = () => {
  message.success("Cập nhật pethouse thành công.");
};

const cancel = () => {
  message.error("Cập nhật pethouse không thành công.");
};

const EditPetHouse = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const pethouse = usePetHouseByIdQuery(Number(id));
  const status = useStatusQuery();
  const [form] = Form.useForm();

  const [updatePethouseMutation, { reset }] = useUpdatePetHouseMutation();

  const onFinish = async (values: { name: string;}) => {
    try {
      const updatedPethouse: TpetHouse = {
        id: Number(id),
        name: values.name,
      };
      await updatePethouseMutation(updatedPethouse).unwrap();
      confirm();
      reset();
      navigate("/admin/pethouse");
    } catch (error) {
      console.log(error);
      cancel();
      console.error("Error updating pethouse:", error);
      reset();
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    console.log(status);
  };

  return (
    <>
      <h1 className="md:ml-16 md:text-left text-center mt-5 text-3xl font-semibold dark:text-white text-black">
        Cập nhật Room _ {id}
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
            initialValue={pethouse.data ? pethouse.data.name : ""}
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

export default EditPetHouse;
