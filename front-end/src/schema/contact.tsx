import * as yup from "yup";

export const ContactSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
  nameUser: yup.number(),
});

export const ContactRequestSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
  nameUser: yup.number(),
});

export const ContactResponseSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
  nameUser: yup.number(),
});

export const ContactErrorSchema = yup.object({});

export type TContact = yup.InferType<typeof ContactSchema>;

export type ContactResponse = yup.InferType<typeof ContactResponseSchema>;

export type ContactError = yup.InferType<typeof ContactErrorSchema>;
