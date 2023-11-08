import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  UploadFile,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { TProduct } from "../../../schema/products";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../../services/products";
import { useGetAllcategoryQuery } from "../../../services/category";
import { Tcategory } from "../../../schema/category";
const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const category = useGetAllcategoryQuery();
  const productById = useGetProductByIdQuery(Number(id));
  const [image, setImage] = useState<string | undefined>();
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "img.png",
      status: "done",
      url: image,
    },
  ]);
  const [value, setValue] = useState("");

  const [updateProduct, { reset, isLoading: isAddLoading }] =
    useUpdateProductMutation();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    setFileList([
      {
        uid: "-1",
        name: "img.png",
        status: "done",
        url: productById.data?.img,
      },
    ]);
    setImage(productById.data?.img);
    form.setFieldsValue({
      id: productById.data?.id,
      name: productById.data?.name,
      price: productById.data?.price,
      img: productById.data?.img,
      description: productById.data?.description,
      category_id: productById.data?.category_id,
    });
  }, [
    form,
    productById.data?.id,
    productById.data?.name,
    productById.data?.price,
    productById.data?.img,
    productById.data?.description,
    productById.data?.category_id,
  ]);

  const handleImageChange = (info: any) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      setImage(info.file.response.url);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const onFinish = async (values: TProduct) => {
    const { id, name, price, description, category_id } = values;
    const productData = {
      id,
      name,
      price,
      img: image,
      description,
      category_id,
    };
    try {
      await updateProduct(productData).unwrap();
      message.success(" Update successfully");
      reset();
      navigate("/admin/products");
      console.log(productData);
    } catch (error) {
      message.error("Failed to update product");
    }
  };

  const onFinishFailed = async (values: any) => {
    console.log("Failed:", values);
  };

  const uploadButton = (
    <div>
      {isAddLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <h1 className="mt-5 text-3xl font-semibold text-center text-black md:ml-16 md:text-left dark:text-white">
        Cập nhật sản phẩm
      </h1>
      <div className="bg-white dark:bg-[#38383B] p-10 md:w-[90%] md:ml-16 sm:mx-auto mx-2 mt-5 shadow-lg rounded ">
        <Form
          form={form}
          className="w-4/5 dark:text-white"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            label={<span className="">Id</span>}
            name="id"
            rules={[{ required: true, message: "Vui lòng nhập tên dịch vụ!" }]}
          >
            <Input
              disabled
              className="dark:hover:border-[#00c6ab] transition-colors duration-300 inputForm"
            />
          </Form.Item>
          <Form.Item
            label={<span className="">Tên dịch vụ</span>}
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên dịch vụ!" }]}
          >
            <Input className="dark:hover:border-[#00c6ab] transition-colors duration-300 inputForm" />
          </Form.Item>
          <Form.Item label={<span className="">Ảnh sản phẩm</span>} name="img">
            <Upload
              name="file"
              action="https://api.cloudinary.com/v1_1/dksgvucji/image/upload"
              data={{
                upload_preset: "wh3rdke8",
                cloud_name: "dksgvucji",
              }}
              listType="picture-card"
              maxCount={1}
              fileList={fileList}
              showUploadList={true}
              className="ant-upload-wrapper ant-upload-select"
              onChange={handleImageChange}
            >
              {uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item
            label={
              <span className="text-base dark:text-white">Giá dịch vụ </span>
            }
            name="price"
            rules={[{ required: true, message: "Vui lòng nhập giá dịch vụ!" }]}
          >
            <InputNumber
              min={1}
              className="dark:hover:border-[#00c6ab] w-full transition-colors duration-300"
            />
          </Form.Item>
          <Form.Item
            label={<span className="text-base dark:text-white">Mô tả</span>}
            name="description"
            rules={[
              { required: true, message: "Vui lòng nhập giá mô tả dịch vụ!" },
            ]}
          >
            <ReactQuill
              style={{ height: 500 }}
              theme="snow"
              value={value}
              onChange={setValue}
            />
          </Form.Item>
          <Form.Item label="Category" name="category_id">
            {productById.data && productById.data?.category_id && (
              <Select defaultValue={productById.data?.category_id}>
                {category.data?.map((item: Tcategory) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            <Button
              style={{ marginTop: 30 }}
              htmlType="submit"
              className="text-black transition-colors duration-300 dark:text-white"
              size="large"
            >
              {isAddLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                "Sửa Sản Phẩm"
              )}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default EditProduct;
