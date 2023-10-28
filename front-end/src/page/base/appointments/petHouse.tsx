import { TpetHouse } from "../../../schema/pethouse";
import { useGetAllpetHouseQuery } from "../../../services/pethouse";
import { FormWrapperAppoinment } from "./FormWapperAppointment";

type PetHouseFormProps = {
  petHouse: TpetHouse;
  updateFields: (fields: Partial<PetHouseFormProps>) => void;
};

export function PetHouseForm({ petHouse, updateFields }: PetHouseFormProps) {
  const { data: petHouseData } = useGetAllpetHouseQuery();
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    if (selectedOption === "") {
      alert("Vui lòng chọn một loại thú cưng");
    } else {
      const selectedPetHouse = petHouseData?.find(
        (s) => s.id === Number(selectedOption)
      );
      if (selectedPetHouse) {
        updateFields({
          petHouse: {
            id: selectedPetHouse.id,
            name: selectedPetHouse.name,
          },
        });
      }
    }
  };
  return (
    <FormWrapperAppoinment title="Bạn muốn chọn loại phòng nào?">
      <label>Loại phòng: </label>
      <select required onChange={handleSelectChange} value={petHouse.id}>
        {petHouseData?.map((petHouse) => (
          <option key={petHouse.id} value={petHouse.id}>
            {petHouse.name}
          </option>
        ))}
      </select>
    </FormWrapperAppoinment>
  );
}
