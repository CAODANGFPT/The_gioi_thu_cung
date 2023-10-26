import { FormWrapperAppoinment } from "./FormWapperAppointment";

type PetHouseData = {
  pethouse: string;
};

type PetHouseFormProps = PetHouseData & {
  updateFields: (fields: Partial<PetHouseData>) => void;
};

export function PetHouseForm({ pethouse, updateFields }: PetHouseFormProps) {
  const handleSelectChange = (e: any) => {
    const selectedOption = e.target.value;
    if (selectedOption === "") {
      // Nếu người dùng chưa chọn tùy chọn, hiển thị một thông báo lỗi
      alert("Vui lòng chọn một loại thú cưng");
    } else {
      updateFields({ pethouse: selectedOption });
    }
  };
  return (
    <FormWrapperAppoinment title="Bạn muốn chọn loại phòng nào?">
      <label>Loại phòng: </label>
      <select required onChange={handleSelectChange} value={pethouse}>
        <option value="">Lựa chọn</option>
        <option value="vip">VIP</option>
        <option value="normal">Thường</option>
      </select>
    </FormWrapperAppoinment>
  );
}
