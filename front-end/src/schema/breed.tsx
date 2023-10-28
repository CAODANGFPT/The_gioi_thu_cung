import * as yup from "yup";

export const BreedSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
  nameSpecies: yup.number(),
});

export const BreedRequestSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
  nameSpecies: yup.number(),
});

export const BreedResponseSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
  nameSpecies: yup.number(),
});

export const BreedErrorSchema = yup.object({});

export type TBreed = yup.InferType<typeof BreedSchema>;

export type BreedResponse = yup.InferType<typeof BreedResponseSchema>;

export type BreedError = yup.InferType<typeof BreedErrorSchema>;
