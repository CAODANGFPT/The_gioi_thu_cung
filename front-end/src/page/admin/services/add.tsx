import { Button, Form, Input, InputNumber, message } from "antd";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAddServicesMutation } from "../../../services/services";
import { TServicesRequest } from "../../../schema/services";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const AddService = () => {
  // const [image, setImage] = useState<string | null>(null);
  const [value, setValue] = useState("");
  const [addServices, { reset, isLoading: isAddLoading }] =
    useAddServicesMutation();
  const navigate = useNavigate();

  const onFinish = async (values: TServicesRequest) => {
    const { name, price, image, description } = values;
    const servicesData = {
      name,
      price,
      image,
      description,
    };
    try {
      await addServices(servicesData).unwrap();
      message.success("Product added successfully");
      reset();
      navigate("/admin/services");
      console.log(servicesData);
      
    } catch (error) {
      message.error("Failed to add product");
    }
  };
  const onFinishFailed = async (values: any) => {
    console.log("Failed:", values);
  };
  // const handleImageChange = (info: any) => {
  //   if (info.file.status === "done") {
  //     message.success(`${info.file.name} file uploaded successfully`);
  //     setImage(info.file.response.url);
  //   } else if (info.file.status === "error") {
  //     message.error(`${info.file.name} file upload failed.`);
  //   }
  // };
  // if (isAddLoading) return <Skeleton />;
  return (
    <>
      <h1 className="mt-5 text-3xl font-semibold text-center text-black md:ml-16 md:text-left dark:text-white">
        Thêm sản phẩm
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
            label={
              <span className="text-base dark:text-white">Tên dịch vụ</span>
            }
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên dịch vụ!" }]}
          >
            <Input className="dark:hover:border-[#00c6ab] transition-colors duration-300" />
          </Form.Item>
          <Form.Item
            label={<span className="text-base dark:text-white">Image</span>}
            name="image"
            rules={[{ required: true, message: "Vui lòng nhập image!" }]}
          >
            <Input className="dark:hover:border-[#00c6ab] transition-colors duration-300" />
          </Form.Item>
          {/* <Form.Item
            label={
              <span className="text-base dark:text-white">Ảnh sản phẩm</span>
            }
            name="picture-card"
            rules={[{ required: true, message: "Vui lòng chọn ảnh" }]}
          >
            <Upload
              name="file"
              action="https://api.cloudinary.com/v1_1/dqqfnp0hk/image/upload"
              data={{
                upload_preset: "asm-web209",
                cloud_name: "dqqfnp0hk",
              }}
              showUploadList={false}
              className="ant-upload-wrapper ant-upload-select"
              onChange={handleImageChange}
            >
              <label
                htmlFor="images"
                className="drop-container w-full"
                id="dropcontainer"
              >
                <div
                  className={
                    !image
                      ? "flex justify-center flex-col items-center"
                      : "hidden"
                  }
                >
                  <span className="drop-title">Thả tập tin ở đây</span>
                  <p>hoặc</p>
                  <Button>Tải lên</Button>
                </div>
                {image && (
                  <label
                    htmlFor="images"
                    className="flex items-center justify-center w-full h-full cursor-pointer"
                  >
                    <img className="w-auto h-full" src={image} alt="Selected" />
                  </label>
                )}
              </label>
            </Upload>
          </Form.Item> */}
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
          <Form.Item  label={
              <span className="text-base dark:text-white">Mô tả</span>
            } name="description"
            rules={[{ required: true, message: "Vui lòng nhập giá mô tả dịch vụ!" }]}>
            <ReactQuill style={{height:500}} theme="snow" value={value} onChange={setValue} />
          </Form.Item>
          <Form.Item >
            <Button
              style={{marginTop: 30}}
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

export default AddService;
