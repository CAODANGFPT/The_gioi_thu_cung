// PetAndBreedTypeForm.tsx
import React, { useEffect, useState } from "react";
import { FormWrapperAppoinment } from "./FormWapperAppointment";
import { Tspecies } from "../../../schema/species";
import { TBreed } from "../../../schema/breed";
import { useSpeciesQuery } from "../../../services/species";
import { useBreedQuery } from "../../../services/breed";

type PetAndBreedTypeFormProps = {
  pet_type: Tspecies;
  breed_type: TBreed;
  updateFields: (fields: { pet_type: Tspecies; breed_type: TBreed }) => void;
};

export function PetAndBreedTypeForm({
  pet_type,
  breed_type,
  updateFields,
}: PetAndBreedTypeFormProps) {
  const species = useSpeciesQuery();
  const breed = useBreedQuery();

  const [filteredBreeds, setFilteredBreeds] = useState<TBreed[]>([]);
  const [isSpeciesSelected, setIsSpeciesSelected] = useState(false);

  useEffect(() => {
    if (pet_type.name) {
      const breedsForSelectedSpecies =
        breed.data?.filter((b) => b.nameSpecies === pet_type.name) || [];
      setFilteredBreeds(breedsForSelectedSpecies);
      setIsSpeciesSelected(true);
    } else {
      setFilteredBreeds([]);
      setIsSpeciesSelected(false);
    }
  }, [pet_type, breed.data]);

  return (
    <FormWrapperAppoinment title="Thú cưng của bạn là gì?">
      <div>
        <label>Loài thú cưng: </label>
        <select
          required
          onChange={(e) => {
            const selectedValue = e.target.value;
            const selectedSpecies = species.data?.find(
              (s) => s.id === Number(selectedValue)
            );
            updateFields({
              pet_type: {
                id: Number(selectedValue),
                name: selectedSpecies?.name,
              },
              breed_type: { id: 0, name: "", nameSpecies: 0 },
            });
          }}
          value={pet_type?.id}
        >
          <option value="">Lựa chọn</option>
          {species.data?.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Giống thú cưng: </label>
        <select
          required
          onChange={(e) => {
            if (isSpeciesSelected) {
              const selectedValue = e.target.value;
              updateFields({
                pet_type: pet_type,
                breed_type: {
                  id: Number(selectedValue),
                  name: "",
                  nameSpecies: 0,
                },
              });
            }
          }}
          value={breed_type?.id}
          disabled={!isSpeciesSelected}
        >
          <option value="">Lựa chọn</option>
          {filteredBreeds.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>
    </FormWrapperAppoinment>
  );
}
