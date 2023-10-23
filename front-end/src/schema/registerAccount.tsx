import * as yup from "yup";

export const RegisterAccountSchema = yup.object().shape({
  email: yup.string(),
  name: yup.string().required("Vui lòng nhập tên  "),
  password: yup
    .string()
    .min(8, "mật khẩu tối đa 8 kí tự")
    .required("Vui lòng nhập mật khẩu"),
  phone: yup
    .string()
    .matches(/^\d+$/, "Số điện thoại chỉ được kí tự số")
    .min(10, "số điện thoại tối thiểu phải 10 kí tự")
    .required("Vui lòng điền số điện thoại"),
  address: yup.string(),
});

export type TRegisterAccount = yup.InferType<typeof RegisterAccountSchema>;

export const RegisterAccountRequestSchema = RegisterAccountSchema;
