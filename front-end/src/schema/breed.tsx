import * as yup from "yup";

export const breedSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
  nameSpecies: yup.number(),
});

export const breedRequestSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
  nameSpecies: yup.number(),
});

export const breedResponseSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
  nameSpecies: yup.number(),
});

export const breedErrorSchema = yup.object({});

export type Tbreed = yup.InferType<typeof breedSchema>;

export type breedResponse = yup.InferType<typeof breedResponseSchema>;

export type breedError = yup.InferType<typeof breedErrorSchema>;
