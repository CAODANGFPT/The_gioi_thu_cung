import * as yup from "yup";

export const ServicesSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
  description: yup.string(),
  price: yup.number(),
});

export const ServicesRequestSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
  description: yup.string(),
  price: yup.number(),
});

export const ServicesResponseSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
  description: yup.string(),
  price: yup.number(),
});

export const ServicesErrorSchema = yup.object({});

export type TServices = yup.InferType<typeof ServicesSchema>;

export type ServicesResponse = yup.InferType<typeof ServicesResponseSchema>;

export type ServicesError = yup.InferType<typeof ServicesErrorSchema>;
