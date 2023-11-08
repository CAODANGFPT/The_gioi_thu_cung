import joi from "joi";

export const updatePasswordSchema = joi.object({
  idUser: joi.number().required().messages({
    "String.empty": "idUser không được để trống",
  }),
  newPassword: joi.string().required().min(8).messages({
    "string.empty": "Mật khẩu không được để trống",
    "any.required": "Trường mật khẩu là bắt buộc",
    "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự",
}),
  oldPassword: joi.string().required().min(8).messages({
    "string.empty": "Mật khẩu không được để trống",
    "any.required": "Trường mật khẩu là bắt buộc",
    "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự",
}),
});
