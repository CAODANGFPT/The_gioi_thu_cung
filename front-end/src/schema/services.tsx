import * as yup from "yup";

export const ServicesSchema = yup.object().shape({
  id: yup.number(),
  name_service: yup.string(),
  description: yup.string(),
  price: yup.number(),
});

export const ServicesRequestSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string().required(),
  image: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
});

export const ServicesResponseSchema = yup.object().shape({
  id: yup.number(),
  name_service: yup.string(),
  description: yup.string(),
  price: yup.number(),
});

export const ServicesErrorSchema = yup.object({});

export type TServices = yup.InferType<typeof ServicesSchema>;

export type ServicesResponse = yup.InferType<typeof ServicesResponseSchema>;
export type TServicesRequest = yup.InferType<typeof ServicesRequestSchema>;

export type ServicesError = yup.InferType<typeof ServicesErrorSchema>;
