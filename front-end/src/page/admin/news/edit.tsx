import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { TNews } from "../../../schema/news";
import {
  useUpdateNewsMutation,
  useNewsByIdQuery,
} from "../../../services/news";
import dayjs from "dayjs";
import { useEffect } from "react";

const confirm = () => {
  message.success("Cập nhật tin tức thành công.");
};

const cancel = () => {
  message.error("Cập nhật tin tức không thành công.");
};

const EditNews = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const news = useNewsByIdQuery(Number(id));
  const [form] = Form.useForm();
  const [updateNewsMutation, { reset }] = useUpdateNewsMutation();

  const [value, setValue] = useState("");

  useEffect(() => {
    if (news.data) {
      form.setFieldsValue({
        img: news.data.img,
        title: news.data.title,
        description: news.data.description,
      });
    }
  }, [news.data, form]);

  const user = JSON.parse(localStorage.getItem("user") as string);

  const handleFormSubmit = async (values: {
    title: string;
    img: string;
    description: string;
  }) => {
    try {
      const dateNews: TNews = {
        id: Number(id),
        title: values.title,
        img: values.img,
        description: values.description,
        created_at: dayjs().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
        user_id: user.user.id,
      };
      await updateNewsMutation(dateNews).unwrap();

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
        Cập nhật tin tức _ {id}
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
            initialValue={news.data ? news.data.title : ""}
          >
            <Input className="dark:hover:border-[#00c6ab] transition-colors duration-300" />
          </Form.Item>
          <Form.Item
            label={<span className="text-base dark:text-white">Image</span>}
            name="img"
            rules={[{ required: true, message: "Vui lòng nhập image!" }]}
            initialValue={news.data ? news.data.img : ""}
          >
            <Input className="dark:hover:border-[#00c6ab] transition-colors duration-300" />
          </Form.Item>
          <Form.Item
            label={<span className="text-base dark:text-white">Mô tả</span>}
            name="description"
            rules={[{ required: true, message: "Vui lòng nhập giá mô tả!" }]}
            initialValue={news.data ? news.data.description : ""}
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
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default EditNews;
