import joi from "joi";

export const appointmentsSchema = joi.object({
  id: joi.number(),
  day: joi.string().required().messages({
    "String.empty": "Tên không được để trống",
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
  status_id: joi.number(),
});

export const updateAppointmentStatusSchema = joi.object({
  id: joi.number().required(),
  status_id: joi.number().required(),
});

// day, pet_id, services_id, user_id, pethouse_id, time_id
