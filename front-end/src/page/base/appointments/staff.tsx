import { FormWrapperAppoinment } from "./FormWapperAppointment";

type StaffData = {
  staff: string;
};

type AccountFormProps = StaffData & {
  updateFields: (fields: Partial<StaffData>) => void;
};

export function StaffForm({ staff, updateFields }: AccountFormProps) {
  const handleSelectChange = (e: any) => {
    const selectedOption = e.target.value;
    if (selectedOption === "") {
      // Nếu người dùng chưa chọn tùy chọn, hiển thị một thông báo lỗi
      alert("Vui lòng chọn một loại thú cưng");
    } else {
      updateFields({ staff: selectedOption });
    }
  };
  return (
    <FormWrapperAppoinment title="Bạn muốn lựa chọn nhân viên nào?">
      <label>Nhân viên: </label>
      <select required onChange={handleSelectChange} value={staff}>
        <option value="">Lựa chọn</option>
        <option value="staff_1">NT Thanh</option>
        <option value="staff_1">LV Phúc</option>
      </select>
    </FormWrapperAppoinment>
  );
}
