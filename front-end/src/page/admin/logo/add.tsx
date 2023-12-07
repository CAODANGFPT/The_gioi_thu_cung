import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload, message } from "antd";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { TLogo } from "../../../schema/logo";
import { useCreateLogoMutation } from "../../../services/logo";

const AddLogoAdmin = () => {
  const [logo, setImage] = useState<any | null>(null);

  const [addLogo, { reset, isLoading: isAddLoading }] = useCreateLogoMutation();

  const navigate = useNavigate();

  const handleImageChange = (info: any) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      setImage(info.file.response.url);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const onFinish = async (values: TLogo) => {
    if (!logo) {
      message.error("Please upload a logo");
      return;
    }

    const logoData = {
      id: undefined, // If id is required, provide a value, otherwise, set it to undefined
      img: logo,
      // Add any other properties that may be required by the addLogo function
    };
    try {
      await addLogo(logoData).unwrap();
      message.success("Logo added successfully");
      reset();
      navigate("/admin/logo");
    } catch (error) {
      message.error("Failed to add Logo");
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
        THÊM LOGO
      </h1>
      <div className="bg-white dark:bg-[#38383B] p-10 md:w-[90%] md:ml-16 sm:mx-auto mx-2 mt-5 shadow-lg rounded ">
        <Form
          className="w-4/5 dark:text-white"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            label={<span className="">Ảnh logo</span>}
            name="picture-card"
            rules={[{ required: true, message: "Vui lòng chọn logo" }]}
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
              showUploadList={false}
              className="ant-upload-wrapper ant-upload-select"
              onChange={handleImageChange}
            >
              {logo ? (
                <img src={logo} alt="avatar" style={{ width: "100%" }} />
              ) : (
                uploadButton
              )}
            </Upload>
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
                "Thêm logo"
              )}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default AddLogoAdmin;
