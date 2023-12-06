import {
  Button,
  Form,
  FormInstance,
  Input,
  Select,
  Space,
  message,
} from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { TMenuAdd } from "../../../schema/menu";
import { TMenuType } from "../../../schema/menuType";
import { useAddMenuMutation } from "../../../services/menu";
import { useMenuTypeQuery } from "../../../services/menuType";

const SubmitButton = ({ form }: { form: FormInstance }) => {
  const [submit, setSubmit] = React.useState(false);

  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmit(true);
      },
      () => {
        setSubmit(false);
      }
    );
  }, [form, values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submit}>
      Submit
    </Button>
  );
};

const AddMenuAdmin: React.FC = () => {
  const [form] = Form.useForm();
  const menuType = useMenuTypeQuery();
  const [createMenu, { reset }] = useAddMenuMutation();
  const navigate = useNavigate();

  const confirm = () => {
    message.success("Thêm thành công.");
  };

  const cancel = () => {
    message.error("Thêm Thất Bại,");
  };

  const handleFormSubmit = async (values: {
    name: string;
    link: string;
    menuType_id: string;
  }) => {
    try {
      const updatedMenu: TMenuAdd = {
        name: values.name,
        link: values.link,
        menuType_id: values.menuType_id,
      };
      await createMenu(updatedMenu).unwrap();
      confirm();
      reset();
      navigate("/admin/menu");
    } catch (error) {
      cancel();
      console.error("Error updating:", error);
      reset();
    }
  };

  return (
    <>
      <h1 className="md:ml-16 md:text-left text-center mt-5 text-3xl font-semibold dark:text-white text-black">
        Thêm Menu
      </h1>
      <div className="md:ml-16 sm:mx-auto mx-2 mt-5">
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          onFinish={handleFormSubmit}
        >
          <Form.Item
            name="name"
            label="Tên Menu"
            rules={[{ required: true, message: "Vui lòng nhập tên Menu!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="link"
            label="Liên kết"
            rules={[
              { required: true, message: "Vui lòng nhập đường liên kết!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="menuType_id" label="Kiểu Menu">
            <Select>
              {menuType.data?.map((item: TMenuType) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <SubmitButton form={form} />
              <Button htmlType="reset">Reset</Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default AddMenuAdmin;
