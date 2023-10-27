import * as yup from "yup";

export const ReviewSchema = yup.object().shape({
  id: yup.number(),
  user_id: yup.string(),
  rating: yup.number(),
  comment: yup.string(),
  created_at: yup.string(),
  services: yup.number(),
});

export const ReviewRequestSchema = yup.object().shape({
  id: yup.number(),
  user_id: yup.string(),
  rating: yup.number(),
  comment: yup.string(),
  created_at: yup.string(),
  services: yup.number(),
});

export const ReviewResponseSchema = yup.object().shape({
  id: yup.number(),
  Review_id: yup.string(),
  rating: yup.number(),
  comment: yup.string(),
  created_at: yup.string(),
  services: yup.number(),
});

export const ReviewErrorSchema = yup.object({});

export type TReview = yup.InferType<typeof ReviewSchema>;

export type ReviewResponse = yup.InferType<typeof ReviewResponseSchema>;

export type ReviewError = yup.InferType<typeof ReviewErrorSchema>;
