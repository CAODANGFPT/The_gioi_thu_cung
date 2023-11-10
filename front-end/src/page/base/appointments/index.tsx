import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Upload,
  UploadFile,
  message,
} from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/scss/page/appointment.scss";
import { TBreed } from "../../../schema/breed";
import { TpetHouse } from "../../../schema/pethouse";
import { TPets, TUserPets } from "../../../schema/pets";
import { TServices } from "../../../schema/services";
import { TSetTime } from "../../../schema/setTime";
import { Tspecies } from "../../../schema/species";
import { TStaff } from "../../../schema/staff";
import { useAddAppointmentMutation } from "../../../services/appointments";
import { useBreedQuery } from "../../../services/breed";
import { useGetAllpetHouseQuery } from "../../../services/pethouse";
import {
  useCreatePetsMutation,
  useGetAllUserPetsQuery,
} from "../../../services/pets";
import { useServicesQuery } from "../../../services/services";
import { useSetTimeQuery } from "../../../services/setTime";
import { useGetAllspeciesQuery } from "../../../services/species";
import { useStaffQuery } from "../../../services/staff";
import { useGetUserQuery } from "../../../services/user";

type TFinish = {
  petHouse_id: number;
  pet_id: number;
  staff_id: number;
  services_id: number;
  time_id: number;
  age: number;
  breed_id: number;
  gender: string;
  name: string;
  species_id: number;
};

