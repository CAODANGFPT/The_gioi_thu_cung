import joi from 'joi';

export const pethouseSchema = joi.object({
  id: joi.number(),
  name: joi.string().required().messages({
    "String.empty": "Tên không được để trống",
    "any.required": "Trường tên là bắt buộc",
  }),
  status_id: joi.number().required().messages({
    "Number.empty": "status_id không được để trống",
    "any.required": "Trường status_id là bắt buộc",
  })
});