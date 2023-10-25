import { FormEvent, useState } from "react";
import { useMultistepForm } from "./useMultistepForm";
import { PetTypeForm } from "./petType";
import { ServiceForm } from "./service";
import { StaffForm } from "./staff";
import { PetHouseForm } from "./petHouse";
import { TimeForm } from "./time";
import "../../../assets/scss/layout/appointmentUI.scss";

type FormData = {
  pet_type: string;
  service: string;
  staff: string;
  pethouse: string;
  time: string;
};

const INITIAL_DATA: FormData = {
  pet_type: "",
  service: "",
  staff: "",
  pethouse: "",
  time: "",
};

function Appointments() {
  const [data, setData] = useState(INITIAL_DATA);
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

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();
    console.log("message", data);
    alert("Bạn đã đặt lịch thành công!");
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