const Appointment: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [image, setImage] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [pets, setPets] = useState<TUserPets[] | undefined>([]);
  const [pet, setPet] = useState<TPets | undefined>({});
  const [openAddPest, setOpenAddPest] = useState<boolean>(true);
  const [openBreed, setOpenBreed] = useState<boolean>(false);
  const [idSpecies, setIdSpecies] = useState<number>(0);
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "",
    },
  ]);

  const { data: user } = useGetUserQuery();
  const { data: pethouse } = useGetAllpetHouseQuery();
  const { data: services } = useServicesQuery();
  const { data: settime } = useSetTimeQuery();
  const { data: species } = useGetAllspeciesQuery();
  const { data: listPet } = useGetAllUserPetsQuery();
  const { data: listStaff } = useStaffQuery();
  const { data: breed } = useBreedQuery(idSpecies);
  const [createAppointment] = useAddAppointmentMutation();
  const [createSPets] = useCreatePetsMutation();

  useEffect(() => {
    if (listPet) {
      setPets([
        { id: 0, name: "Thêm mới" },
        ...listPet.map((pet) => ({
          id: pet?.id,
          name: pet?.name,
        })),
      ]);
    }
  }, [listPet]);

  const handleImageChange = (info: any) => {
    if (info.file.status === "uploading") {
      setLoading(true);
    } else if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      setImage(info.file.response.url);
      setLoading(false);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
      setLoading(false);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Tải ảnh</div>
    </div>
  );

  const onFinish = async (values: TFinish) => {
    const petNew = {
      img: image,
      name: values.name,
      age: values.age,
      gender: values.gender,
      user_id: user?.id,
      species_id: values.species_id,
      breed_id: values.breed_id,
    };
    if (openAddPest) {
      const res = await createSPets(petNew);
      if ("data" in res) {
        const resAppointment = await createAppointment({
          day: dayjs().format("YYYY-MM-DD HH:mm:00"),
          pet_id: res.data.id,
          services_id: values.services_id,
          user_id: user?.id,
          pethouse_id: values.petHouse_id,
          time_id: values.time_id,
          status_id: 1,
        });
        if ("data" in resAppointment) {
          message.success(resAppointment.data.message);
          navigate("/");
        }
      }
    } else {
      const resAppointment = await createAppointment({
        day: dayjs().format("YYYY-MM-DD HH:mm:00"),
        pet_id: values.pet_id,
        services_id: values.services_id,
        user_id: user?.id,
        pethouse_id: values.petHouse_id,
        time_id: values.time_id,
      });
      if ("data" in resAppointment) {
        message.success(resAppointment.data.message);
        navigate("/");
      }
    }
  };

  const onFinishFailed = async (values: any) => {
    console.log("Failed:", values);
  };

  const onChange = async (value: number) => {
    if (value === 0) {
      setOpenAddPest(true);
    } else {
      await setPet(listPet?.find((p) => p.id === value));
      setOpenAddPest(false);
    }
    console.log(value);
  };

  const onChangeSpecies = (value: number) => {
    setOpenBreed(true);
    setIdSpecies(value);
    form.resetFields(["breed_id"]);
  };

  useEffect(() => {
    setFileList([
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: pet?.img,
      },
    ]);
  }, [pet?.img]);

  const range = (start: number, end: number) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    if (!current) {
      return false;
    }
    const today = dayjs().startOf("day");
    const afterFiveDays = today.add(5, "day").endOf("day");
    return current.isBefore(today) || current.isAfter(afterFiveDays);
  };

  const disabledDateTime = () => ({
    disabledHours: () => {
      return Array.from({ length: 24 }, (_, i) => i).filter(
        (hour) => hour < 9 || hour > 18
      );
    },
  });

  return (
    <div className="appointment">
      <h1 style={{ marginBottom: 20 }}>Đặt lịch chăm sóc thú cưng</h1>
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="fromAppointment">
          <div style={{ flex: 1 }}>
            <Form.Item name="pet_id" label="Thú cưng">
              <Select defaultValue={0} onChange={onChange}>
                {pets &&
                  pets?.map((item: TUserPets) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="staff_id"
              label="Nhân viên"
              rules={[{ required: true }]}
            >
              <Select>
                {listStaff?.map((item: TStaff) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="services_id"
              label="Dịch vụ"
              rules={[{ required: true }]}
            >
              <Select>
                {services?.map((item: TServices) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="petHouse_id"
              label="Loại phòng"
              rules={[{ required: true }]}
            >
              <Select>
                {pethouse?.map((item: TpetHouse) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="time_id"
              label="Thời gian"
              rules={[{ required: true }]}
            >
              <Select>
                {settime?.map((item: TSetTime) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name} (
                    {dayjs(item.start_time, "HH:mm:ss").format("HH:mm")} -{" "}
                    {dayjs(item.end_time, "HH:mm:ss").format("HH:mm")})
                  </Select.Option>
                ))}
              </Select>
              {/* <DatePicker
                format="YYYY-MM-DD HH:mm:ss"
                disabledDate={disabledDate}
                disabledTime={disabledDateTime}
                showTime={{ defaultValue: dayjs("00:00:00", "HH:mm:ss") }}
              /> */}
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Space>
            </Form.Item>
          </div>
          <div style={{ flex: 1 }}>
            {openAddPest ? (
              <>
                <Form.Item
                  name="name"
                  label="Tên Thú cưng"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="img"
                  style={{ height: "130px" }}
                  label="Ảnh"
                  rules={[{ required: true }]}
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
                  >
                    {uploadButton}
                  </Upload>
                </Form.Item>
                <Form.Item name="age" label="Tuổi" rules={[{ required: true }]}>
                  <InputNumber min={0} />
                </Form.Item>

                <Form.Item
                  name="gender"
                  label="Giới tính"
                  rules={[{ required: true }]}
                >
                  <Select>
                    <Select.Option key={1} value={"Đực"}>
                      Đực
                    </Select.Option>
                    <Select.Option key={2} value={"Cái"}>
                      Cái
                    </Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="species_id"
                  label="Giống loài"
                  rules={[{ required: true }]}
                >
                  <Select onChange={onChangeSpecies}>
                    {species?.map((item: Tspecies) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                {openBreed && (
                  <Form.Item
                    name="breed_id"
                    label="Giống"
                    rules={[{ required: true }]}
                  >
                    <Select>
                      {breed?.map((item: TBreed) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                )}
              </>
            ) : (
              <>
                <Form.Item label={<span className="label">Tên Loại</span>}>
                  <Input disabled value={pet?.name} />
                </Form.Item>
                <Form.Item
                  style={{ height: "130px" }}
                  label={<span className="label">Ảnh</span>}
                >
                  <Upload
                    name="file"
                    disabled
                    action="https://api.cloudinary.com/v1_1/dksgvucji/image/upload"
                    data={{
                      upload_preset: "wh3rdke8",
                      cloud_name: "dksgvucji",
                    }}
                    fileList={fileList}
                    listType="picture-card"
                    maxCount={1}
                    showUploadList={true}
                    className="ant-upload-wrapper ant-upload-select"
                    onChange={handleImageChange}
                  />
                </Form.Item>
                <Form.Item label={<span className="label">Tuổi</span>}>
                  <Input disabled value={pet?.age} />
                </Form.Item>

                <Form.Item label={<span className="label">Giới tính</span>}>
                  <Input disabled value={pet?.gender} />
                </Form.Item>
                <Form.Item label={<span className="label">Giống loài</span>}>
                  <Input disabled value={pet?.nameSpecies} />
                </Form.Item>
                <Form.Item label={<span className="label">Giống</span>}>
                  <Input disabled value={pet?.nameBreed} />
                </Form.Item>
              </>
            )}
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Appointment;
