import * as yup from "yup";

export const ResetPassSchema = yup.object().shape({
  email: yup.string().required(),
});

export type TResetPass = yup.InferType<typeof ResetPassSchema>;

export const ResetPassRequestSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email không đúng định dạng")
    .required("Vui lòng nhập email"),
});
