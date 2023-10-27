import * as yup from "yup";

export const StaffSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
});

export const StaffRequestSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
});

export const StaffResponseSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
});

export const StaffErrorSchema = yup.object({});

export type TStaff = yup.InferType<typeof StaffSchema>;

export type StaffResponse = yup.InferType<typeof StaffResponseSchema>;

export type StaffError = yup.InferType<typeof StaffErrorSchema>;
