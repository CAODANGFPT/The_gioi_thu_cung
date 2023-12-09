import joi from "joi";

export const deliveryAddressSchema = joi.object({
  id: joi.number(),
  name: joi.string().required().messages({
    "String.empty": "Tên không được để trống",
    "any.required": "Trường tên là bắt buộc",
  }),
  phone: joi.string().required().messages({
    "String.empty": "phone không được để trống",
    "any.required": "Trường phone là bắt buộc",
  }),
  address: joi.string().required().messages({
    "String.empty": "address không được để trống",
    "any.required": "Trường address là bắt buộc",
  }),
  user_id: joi.number().required().messages({
    "String.empty": "user_id không được để trống",
    "any.required": "Trường user_id là bắt buộc",
  }),
});
