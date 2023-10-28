import * as yup from "yup";

export const AppointmentSchema = yup.object().shape({
  id: yup.number(),
  day: yup.date(),
  pet_id: yup.number(),
  services_id: yup.number(),
  user_id: yup.number(),
  pethouse_id: yup.number(),
  time_id: yup.number(),
});

export const AppointmentRequestSchema = yup.object().shape({
  id: yup.number(),
  day: yup.date(),
  pet_id: yup.number(),
  services_id: yup.number(),
  user_id: yup.number(),
  pethouse_id: yup.number(),
  time_id: yup.number(),
});

export const AppointmentResponseSchema = yup.object().shape({
  id: yup.number(),
  day: yup.date(),
  pet_id: yup.number(),
  services_id: yup.number(),
  user_id: yup.number(),
  pethouse_id: yup.number(),
  time_id: yup.number(),
});

export const AppointmentErrorSchema = yup.object({});

export type TAppointment = yup.InferType<typeof AppointmentSchema>;

export type AppointmentResponse = yup.InferType<
  typeof AppointmentResponseSchema
>;

export type AppointmentError = yup.InferType<typeof AppointmentErrorSchema>;