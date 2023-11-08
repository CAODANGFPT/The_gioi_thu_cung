import * as yup from "yup";

export const AppointmentSchema = yup.object().shape({
  id: yup.number(),
  day: yup.string(),
  pet_name: yup.string(),
  services_name: yup.string(),
  user_email: yup.string(),
  pethouse_name: yup.string(),
  settime_name: yup.string(),
  status_name: yup.string(),
  start_time: yup.string(),
  end_time: yup.string(),
  
});

export const AppointmentRequestSchema = yup.object().shape({
  id: yup.number(),
  day: yup.string(),
  pet_id: yup.number(),
  services_id: yup.number(),
  user_id: yup.number(),
  pethouse_id: yup.number(),
  time_id: yup.number(),
  status_id: yup.number(),
});

export const AppointmentResponseSchema = yup.object().shape({
  id: yup.number(),
  message: yup.string(),
});

export const AppointmentErrorSchema = yup.object({});

export type TAppointment = yup.InferType<typeof AppointmentSchema>;

export type AppointmentResponse = yup.InferType<
  typeof AppointmentResponseSchema
>;

export type AppointmentError = yup.InferType<typeof AppointmentErrorSchema>;

export const updateStatusAppointmentSchema = yup.object().shape({
  id: yup.number().required(),
  status_id: yup.number().required(),
});

export type TAupdateStatusAppointment = yup.InferType<
  typeof updateStatusAppointmentSchema
>;

export const createAppointmentSchema = yup.object().shape({
  day: yup.string().required(),
  pet_id: yup.number().required(),
  services_id: yup.number().required(),
  user_id: yup.number().required(),
  pethouse_id: yup.number().required(),
  time_id: yup.number().required(),
  status_id: yup.number().required(),
});

export type TCreateAppointment = yup.InferType<
  typeof createAppointmentSchema
>;
