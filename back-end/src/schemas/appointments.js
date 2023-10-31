import joi from "joi";

export const appointmentsSchema = joi.object({
  id: joi.number(),
  day: joi.date().iso().required().messages({
    "date.base": "Trường day phải là ngày tháng hợp lệ",
    "date.format": "Trường day phải có định dạng chuẩn ISO",
    "any.required": "Trường day là bắt buộc",
  }),
  pet_id: joi.number().required().messages({
    "String.empty": "Pet_id không được để trống",
    "any.required": "Trường pet_id là bắt buộc",
  }),
  services_id: joi.number().required().messages({
    "String.empty": "Services_id không được để trống",
    "any.required": "Trường services_id là bắt buộc",
  }),
  user_id: joi.number().required().messages({
    "String.empty": "User_ID không được để trống",
    "any.required": "Trường User_ID là bắt buộc",
  }),
  pethouse_id: joi.number().required().messages({
    "String.empty": "Pethouse_id không được để trống",
    "any.required": "Trường pethouse_id là bắt buộc",
  }),
  time_id: joi.number().required().messages({
    "String.empty": "Time_id không được để trống",
    "any.required": "Trường time_id là bắt buộc",
  }),
  status_id: joi.number().required().messages({
    "String.empty": "Status_id không được để trống",
    "any.required": "Trường Status_id là bắt buộc",
  }),
});

// day, pet_id, services_id, user_id, pethouse_id, time_id
