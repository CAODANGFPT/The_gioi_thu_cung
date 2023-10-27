import { TSetTime } from "../../../schema/setTime";
import { useSetTimeQuery } from "../../../services/setTime";
import { FormWrapperAppoinment } from "./FormWapperAppointment";

type TimeFormProps = {
  time: TSetTime;
  updateFields: (fields: Partial<TimeFormProps>) => void;
};

export function TimeForm({ time, updateFields }: TimeFormProps) {
  const { data: setTimeData } = useSetTimeQuery();
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    if (selectedOption === "") {
      // Nếu người dùng chưa chọn tùy chọn, hiển thị một thông báo lỗi
      alert("Vui lòng chọn một loại thú cưng");
    } else {
      const selectedSetTime = setTimeData?.find(
        (s) => s.id === Number(selectedOption)
      );
      if (selectedSetTime) {
        updateFields({
          time: {
            id: selectedSetTime.id,
            name: selectedSetTime.name,
            time: selectedSetTime.time,
          },
        });
      }
    }
  };
  return (
    <FormWrapperAppoinment title="Bạn muốn chọn ca nào?">
      <label>Ca: </label>
      <select required onChange={handleSelectChange} value={time.id}>
        <option value="">Lựa chọn</option>
        {setTimeData?.map((setTime) => (
          <option key={setTime.id} value={setTime.id}>
            {setTime.name} - {setTime.time}
          </option>
        ))}
      </select>
    </FormWrapperAppoinment>
  );
}
