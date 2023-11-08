import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import {
  useUpdateCategoryMutation,
  useCategoryByIdQuery,
} from "../../../services/category";
import { Tcategory } from "../../../schema/category";
import { useEffect } from "react";

const confirm = () => {
  message.success("Cập nhật danh mục thành công.");
};

const cancel = () => {
  message.error("Cập nhật danh mục không thành công.");
};

const EditCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const category = useCategoryByIdQuery(Number(id));
  const [form] = Form.useForm();

  const [updatePetHouseMutation, { reset }] = useUpdateCategoryMutation();

  useEffect(() => {
    if (category.data) {
      form.setFieldsValue({
        name: category.data.name,
      });
    }
  }, [category.data, form]);

  const onFinish = async (values: { name: string }) => {
    try {
      const updatedPetHouse: Tcategory = {
        id: Number(id),
        name: values.name,
      };
      await updatePetHouseMutation(updatedPetHouse).unwrap();
      confirm();

      reset();

      navigate("/admin/category");
    } catch (error) {
      console.log(error);
      cancel();
      console.error("Lỗi khi update danh mục:", error);
      reset();
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <h1 className="md:ml-16 md:text-left text-center mt-5 text-3xl font-semibold dark:text-white text-black">
        Cập nhật danh mục _ {id}
      </h1>
      <div className="md:ml-16 sm:mx-auto mx-2 mt-5">
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập danh mục" }]}
            initialValue={category.data ? category.data.name : ""}
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

export default EditCategory;