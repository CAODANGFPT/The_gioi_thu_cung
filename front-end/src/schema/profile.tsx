import * as yup from "yup";

export const ProfileSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
});

export const ProfileRequestSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
});

export const ProfileResponseSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
});

export const ProfileErrorSchema = yup.object({});

export type TProfile = yup.InferType<typeof ProfileSchema>;

export type ProfileResponse = yup.InferType<typeof ProfileResponseSchema>;

export type ProfileError = yup.InferType<typeof ProfileErrorSchema>;
