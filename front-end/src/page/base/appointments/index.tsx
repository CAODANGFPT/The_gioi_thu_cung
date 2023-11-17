import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
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
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/scss/page/appointment.scss";
import { TBreed } from "../../../schema/breed";
import { TpetHouse } from "../../../schema/pethouse";
import { TPets, TUserPets } from "../../../schema/pets";
import { TServices } from "../../../schema/services";
import { Tspecies } from "../../../schema/species";
import {
  useAddAppointmentMutation,
  useGetAppointmentTimeMutation,
} from "../../../services/appointments";
import { useBreedQuery } from "../../../services/breed";
import { useGetAllpetHouseQuery } from "../../../services/pethouse";
import {
  useCreatePetsMutation,
  useGetAllUserPetsQuery,
} from "../../../services/pets";
import { useServicesQuery } from "../../../services/services";
import { useGetAllspeciesQuery } from "../../../services/species";
import { useGetUserQuery } from "../../../services/user";
import { TGetAppointmentTime } from "../../../schema/appointments";

type TFinish = {
  petHouse_id: number;
  pet_id: number;
  services_id: number;
  start_time: string;
  end_time: string;
  total: number;
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
  const [servicesOpenTime, setServicesOpenTime] = useState<boolean>(false);
  const [petHouseOpenTime, setPetHouseOpenTime] = useState<boolean>(false);
  // const [timeServices, setTimeServices] = useState<Date>();
  const [idSpecies, setIdSpecies] = useState<number>(0);
  const [idServices, setIdServices] = useState<number>(0);
  const [idPetHouse, setIdPetHouse] = useState<number>(0);
  const [total, setTotal] = useState<number | undefined>(0);
  const [dateTime, setDateTime] = useState<string>("");
  const [disableTime, setDisableTime] = useState<TGetAppointmentTime[]>([]);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
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
  const { data: species } = useGetAllspeciesQuery();
  const { data: listPet } = useGetAllUserPetsQuery();
  const { data: breed } = useBreedQuery(idSpecies);
  const [createAppointment] = useAddAppointmentMutation();
  const [getAppointmentTime] = useGetAppointmentTimeMutation();
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

  const optionsServices = services?.map((item: TServices) => ({
    value: item.id,
    label: item.name,
    disabled: item.is_delete === 1,
  }));

  const optionsPetHouse = pethouse?.map((item: TpetHouse) => ({
    value: item.id,
    label: item.name,
    disabled: item.status_id === 1,
  }));

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
          start_time: dayjs(values.start_time).format(
            "YYYY-MM-DDTHH:mm:ssZ[Z]"
          ),
          end_time: dayjs(endTime).format("YYYY-MM-DDTHH:mm:ssZ[Z]"),
          total: total,
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
        start_time: dayjs(values.start_time).format("YYYY-MM-DDTHH:mm:ssZ[Z]"),
        end_time: dayjs(endTime).format("YYYY-MM-DDTHH:mm:ssZ[Z]"),
        total: total,
        status_id: 1,
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
  };

  const onChangeSpecies = (value: number) => {
    setOpenBreed(true);
    setIdSpecies(value);
    form.resetFields(["breed_id"]);
  };

  const onChangeServices = (value: number) => {
    setServicesOpenTime(true);
    setIdServices(value);
    const servicesId = services?.find((service) => service.id === value);
    const petHouseId = pethouse?.find((pethouse) => pethouse.id === idPetHouse);
    setTotal((servicesId?.price ?? 0) + (petHouseId?.price ?? 0));
  };

  const onChangePetHouse = async (value: number) => {
    setPetHouseOpenTime(true);
    setIdPetHouse(value);
    const servicesId = services?.find((service) => service.id === idServices);
    const petHouseId = pethouse?.find((pethouse) => pethouse.id === value);
    setTotal((servicesId?.price ?? 0) + (petHouseId?.price ?? 0));
    form.setFieldValue("start_time", null);
    setEndTime(null);
    const res = await getAppointmentTime({ pethouse_id: value });
    if ("data" in res) {
      const formattedData = res.data.map((item) => ({
        id: item.id,
        start_time: dayjs(item.start_time).format("YYYY-MM-DD HH:mm:ss"),
        end_time: dayjs(item.end_time)
          .subtract(1, "second")
          .format("YYYY-MM-DD HH:mm:ss"),
      }));
      setDisableTime(formattedData);
    }
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

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    if (!current) {
      return false;
    }
    const today = dayjs().startOf("day");
    const afterFiveDays = today.add(5, "day").endOf("day");
    return current.isBefore(today) || current.isAfter(afterFiveDays);
  };
  const disabledDateTime = (current: Dayjs | null) => {
    return {
      disabledHours: () => {
        const defaultDisabledHours = Array.from(
          { length: 24 },
          (_, i) => i
        ).filter((hour) => hour < 9 || hour > 17 || hour === 12);

        if (current && current.isSame(dayjs(), "day")) {
          const currentDayDisabledHours = Array.from(
            { length: dayjs().hour() + 1 },
            (_, i) => i
          );

          return [...defaultDisabledHours, ...currentDayDisabledHours];
        } else {
          let disabledHours: number[] = [];

          disableTime.forEach(({ start_time, end_time }) => {
            const startTime = dayjs(start_time);
            const endTime = dayjs(end_time);

            if (
              current &&
              current.isSame(startTime, "day") &&
              current.isSame(endTime, "day")
            ) {
              disabledHours = disabledHours.concat(
                Array.from({ length: 24 }, (_, i) => i).filter(
                  (hour) =>
                    hour >= startTime.hour() && hour <= endTime.hour() - 1
                )
              );
            }
          });

          return [...defaultDisabledHours, ...disabledHours];
        }
      },
      disabledMinutes: () => {
        let disabledMinutes: number[] = [];

        disableTime.forEach(({ start_time, end_time }) => {
          const startTime = dayjs(start_time);
          const endTime = dayjs(end_time);

          if (
            current &&
            current.isSame(startTime, "day") &&
            current.isSame(endTime, "day")
          ) {
            console.log(endTime.hour());
            if (current.hour() === endTime.hour()) {
              disabledMinutes = disabledMinutes.concat(
                Array.from({ length: 60 }, (_, i) => i).filter(
                  (minute) =>
                    minute <= endTime.minute()
                )
              );
            }
          }
        });

        return disabledMinutes;
      },
    };
  };

  const onChangeTime = (value: Dayjs | null, dateString: string) => {
    setDateTime(dateString);
    if (value) {
      const servicesId = services?.find((service) => service.id === idServices);
      const regexResult = servicesId?.time.match(/(\d+):(\d+):(\d+)/);
      if (regexResult) {
        const [extractedHour, , extractedSeconds] = regexResult;
        const newEndTime = dayjs(dateString)
          .add(parseInt(extractedHour, 10), "hour")
          .add(parseInt(extractedSeconds, 10), "minute");
        setEndTime(newEndTime);
      }
    } else {
      setEndTime(null);
    }
  };

  useEffect(() => {
    const servicesId = services?.find((service) => service.id === idServices);
    const regexResult = servicesId?.time.match(/(\d+):(\d+):(\d+)/);
    if (regexResult) {
      const [extractedHour, ,] = regexResult;
      console.log(extractedHour);
    }
  }, [idServices, services]);

  useEffect(() => {
    if (dateTime) {
      const servicesId = services?.find((service) => service.id === idServices);
      const regexResult = servicesId?.time.match(/(\d+):(\d+):(\d+)/);
      if (regexResult) {
        const [extractedHour, , extractedSeconds] = regexResult;
        const newEndTime = dayjs(dateTime)
          .add(parseInt(extractedHour, 10), "hour")
          .add(parseInt(extractedSeconds, 10), "minute");
        setEndTime(newEndTime);
      }
    }
  }, [dateTime, idServices, services]);

  useEffect(() => {
    console.log(endTime?.toISOString());
  }, [endTime]);

  return (
    <div className="appointment">
      <h1 style={{ marginBottom: 20, color: "#00575c" }}>
        Đặt lịch chăm sóc thú cưng
      </h1>
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
              name="services_id"
              label="Dịch vụ"
              rules={[{ required: true }]}
            >
              <Select onChange={onChangeServices} options={optionsServices} />
            </Form.Item>
            <Form.Item
              name="petHouse_id"
              label="Loại phòng"
              rules={[{ required: true }]}
            >
              <Select onChange={onChangePetHouse} options={optionsPetHouse} />
            </Form.Item>
            <Form.Item
              label="Thời gian"
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: 20,
              }}
            >
              <Form.Item
                name="start_time"
                rules={[{ required: true }]}
                style={{ width: "100%" }}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  format="YYYY-MM-DD HH:mm"
                  disabledDate={disabledDate}
                  disabledTime={disabledDateTime}
                  showTime={{
                    defaultValue: dayjs("08:00:00", "HH:mm:ss"),
                  }}
                  onChange={onChangeTime}
                  showNow={false}
                  disabled={!petHouseOpenTime || !servicesOpenTime}
                />
              </Form.Item>
              <Form.Item style={{ width: "100%" }}>
                <DatePicker
                  style={{ width: "100%" }}
                  format="YYYY-MM-DD HH:mm"
                  value={endTime}
                  disabled
                />
              </Form.Item>
            </Form.Item>
            <Form.Item label="Tổng số tiền">
              <div>
                <span style={{ fontSize: 24, color: "#00575c" }}>
                  {new Intl.NumberFormat("vi-VN").format(total ?? 0)}
                </span>
                <span style={{ fontSize: 16, color: "#00575c" }}>VNĐ</span>
              </div>
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
                <Form.Item
                  name="breed_id"
                  label="Giống"
                  rules={[{ required: true }]}
                >
                  <Select disabled={!openBreed}>
                    {breed?.map((item: TBreed) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
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
