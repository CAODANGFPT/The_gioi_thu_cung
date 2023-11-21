import * as yup from "yup";

export const PetsSchema = yup.object().shape({
  id: yup.number(),
  img: yup.string(),
  name: yup.string(),
  age: yup.number(),
  gender: yup.string(),
  nameUser: yup.number(),
  nameSpecies: yup.number(),
  nameBreed: yup.number(),
});

export const PetsRequestSchema = yup.object().shape({
  id: yup.number(),
  img: yup.string(),
  name: yup.string(),
  age: yup.number(),
  gender: yup.string(),
  nameUser: yup.number(),
  nameSpecies: yup.number(),
  nameBreed: yup.number(),
});

export const PetsResponseSchema = yup.object().shape({
  id: yup.number().required(),
  message: yup.string(),
});

export const PetsErrorSchema = yup.object({});

export type TPets = yup.InferType<typeof PetsSchema>;

export type PetsResponse = yup.InferType<typeof PetsResponseSchema>;

export type PetsError = yup.InferType<typeof PetsErrorSchema>;

export const UserPetsSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
});

export type TUserPets = yup.InferType<typeof UserPetsSchema>;

export const UserPetRequestSchema = yup.object().shape({
  data: yup.array().of(
    yup.object().shape({
      pet_id: yup.number().required(),
    })
  ),
});

export type TUserPet = yup.InferType<typeof UserPetRequestSchema>;
