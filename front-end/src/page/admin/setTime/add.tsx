import type { FormInstance } from "antd";
import { Button, Form, Input, Space, TimePicker, message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { TSetTimeAdd } from "../../../schema/setTime";
import { useCreateSetTimeMutation } from "../../../services/setTime";
import dayjs from "dayjs";

const SubmitButton = ({ form }: { form: FormInstance }) => {
  const [submittable, setSubmittable] = React.useState(false);

  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [form, values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      Submit
    </Button>
  );
};

const AddSetTime: React.FC = () => {
  const [form] = Form.useForm();

  const [createSetTime, { reset }] = useCreateSetTimeMutation();

  const navigate = useNavigate();
  const confirm = () => {
    message.success("Cập nhật thành công.");
  };

  const cancel = () => {
    message.error("Cập nhật không công.");
  };

  const handleFormSubmit = async (values: { name: string; time: any }) => {
    // console.log(dayjs(values.time).format("DD-MM-YYYY (HH:mm)"));
    try {
      const updatedSetTime: TSetTimeAdd = {
        name: values.name,
        start_time: dayjs(values.time[0]).format('HH:mm:00.000[Z]'),
        end_time: dayjs(values.time[1]).format('HH:mm:00.000[Z]'),
      };
      await createSetTime(updatedSetTime).unwrap();
      confirm();
      reset();
      navigate("/admin/setTime");
    } catch (error) {
      cancel();
      console.error("Error updating user role:", error);
      reset();
    }
  };

  return (
    <>
      <h1 className="md:ml-16 md:text-left text-center mt-5 text-3xl font-semibold dark:text-white text-black">
        Thêm thời gian
      </h1>
      <div className="md:ml-16 sm:mx-auto mx-2 mt-5">
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          onFinish={handleFormSubmit}
        >
          <Form.Item
            name="name"
            label="Tên"
            rules={[
              { required: true, message: "Vui lòng nhập tên thời gian !" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="time"
            label="Thời gian"
            rules={[{ required: true, message: "Vui lòng nhập thời gian !" }]}
          >
            <TimePicker.RangePicker
              format={"HH:mm"}
            />
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

export default AddSetTime;
