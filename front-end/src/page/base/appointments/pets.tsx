import React from "react";
import type { FormInstance } from "antd";
import { Button, Form, Input, Select, Space, message } from "antd";
import {
  useCreatePetsMutation,
  useGetAllPetsQuery,
} from "../../../services/pets";
import { useNavigate } from "react-router-dom";
import { useGetAllspeciesQuery } from "../../../services/species";
import { Tspecies } from "../../../schema/species";
import { useBreedQuery } from "../../../services/breed";
import { TBreed } from "../../../schema/breed";

const SubmitButton = ({ form }: { form: FormInstance }) => {
  const [submittable, setSubmittable] = React.useState(false);

  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [form, values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      Submit
    </Button>
  );
};

const AddPetsClient: React.FC = () => {
  const [form] = Form.useForm();

  const [createSPets] = useCreatePetsMutation();

  const navigate = useNavigate();

  const species = useGetAllspeciesQuery();

  const breed = useBreedQuery();

  const { refetch } = useGetAllPetsQuery();

  const user = JSON.parse(localStorage.getItem("user") as string);

  const handleFormSubmit = async (values: any) => {
    try {
      await createSPets(values);
      message.success("Thêm loại thành công");

      refetch();

      navigate("/appointment");
    } catch (error: any) {
      message.error("Thêm loại thất bại : " + error.message);
    }
  };

  return (
    <Form
      form={form}
      name="validateOnly"
      layout="vertical"
      autoComplete="off"
      onFinish={handleFormSubmit}
    >
      <Form.Item name="img" label="Ảnh" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="name" label="Tên Loại" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="age" label="Tuổi" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="gender" label="Giới tính" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        style={{ display: "none" }}
        name="user_id"
        label="Tài Khoản Login"
        rules={[{ required: true }]}
        initialValue={user.user.id}
      >
        <Input disabled={true} />
      </Form.Item>

      <Form.Item name="species_id" label="Species">
        <Select>
          {species.data?.map((item: Tspecies) => (
            <Select.Option key={item.id} value={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="breed_id" label="Breed">
        <Select>
          {breed.data?.map((item: TBreed) => (
            <Select.Option key={item.id} value={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        style={{ marginTop: 60 }}
        label={
          <span className="text-base dark:text-white">Tên người đăng</span>
        }
      >
        <span className="dark:text-white">{user.user.name}</span>
      </Form.Item>

      <Form.Item>
        <Space>
          <SubmitButton form={form} />
          <Button htmlType="reset">Reset</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default AddPetsClient;
