import { FormWrapperAppoinment } from "./FormWapperAppointment";

type TimeData = {
  time: string;
};

type TimeFormProps = TimeData & {
  updateFields: (fields: Partial<TimeData>) => void;
};

export function TimeForm({ time, updateFields }: TimeFormProps) {
  const handleSelectChange = (e: any) => {
    const selectedOption = e.target.value;
    if (selectedOption === "") {
      // Nếu người dùng chưa chọn tùy chọn, hiển thị một thông báo lỗi
      alert("Vui lòng chọn một loại thú cưng");
    } else {
      updateFields({ time: selectedOption });
    }
  };
  return (
    <FormWrapperAppoinment title="Bạn muốn chọn ca nào?">
      <label>Ca: </label>
      <select required onChange={handleSelectChange} value={time}>
        <option value="">Lựa chọn</option>
        <option value="first">Ca 1(7h00 - 8h00)</option>
        <option value="second">Ca 1(8h10 - 9h10)</option>
      </select>
    </FormWrapperAppoinment>
  );
}
