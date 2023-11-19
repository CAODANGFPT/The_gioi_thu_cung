import joi from "joi";

export const appointmentsSchema = joi.object({
  id: joi.number(),
  day: joi.string().required().messages({
    "String.empty": "Tên không được để trống",
  }),
  pet: joi.array().items(
    joi.object().keys({
      pet_id: joi.number().required(),
    })
  ),
  services: joi.array().items(
    joi.object().keys({
      service_id: joi.number().required(),
    })
  ),
  user_id: joi.number().required().messages({
    "String.empty": "User_ID không được để trống",
    "any.required": "Trường User_ID là bắt buộc",
  }),
  pethouse_id: joi.number().required().messages({
    "String.empty": "Pethouse_id không được để trống",
    "any.required": "Trường pethouse_id là bắt buộc",
  }),
  start_time: joi.string().required().messages({
    "String.empty": "start_time không được để trống",
  }),
  end_time: joi.string().required().messages({
    "String.empty": "end_time không được để trống",
  }),
  total: joi.number().required().messages({
    "String.empty": "total không được để trống",
  }),
  status_id: joi.number(),
});

export const updateAppointmentStatusSchema = joi.object({
  id: joi.number().required(),
  status_id: joi.number().required(),
});

// day, pet_id, services_id, user_id, pethouse_id, time_id
