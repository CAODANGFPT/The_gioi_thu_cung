import joi from "joi";

export const footerSchema = joi.object({
  id: joi.number(),
  logo: joi.string().messages({
    "string.empty": "Logo không được để trống",
  }),
  slogan: joi.string().required().messages({
    "string.empty": "Slogan không được để trống",
    "any.required": "Trường Slogan là bắt buộc",
  }),
  send_email: joi.string().required().messages({
    "string.empty": "send_email không được để trống",
    "any.required": "send_email là trường bắt buộc",
  }),

  content: joi.string().required().messages({
    "string.empty": "Nội dung bên phải không được để trống",
    "any.required": "Nội dung bên phải là bắt buộc",
  }),
  license: joi.string().required().messages({
    "string.empty": "Bản quyền không được để trống",
    "any.required": "Bản quyền là bắt buộc",
  }),
});
