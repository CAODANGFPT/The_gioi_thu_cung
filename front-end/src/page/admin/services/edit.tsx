import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Upload,
  UploadFile,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import "../../../assets/scss/page/servicesAdmin.scss";
import { TServicesRequest } from "../../../schema/services";
import {
  useServicesByIdQuery,
  useUpdateServicesMutation,
} from "../../../services/services";
const EditService = () => {
  const [image, setImage] = useState<string | undefined>();
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: image,
    },
  ]);
  const [value, setValue] = useState("");
  const { id } = useParams<{ id: string }>();
  const servicesById = useServicesByIdQuery(Number(id));
  const [updateServices, { reset, isLoading: isAddLoading }] =
    useUpdateServicesMutation();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    setFileList([
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: servicesById.data?.image,
      },
    ]);
    setImage(servicesById.data?.image);
    form.setFieldsValue({
      id: servicesById.data?.id,
      name: servicesById.data?.name,
      price: servicesById.data?.price,
      image: servicesById.data?.image,
      description: servicesById.data?.description,
    });
  }, [
    form,
    servicesById.data?.id,
    servicesById.data?.name,
    servicesById.data?.price,
    servicesById.data?.image,
    servicesById.data?.description,
  ]);

  const handleImageChange = ({ fileList: newFileList }: any) => {
    if (newFileList[0].response) {
      setImage(newFileList[0].response.secure_url);
    }
    setFileList(newFileList);
  };

  const onFinish = async (values: TServicesRequest) => {
    const { id, name, price, description } = values;
    const servicesData = {
      id,
      name,
      price,
      image: image,
      description,
    };
    try {
      await updateServices(servicesData).unwrap();
      message.success(" Update services successfully");
      reset();
      navigate("/admin/services");
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
          <Form.Item
            label={<span className="">Ảnh dịch vụ</span>}
            name="img"
            rules={[{ required: true, message: "Vui lòng chọn ảnh" }]}
          >
            <Upload
              name="file"
              action="https://api.cloudinary.com/v1_1/dksgvucji/image/upload"
              data={{
                upload_preset: "wh3rdke8",
                cloud_name: "dksgvucji",
              }}
              listType="picture-card"
              maxCount={1}
              showUploadList={true}
              className="ant-upload-wrapper ant-upload-select"
              onChange={handleImageChange}
              fileList={fileList}
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
                "Thêm dịch vụ"
              )}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default EditService;
