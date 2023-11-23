import joi from "joi";

export const pethouseSchema = joi.object({
  id: joi.number(),
  name: joi.string().required().messages({
    "String.empty": "Tên không được để trống",
    "any.required": "Trường tên là bắt buộc",
  }),
  price: joi.number().required().messages({
    "Number.empty": "Price không được để trống",
    "any.required": "Trường price là bắt buộc",
  }),
});
