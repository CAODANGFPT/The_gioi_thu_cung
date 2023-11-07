import React, { useState, useEffect } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Modal,
  Input,
  UploadFile,
  Form,
  message,
  Button,
  Upload,
  Radio,
} from "antd";
import { TAccountEdit } from "../../schema/accountSchema";
import { useUpdateUserMutation } from "../../services/user";

interface EditProfileProps {
  user: TAccountEdit;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditProfile: React.FC<EditProfileProps> = ({
  isModalOpen,
  setIsModalOpen,
  user,
}) => {
  const [updateProfile, { isLoading: isAddLoading }] = useUpdateUserMutation();
  const [form] = Form.useForm();
  const [img, setImage] = useState<string | undefined>();

  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "img.png",
      status: "done",
      url: img,
    },
  ]);

  useEffect(() => {
    setFileList([
      {
        uid: "-1",
        name: "img.png",
        status: "done",
        url: user.img,
      },
    ]);
    setImage(user.img);
    form.setFieldsValue({
      id: user.id,
      img: user.img,
      name: user.name,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
    });
  }, [form, user.id, user.img, user.name, user.email, user.phone, user.gender]);
  const handleImageChange = (info: any) => {
    console.log("File status:", info.file.status);
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      console.log("ảnh info", info.file.response.url);
      setImage(info.file.response.url);
      setFileList([
        {
          uid: "-1",
          name: "img.png",
          status: "done",
          url: info.file.response.url,
        },
      ]);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  const uploadButton = (
    <div>
      {isAddLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const onFinish = async (values: TAccountEdit) => {
    try {
      const dataUpdate = {
        id: user.id,
        img: img,
        email: values.email,
        name: values.name,
        phone: values.phone,
        gender: values.gender,
      };
      await updateProfile(dataUpdate).unwrap();
      message.success("thay đổi dữ liệu thành công");
    } catch (error: any) {
      console.log(error);
      message.error("cập nhập thất bại ");
    }
  };
  const onFinishFailed = async (values: any) => {
    console.log("Failed:", values);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Modal
        className=""
        title="sửa thông tin người dùng"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
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
            label={<span className="">Email</span>}
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          >
            <Input className="dark:hover:border-[#00c6ab] transition-colors duration-300 inputForm" />
          </Form.Item>
          <Form.Item
            label={<span className="">số điện thoại </span>}
            name="phone"
            rules={[{ required: true, message: "Vui lòng số điện thoại!" }]}
          >
            <Input className="dark:hover:border-[#00c6ab] transition-colors duration-300 inputForm" />
          </Form.Item>
          <Form.Item
            label={<span className="">Tên người dùng</span>}
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
          >
            <Input className="dark:hover:border-[#00c6ab] transition-colors duration-300 inputForm" />
          </Form.Item>
          <Form.Item
            label={<span className="">Ảnh đại diện</span>}
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
              fileList={fileList}
              showUploadList={true}
              className="ant-upload-wrapper ant-upload-select"
              onChange={handleImageChange}
            >
              {uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item
            label={<span className="">giới tính</span>}
            name="gender"
            rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
          >
            <Radio.Group>
              <Radio value={1}>Nam</Radio>
              <Radio value={2}>Nữ</Radio>
              <Radio value={3}>giới tính khác</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
            <Button type="primary" htmlType="submit">
              Cập nhật thông tin
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditProfile;
