// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from "react";
import { FormWrapperAppoinment } from "./FormWapperAppointment";

type PetTypeData = {
  pet_type: string;
};

type PetTypeFormProps = PetTypeData & {
  updateFields: (fields: Partial<PetTypeData>) => void;
};

export function PetTypeForm({ pet_type, updateFields }: PetTypeFormProps) {
  const handleSelectChange = (e: any) => {
    const selectedOption = e.target.value;
    if (selectedOption === "") {
      // Nếu người dùng chưa chọn tùy chọn, hiển thị một thông báo lỗi
      alert("Vui lòng chọn một loại thú cưng");
    } else {
      updateFields({ pet_type: selectedOption });
    }
  };

  return (
    <FormWrapperAppoinment title="Thú cưng của bạn là gì?">
      <label>Loại thú cưng: </label>
      <select required onChange={handleSelectChange} value={pet_type}>
        <option value="">Lựa chọn</option>
        <option value="dog">Chó</option>
        <option value="cat">Mèo</option>
      </select>
    </FormWrapperAppoinment>
  );
}
