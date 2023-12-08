/* eslint-disable react-hooks/exhaustive-deps */
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload, UploadFile, message } from "antd";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { TWebsiteInformation } from "../../../schema/websiteInformation";
import {
  useGetWebsiteInformationByIdQuery,
  useUpdateWebsiteInformationMutation,
} from "../../../services/websiteInformation";
const EditWebsiteInformationAdmin = () => {
  const { id } = useParams<{ id: string }>();
  const websiteInformationById = useGetWebsiteInformationByIdQuery(Number(id));
  const [logo, setLogo] = useState<string | undefined>();

  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "logo.png",
      status: "done",
      url: logo,
    },
  ]);

  const [updateWebsiteInformation, { reset, isLoading: isAddLoading }] =
    useUpdateWebsiteInformationMutation();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    setFileList([
      {
        uid: "-1",
        name: "logo.png",
        status: "done",
        url: websiteInformationById.data?.logo,
      },
    ]);

    setLogo(websiteInformationById.data?.logo);

    form.setFieldsValue({
      id: websiteInformationById.data?.id,
      logo: websiteInformationById.data?.logo,
      email: websiteInformationById.data?.email,
      phone: websiteInformationById.data?.phone,
      logo_res: websiteInformationById.data?.logo_res,
      fb: websiteInformationById.data?.fb,
      zalo: websiteInformationById.data?.zalo,
    });
  }, [
    form,
    websiteInformationById.data?.id,
    websiteInformationById.data?.logo,
    websiteInformationById.data?.email,
    websiteInformationById.data?.phone,
    websiteInformationById.data?.logo_res,
    websiteInformationById.data?.fb,
    websiteInformationById.data?.zalo,
  ]);

  const handleImageChange = ({ fileList: newFileList }: any) => {
    if (newFileList[0].response) {
      setLogo(newFileList[0].response.secure_url);
    }
    setFileList(newFileList);
  };

  const onFinish = async (values: TWebsiteInformation) => {
    const { id, email, phone, fb, zalo } = values;
    const websiteInformationData = {
      id,
      logo: logo,
      email,
      phone,
      fb,
      zalo,
    };
    try {
      await updateWebsiteInformation(websiteInformationData).unwrap();
      message.success(" Update successfully");
      reset();
      navigate("/admin/websiteinformation");
    } catch (error) {
      message.error("Failed to update website information");
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
        Cập nhật website information
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
            rules={[{ required: true, message: "Vui lòng nhập!" }]}
          >
            <Input
              disabled
              className="dark:hover:border-[#00c6ab] transition-colors duration-300 inputForm"
            />
          </Form.Item>

          <Form.Item
            label={<span className="">Logo Pet Care</span>}
            name="logo"
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
              fileList={fileList}
              showUploadList={true}
              className="ant-upload-wrapper ant-upload-select"
              onChange={handleImageChange}
            >
              {uploadButton}
            </Upload>
          </Form.Item>

          <Form.Item
            label={<span className="">Email</span>}
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập tiêu đề email!" },
            ]}
          >
            <Input className="dark:hover:border-[#00c6ab] transition-colors duration-300 inputForm" />
          </Form.Item>

          <Form.Item
            label={<span className="">Phone</span>}
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input className="dark:hover:border-[#00c6ab] transition-colors duration-300 inputForm" />
          </Form.Item>

          <Form.Item
            label={<span className="">Link Facebook</span>}
            name="fb"
            rules={[
              { required: true, message: "Vui lòng nhập link facebook!" },
            ]}
          >
            <Input className="dark:hover:border-[#00c6ab] transition-colors duration-300 inputForm" />
          </Form.Item>

          <Form.Item
            label={<span className="">Link Zalo</span>}
            name="zalo"
            rules={[{ required: true, message: "Vui lòng nhập link zalo!" }]}
          >
            <Input className="dark:hover:border-[#00c6ab] transition-colors duration-300 inputForm" />
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
                "Sửa WebsiteInformation"
              )}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default EditWebsiteInformationAdmin;
