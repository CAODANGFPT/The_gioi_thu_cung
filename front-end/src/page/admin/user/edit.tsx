import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button, Form, Input, Select, message } from "antd";
import {
  useUpdateRoleUserMutation,
  useUserByIdQuery,
} from "../../../services/user";
import { useRoleQuery } from "../../../services/role";
import { TRole } from "../../../schema/role";
import { TRoleUser } from "../../../schema/user";

const confirm = () => {
  message.success("Cập nhật thành công.");
};

const cancel = () => {
  message.error("Cập nhật không công.");
};

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const user = useUserByIdQuery(Number(id));
  const roles = useRoleQuery();
  const [form] = Form.useForm();

  const [updateRoleUserMutation, { reset }] = useUpdateRoleUserMutation();

  const onFinish = async (values: { role_id: number }) => {
    try {
      const updatedUser: TRoleUser = {
        id: Number(id),
        role_id: values.role_id,
      };
      await updateRoleUserMutation(updatedUser).unwrap();
      confirm();
      reset();
      navigate("/admin/user");
    } catch (error) {
      cancel();
      console.error("Error updating user role:", error);
      reset();
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <h1 className="md:ml-16 md:text-left text-center mt-5 text-3xl font-semibold dark:text-white text-black">
        Cập nhật vai trò người dùng #{id}
      </h1>
      <div className="md:ml-16 sm:mx-auto mx-2 mt-5">
        <Form
          form={form}
          name="updateUserRoleForm"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item label="Tên">
            <Input disabled value={user.data?.name} />
          </Form.Item>
          <Form.Item label="Email">
            <Input disabled value={user.data?.email} />
          </Form.Item>
          <Form.Item
            label="Vai trò"
            name="role_id"
            rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}
          >
            {user.data?.role_id && (
              <Select defaultValue={user.data?.role_id}>
                {roles.data?.map((item: TRole) => (
                  <Select.Option key={item.id} value={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            )}
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

export default EditUser;
