import * as yup from "yup";

export const petHouseSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
});

export const petHouseRequestSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
});

export const petHouseResponseSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
});

export const petHouseErrorSchema = yup.object({});

export type TpetHouse = yup.InferType<typeof petHouseSchema>;

export type petHouseResponse = yup.InferType<typeof petHouseResponseSchema>;

export type petHouseError = yup.InferType<typeof petHouseErrorSchema>;