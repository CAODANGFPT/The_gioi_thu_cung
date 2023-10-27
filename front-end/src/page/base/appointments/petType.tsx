import React from "react";
import { FormWrapperAppoinment } from "./FormWapperAppointment";
import { Tspecies } from "../../../schema/species";
import { useSpeciesQuery } from "../../../services/species";

type PetTypeFormProps = {
  pet_type: Tspecies;
  updateFields: (fields: { pet_type: Tspecies }) => void;
};

export function PetTypeForm({ pet_type, updateFields }: PetTypeFormProps) {
  const species = useSpeciesQuery();

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    if (selectedOption === "") {
      alert("Vui lòng chọn một loại thú cưng");
    } else {
      const selectedSpecies = species.data?.find(
        (species) => species.id === Number(selectedOption)
      );
      updateFields({ pet_type: selectedSpecies || {} });
    }
  };

  return (
    <FormWrapperAppoinment title="Thú cưng của bạn là gì?">
      <div>
        <label>Loại thú cưng: </label>
        <select required onChange={handleSelectChange} value={pet_type?.id}>
          <option value="">Lựa chọn</option>
          {species.data?.map((species) => (
            <option key={species.id} value={String(species.id)}>
              {species.name}
            </option>
          ))}
        </select>
      </div>
    </FormWrapperAppoinment>
  );
}
