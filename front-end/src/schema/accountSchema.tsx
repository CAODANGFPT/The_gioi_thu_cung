import * as yup from "yup";

export const AccountSchema = yup.object().shape({
  email: yup.string().required(),
  id: yup.number().required(),
  name: yup.string().required(),
  phone: yup.string().required(),
  address: yup.string().required(),
  products: yup.array().of(yup.string()).required(),
  price: yup.array().of(yup.number()).required(),
});

export type TAccount = yup.InferType<typeof AccountSchema>;
