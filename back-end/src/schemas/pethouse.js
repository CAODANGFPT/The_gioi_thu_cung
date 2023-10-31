import joi from 'joi';

export const pethouseSchema = joi.object({
  id: joi.number(),
  name: joi.string().required().messages({
    "String.empty": "Tên không được để trống",
    "any.required": "Trường tên là bắt buộc",
  }),
  quantity_pethouse: joi.number().required().messages({
    "String.empty": "Số lượng phòng không được để trống",
    "any.required": "Trường quantity là bắt buộc",
  }),
  still_empty: joi.number().required().messages({
    "String.empty": "Số lượng phòng trống không được để trống",
    "any.required": "Trường still_empty là bắt buộc",
  }),
})