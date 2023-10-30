import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TNews } from "../../../schema/news";
import { useAddNewsMutation } from "../../../services/news";
import dayjs from "dayjs";

const Addnews = () => {
  const [value, setValue] = useState("");
  const [form] = Form.useForm();
  const [addNews, { reset, isLoading: isAddLoading }] = useAddNewsMutation();

  const navigate = useNavigate();
  const confirm = () => {
    message.success("Tạo bài đăng thành công.");
  };

  const cancel = () => {
    message.error("Tạo bài đăng không công.");
  };

  const user = JSON.parse(localStorage.getItem("user") as string);

  const handleFormSubmit = async (values: {
    title: string;
    img: string;
    description: string;
  }) => {
    try {
      const dateNews: TNews = {
        title: values.title,
        img: values.img,
        description: values.description,
        created_at: dayjs().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
        user_id: user.user.id,
      };
      await addNews(dateNews).unwrap();
      confirm();
      reset();
      navigate("/admin/news");
    } catch (error) {
      cancel();
      console.error("Error updating user role:", error);
      reset();
    }
  };

  const onFinishFailed = async (values: any) => {
    console.log("Failed:", values);
  };

  return (
    <>
      <h1 className="mt-5 text-3xl font-semibold text-center text-black md:ml-16 md:text-left dark:text-white">
        Thêm bài đăng
      </h1>
      <div className="bg-white dark:bg-[#38383B] p-10 md:w-[90%] md:ml-16 sm:mx-auto mx-2 mt-5 shadow-lg rounded ">
        <Form
          form={form}
          className="w-4/5 dark:text-white"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={handleFormSubmit}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            label={
              <span className="text-base dark:text-white">Tên bài đăng</span>
            }
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập tên bài đăng!" }]}
          >
            <Input className="dark:hover:border-[#00c6ab] transition-colors duration-300" />
          </Form.Item>
          <Form.Item
            label={<span className="text-base dark:text-white">Image</span>}
            name="img"
            rules={[{ required: true, message: "Vui lòng nhập image!" }]}
          >
            <Input className="dark:hover:border-[#00c6ab] transition-colors duration-300" />
          </Form.Item>
          <Form.Item
            label={<span className="text-base dark:text-white">Mô tả</span>}
            name="description"
            rules={[{ required: true, message: "Vui lòng nhập giá mô tả!" }]}
          >
            <ReactQuill
              style={{ height: 500 }}
              theme="snow"
              value={value}
              onChange={setValue}
            />
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
            <Button
              htmlType="submit"
              className="text-black transition-colors duration-300 dark:text-white"
              size="large"
            >
              {isAddLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                "Thêm Bài đăng  "
              )}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Addnews;
