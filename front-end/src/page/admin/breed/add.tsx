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
import { TBreedAdd } from "../../../schema/breed";
import { Tspecies } from "../../../schema/species";
import { useCreateBreedMutation } from "../../../services/breed";
import { useGetAllspeciesQuery } from "../../../services/species";

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

const AddBreed: React.FC = () => {
  const [form] = Form.useForm();
  const species = useGetAllspeciesQuery();
  const [createBreed, { reset }] = useCreateBreedMutation();
  const navigate = useNavigate();

  const confirm = () => {
    message.success("Thêm thành công.");
  };

  const cancel = () => {
    message.error("Thêm Thất Bại,");
  };

  const handleFormSubmit = async (values: {
    name: string;
    species_id: string;
  }) => {
    try {
      const updatedBreed: TBreedAdd = {
        name: values.name,
        species_id: values.species_id,
      };
      await createBreed(updatedBreed).unwrap();
      confirm();
      reset();
      navigate("/admin/breed");
    } catch (error) {
      cancel();
      console.error("Error updating:", error);
      reset();
    }
  };

  return (
    <>
      <h1 className="md:ml-16 md:text-left text-center mt-5 text-3xl font-semibold dark:text-white text-black">
        Thêm giống
      </h1>
      <div className="md:ml-16 sm:mx-auto mx-2 mt-5">
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          onFinish={handleFormSubmit}
        >
          <Form.Item name="species_id" label="Species">
            <Select>
              {species.data?.map((item: Tspecies) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="name"
            label="Tên"
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
          >
            <Input />
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

export default AddBreed;
