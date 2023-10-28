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
  id: yup.number(),
  img: yup.string(),
  name: yup.string(),
  age: yup.number(),
  gender: yup.string(),
  nameUser: yup.number(),
  nameSpecies: yup.number(),
  nameBreed: yup.number(),
});

export const PetsErrorSchema = yup.object({});

export type TPets = yup.InferType<typeof PetsSchema>;

export type PetsResponse = yup.InferType<typeof PetsResponseSchema>;

export type PetsError = yup.InferType<typeof PetsErrorSchema>;
