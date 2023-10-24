import * as yup from "yup";

export const SignInSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});

export type TSignIn = yup.InferType<typeof SignInSchema>;

export const SignInRequestSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email không đúng định dạng.")
    .required("Vui lòng nhập đúng email."),
  password: yup
    .string()
    .min(8, "Mật khẩu phải tối đa 8 kí tự.")
    .required("Vui lòng nhập đúng mật khẩu."),
});
