import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import {
  useUpdateStaffMutation,
  useGetStaffByIdQuery,
} from "../../../services/staff";
import { TStaff } from "../../../schema/staff";
import { useEffect } from "react";

const confirm = () => {
  message.success("Cập nhật tên nhân viên thành công.");
};

const cancel = () => {
  message.error("Cập nhật tên nhân viên không thành công.");
};

const EditStaff = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const staff = useGetStaffByIdQuery(Number(id));
  const [form] = Form.useForm();

  const [updateStaffMutation, { reset }] = useUpdateStaffMutation();

  useEffect(() => {
    if (staff.data) {
      form.setFieldsValue({
        name: staff.data.name,
      });
    }
  }, [staff.data, form]);

  const onFinish = async (values: { name: string }) => {
    try {
      const updatedStaff: TStaff = {
        id: Number(id),
        name: values.name,
      };
      await updateStaffMutation(updatedStaff).unwrap();
      confirm();

      reset();

      navigate("/admin/staff");
    } catch (error) {
      console.log(error);
      cancel();
      console.error("Error updating staff:", error);
      reset();
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <h1 className="md:ml-16 md:text-left text-center mt-5 text-3xl font-semibold dark:text-white text-black">
        Cập nhật nhân viên _ {id}
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
            initialValue={staff.data ? staff.data.name : ""}
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

export default EditStaff;
