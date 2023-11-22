  import {
    Avatar,
    Button,
    DatePicker,
    Form,
    Select,
    Space,
    message
  } from "antd";
  import { RangePickerProps } from "antd/es/date-picker";
  import dayjs, { Dayjs } from "dayjs";
  import React, { useEffect, useState } from "react";
  import { useNavigate, useParams } from "react-router-dom";
  import avatarPet from "../../../assets/image/avatar-pet.jpeg";
  import "../../../assets/scss/page/appointment.scss";
  import { TGetAppointmentTime } from "../../../schema/appointments";
  import { TpetHouse } from "../../../schema/pethouse";
  import { TPets, TUserPets } from "../../../schema/pets";
  import { TServices } from "../../../schema/services";
  import {
    useAddAppointmentMutation,
    useGetAppointmentTimeMutation,
  } from "../../../services/appointments";
  import { useBreedQuery } from "../../../services/breed";
  import { useGetAllpetHouseQuery } from "../../../services/pethouse";
  import {
    useGetAllUserPetsQuery,
    useUserPetMutation
  } from "../../../services/pets";
  import {
    useServicesQuery
  } from "../../../services/services";
  import { useGetAllspeciesQuery } from "../../../services/species";
  import { useGetUserQuery } from "../../../services/user";
  import ModalAddPet from "./modalAddPet";

  type TFinish = {
    petHouse_id: number;
    pet: number[];
    services: number[];
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
    const [pet, setPet] = useState<TPets[]>([]);
    const [openAddPest, setOpenAddPest] = useState<boolean>(false);
    const [servicesOpenTime, setServicesOpenTime] = useState<boolean>(false);
    const [idSpecies, setIdSpecies] = useState<number>(0);
    const [idServices, setIdServices] = useState<number[]>([]);
    const [total, setTotal] = useState<number | undefined>(0);
    const [namePet, setNamePet] = useState<number>();
    const [defaultValue, setDefaultValue] = useState<number[]>([]);
    const [valueId, setValueId] = useState<number | undefined>();
    const [disableTime, setDisableTime] = useState<TGetAppointmentTime[]>([]);
    const [endTime, setEndTime] = useState<Dayjs | null>(null);
    const { data: user } = useGetUserQuery();
    const { data: pethouse } = useGetAllpetHouseQuery();
    const { data: services } = useServicesQuery();
    const { data: species } = useGetAllspeciesQuery();
    const { data: listPet } = useGetAllUserPetsQuery();
    const { data: breed } = useBreedQuery(idSpecies);
    const [createAppointment] = useAddAppointmentMutation();
    const [getAppointmentTime] = useGetAppointmentTimeMutation();
    const [userPet] = useUserPetMutation();
    const { id: idService } = useParams<{ id: string }>();

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

    const optionsPet = listPet?.map((item: TUserPets) => ({
      value: item.id,
      label: item.name,
      disabled: item.id === namePet,
    }));
    const onFinish = async (values: TFinish) => {
      const newData = {
        day: dayjs().format("YYYY-MM-DD HH:mm:00"),
        pethouse_id: values.petHouse_id,
        pet: values.pet,
        user_id: user?.id,
        services: values.services,
        start_time: dayjs(values.start_time).format("YYYY-MM-DDTHH:mm:ssZ[Z]"),
        end_time: dayjs(endTime).format("YYYY-MM-DDTHH:mm:ssZ[Z]"),
        total: total,
        status_id: 1,
      };
      const resAppointment = await createAppointment(newData);
      if ("data" in resAppointment) {
        message.success(resAppointment.data.message);
        navigate("/cart");
      }
    };

    const onFinishFailed = async (values: any) => {
      console.log("Failed:", values);
    };

    const onChangePetHouse = async (value: number) => {
      const servicesId =
        services?.filter((service) => idServices.includes(service.id)) || [];
      const totalServices =
        servicesId?.reduce((acc, service) => acc + (service.price ?? 0), 0) ?? 0;
      setTotal(totalServices);
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
              if (current.hour() === endTime.hour()) {
                disabledMinutes = disabledMinutes.concat(
                  Array.from({ length: 60 }, (_, i) => i).filter(
                    (minute) => minute <= endTime.minute()
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
      if (value) {
        const servicesId =
          services?.filter((service) => idServices.includes(service.id)) || [];

        if (servicesId.length > 0) {
          const totalMilliseconds = servicesId.reduce((total, service) => {
            const regexResult = service.time.match(/(\d+):(\d+):(\d+)/);

            if (regexResult) {
              const [, hours, minutes, seconds] = regexResult;
              const milliseconds =
                parseInt(hours, 10) * 3600000 +
                parseInt(minutes, 10) * 60000 +
                parseInt(seconds, 10) * 1000;
              return total + milliseconds;
            }

            return total;
          }, 0);

          if (totalMilliseconds > 0) {
            const newEndTime = dayjs(dateString).add(
              totalMilliseconds,
              "millisecond"
            );
            setEndTime(newEndTime);
          } else {
            setEndTime(null);
          }
        } else {
          setEndTime(null);
        }
      } else {
        setEndTime(null);
      }
    };

    const listPets = async (value: number[]) => {
      if (value.length > 0) {
        const petData = value.map((petId) => ({
          pet_id: petId,
        }));
        const pets = await userPet({ data: petData });
        if ("data" in pets) {
          setPet(pets.data);
        }
      } else {
        setPet([]);
      }
    };
    const handleChangePets = (value: number[]) => {
      listPets(value);
      setDefaultValue(value);
    };
    
    useEffect(() => {
      if (valueId) {
        defaultValue.push(valueId)
        listPets(defaultValue);
        setValueId(undefined);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultValue, valueId]);
    
    const handleChangeService = (value: number[]) => {
      if (value.length > 0) {
        setServicesOpenTime(true);
        setIdServices(value);
        const servicesId =
          services?.filter((service) => value.includes(service.id)) || [];
        const totalServices =
          servicesId?.reduce((acc, service) => acc + (service.price ?? 0), 0) ??
          0;
        setTotal(totalServices);
      } else {
        setServicesOpenTime(false);
        setTotal(0);
      }
    };

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
              <Form.Item name="pet" label="Thú cưng" rules={[{ required: true }]}>
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  defaultValue={defaultValue}
                  onChange={handleChangePets}
                  options={optionsPet}
                />
              </Form.Item>
              <Form.Item
                name="services"
                label="Dịch vụ"
                rules={[{ required: true }]}
              >
                <Select
                  mode="multiple"
                  disabled={!!idService}
                  style={{ width: "100%" }}
                  defaultValue={[]}
                  onChange={handleChangeService}
                  options={optionsServices}
                />
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
                  gap: 20,
                }}
              >
                <Form.Item
                  name="start_time"
                  rules={[{ required: true }]}
                  style={{ width: "100%" }}
                  noStyle
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
                    disabled={!servicesOpenTime}
                  />
                </Form.Item>
                <Form.Item style={{ width: "100%" }} noStyle>
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
              {pet.length > 0 ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: 20,
                  }}
                >
                  {pet.map((item) => (
                    <div
                      style={{
                        position: "relative",
                        background: "#F7F7F7",
                        padding: 10,
                        color: "#00575C",
                        border: 2,
                        borderColor: "#00575C",
                      }}
                    >
                      <div>Tên thú cưng: {item?.name}</div>
                      <div>Tuổi: {item?.age}</div>
                      <div>Giới tính: {item?.gender}</div>
                      <div>Giống loài: {item?.nameSpecies}</div>
                      <div>Giống: {item?.nameBreed}</div>
                      <div style={{ position: "absolute", top: 5, right: 5 }}>
                        <Avatar size={100} shape="circle" src={item.img} />
                      </div>
                    </div>
                  ))}
                  <Button
                    onClick={() => setOpenAddPest(!openAddPest)}
                    style={{ maxWidth: 100, color: "white" }}
                  >
                    Thêm mới
                  </Button>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar size={200} src={avatarPet} />
                  <div>Chưa chọn thú cưng</div>
                  <p>Nếu bạn chưa có hoặc thêm mới ấn vào đây!</p>
                  <Button
                    onClick={() => setOpenAddPest(!openAddPest)}
                    style={{ maxWidth: 100, color: "white" }}
                  >
                    Thêm mới
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Form>
        <ModalAddPet
          setIdSpecies={setIdSpecies}
          openAddPest={openAddPest}
          species={species}
          breed={breed}
          setOpenAddPest={setOpenAddPest}
          user={user}
          setNamePet={setNamePet}
          setValueId = {setValueId}
        />
      </div>
    );
  };

  export default Appointment;
