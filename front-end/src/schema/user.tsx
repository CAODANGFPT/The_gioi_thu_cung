import * as yup from "yup";

export const UserSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
  img: yup.string(),
  email: yup.string(),
  password: yup.string(),
  phone: yup.string(),
  address: yup.string(),
  nameRole: yup.string(),
});

export const UserRequestSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
  img: yup.string(),
  email: yup.string(),
  password: yup.string(),
  phone: yup.string(),
  address: yup.string(),
  nameRole: yup.number(),
});

export const UserResponseSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
  img: yup.string(),
  email: yup.string(),
  password: yup.string(),
  phone: yup.string(),
  address: yup.string(),
});

export const UserErrorSchema = yup.object({});

export type TUser = yup.InferType<typeof UserSchema>;

export type UserResponse = yup.InferType<typeof UserResponseSchema>;

export type UserError = yup.InferType<typeof UserErrorSchema>;
