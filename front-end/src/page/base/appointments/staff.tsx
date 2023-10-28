import { TStaff } from "../../../schema/staff";
import { useStaffQuery } from "../../../services/staff";
import { FormWrapperAppoinment } from "./FormWapperAppointment";

type AccountFormProps = {
  staff: TStaff;
  updateFields: (fields: Partial<AccountFormProps>) => void;
};

export function StaffForm({ staff, updateFields }: AccountFormProps) {
  const { data: staffData } = useStaffQuery();
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    if (selectedOption === "") {
      alert("Vui lòng chọn một loại thú cưng");
    } else {
      const selectedStaff = staffData?.find(
        (s) => s.id === Number(selectedOption)
      );
      if (selectedStaff) {
        updateFields({
          staff: {
            id: selectedStaff.id,
            name: selectedStaff.name,
          },
        });
      }
    }
  };
  return (
    <FormWrapperAppoinment title="Bạn muốn lựa chọn nhân viên nào?">
      <label>Nhân viên: </label>
      <select required onChange={handleSelectChange} value={staff.id}>
        <option value="">Lựa chọn</option>
        {staffData?.map((staff) => (
          <option key={staff.id} value={staff.id}>
            {staff.name}
          </option>
        ))}
      </select>
    </FormWrapperAppoinment>
  );
}
