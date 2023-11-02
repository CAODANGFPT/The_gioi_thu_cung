import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddAppointmentMutation } from "../../../services/appointments";
import { useMultistepForm } from "./useMultistepForm";
import { PetAndBreedTypeForm } from "./petType";
import { ServiceForm } from "./service";
import { StaffForm } from "./staff";
import { PetHouseForm } from "./petHouse";
import { TimeForm } from "./time";
import "../../../assets/scss/page/appointmentUI.scss";
import { Tspecies } from "../../../schema/species";
import { TServices } from "../../../schema/services";
import { TStaff } from "../../../schema/staff";
import { TpetHouse } from "../../../schema/pethouse";
import { TSetTime } from "../../../schema/setTime";
import { TBreed } from "../../../schema/breed";
import { useGetUserQuery } from "../../../services/user";

type FormData = {
  pet_type: Tspecies;
  breed_type: TBreed;
  service: any;
  staff: TStaff;
  petHouse: TpetHouse;
  time: TSetTime;
};

const INITIAL_DATA: FormData = {
  pet_type: { id: 0, name: "" },
  breed_type: { id: 0, name: "" },
  service: { id: 0, name: "" },
  staff: { id: 0, name: "" },
  petHouse: { id: 0, name: "" },
  time: { id: 0, name: "", time: "" },
};

function Appointments() {
  const [data, setData] = useState(INITIAL_DATA);
  const addAppointment = useAddAppointmentMutation();
  const { data: user } = useGetUserQuery();
  const navigate = useNavigate();

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => ({ ...prev, ...fields }));
  }

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <PetAndBreedTypeForm
        pet_type={data.pet_type}
        breed_type={data.breed_type}
        updateFields={updateFields}
      />,
      <ServiceForm service={data.service} updateFields={updateFields} />,
      <StaffForm staff={data.staff} updateFields={updateFields} />,
      <PetHouseForm petHouse={data.petHouse} updateFields={updateFields} />,
      <TimeForm time={data.time} updateFields={updateFields} />,
    ]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();
    const appointmentData = {
      day: new Date(),
      pet_id: data.pet_type.id,
      services_id: data.service.id,
      user_id: user?.id,
      pethouse_id: data.petHouse.id,
      time_id: data.time.id,
    };

    try {
      const [mutateAsync] = addAppointment;
      await mutateAsync(appointmentData);
      console.log(appointmentData);
      alert("Bạn đã đặt lịch thành công!");
      navigate("/");
    } catch (error) {
      console.error("Error when adding appointment:", error);
    }
  }

  return (
    <div className="container">
      <div className="form-container">
        <form onSubmit={onSubmit}>
          <div className="step-number">
            Trang {currentStepIndex + 1} / {steps.length}
          </div>
          {step}
          <div className="btn-click">
            {!isFirstStep ? (
              <button className="btn-prev" type="button" onClick={back}>
                Quay lại
              </button>
            ) : (
              <div />
            )}
            <button className="btn-next" type="submit">
              {isLastStep ? "Đặt lịch" : "Tiếp theo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Appointments;
