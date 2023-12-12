import * as yup from "yup";

export const OrderAdminSchema = yup.object().shape({
  id: yup.number(),
  userId: yup.number(),
  userName: yup.string(),
  time: yup.string(),
  products: yup.array().of(
    yup.object().shape({
      id: yup.number(),
      name: yup.string(),
      img: yup.string(),
      price: yup.number(),
      quantity: yup.number(),
    })
  ),
  address: yup.object().shape({
    id: yup.number(),
    name: yup.string(),
    address: yup.string(),
    phone: yup.number(),
  }),
  paymentMethods: yup.object().shape({
    id: yup.number(),
    name: yup.string(),
  }),
  status: yup.object().shape({
    id: yup.number(),
    name: yup.string(),
  }),
  statusPayment: yup.object().shape({
    id: yup.number(),
    name: yup.string(),
  }),
  total: yup.number(),
  note: yup.number(),
});

export type TOrderAdminSchema = yup.InferType<typeof OrderAdminSchema>;
