import { FormEvent, useState, useEffect } from "react";
import { useMultistepForm } from "./useMultistepForm";
import { PetTypeForm } from "./petType";
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
import { useAddAppointmentMutation } from "../../../services/appointments";

type FormData = {
  pet_type: Tspecies;
  service: TServices;
  staff: TStaff;
  petHouse: TpetHouse;
  time: TSetTime;
};

const INITIAL_DATA: FormData = {
  pet_type: { name: "", id: undefined },
  service: {
    id: undefined,
    name_service: "",
  },
  staff: { name: "", id: undefined },
  petHouse: { name: "", id: 1 },
  time: { name: "", id: undefined, time: "" },
};

function Appointments() {
  const [data, setData] = useState(INITIAL_DATA);
  const addAppointment = useAddAppointmentMutation();
  const user = JSON.parse(localStorage.getItem("user") as string);
  console.log("id cua user", user);
  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <PetTypeForm {...data} updateFields={updateFields} />,
      <ServiceForm {...data} updateFields={updateFields} />,
      <StaffForm {...data} updateFields={updateFields} />,
      <PetHouseForm {...data} updateFields={updateFields} />,
      <TimeForm {...data} updateFields={updateFields} />,
    ]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();
    const appointmentData = {
      day: new Date(),
      pet_id: data.pet_type.id,
      services_id: data.service.id,
      user_id: user.user.id,
      pethouse_id: data.petHouse.id,
      time_id: data.time.id,
    };
    try {
      const [mutateAsync] = addAppointment;
      await mutateAsync(appointmentData);
      console.log(appointmentData);
      alert("Bạn đã đặt lịch thành công!");
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
