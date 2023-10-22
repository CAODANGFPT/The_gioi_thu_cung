import React, { useState } from "react";
import { FormWrapperAppoinment } from "./FormWapperAppointment";

type ServiceData = {
  service: string;
};

type ServiceFormProps = ServiceData & {
  updateFields: (fields: Partial<ServiceData>) => void;
};

export function ServiceForm({ service, updateFields }: ServiceFormProps) {
  const [selectedService, setSelectedService] = useState(service);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    setSelectedService(selectedOption);
    if (selectedOption === "") {
      // Nếu người dùng chưa chọn tùy chọn, hiển thị một thông báo lỗi
      alert("Vui lòng chọn một loại thú cưng");
    }
    if (selectedOption !== "other") {
      // Nếu người dùng chọn một tùy chọn khác "Khác," cập nhật dịch vụ
      updateFields({ service: selectedOption });
    }
  };

  const handleOtherServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Cập nhật dịch vụ khi người dùng nhập
    setSelectedService("other");
    updateFields({ service: e.target.value });
  };

  return (
    <FormWrapperAppoinment title="Bạn muốn chọn dịch vụ nào?">
      <label>Dịch vụ: </label>
      <select required onChange={handleSelectChange} value={selectedService}>
        <option value="">Lựa chọn</option>
        <option value="feathers_cut">Cắt lông</option>
        <option value="take_a_shower">Tắm</option>
        <option value="other">Khác</option>
      </select>

      {/* Hiển thị trường nhập dữ liệu khi "Khác" được chọn */}
      {selectedService === "other" && (
        <input
          type="text"
          placeholder="Nhập loại dịch vụ khác"
          value={service} // Hiển thị giá trị dịch vụ khác
          onChange={handleOtherServiceChange}
        />
      )}
    </FormWrapperAppoinment>
  );
}
