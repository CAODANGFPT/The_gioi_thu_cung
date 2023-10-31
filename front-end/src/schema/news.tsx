import * as yup from "yup";

export const NewsSchema = yup.object().shape({
  id: yup.number(),
  img: yup.string(),
  title: yup.string(),
  description: yup.string(),
  created_at: yup.string(),
  user_id: yup.number(),
});

export const NewsRequestSchema = yup.object().shape({
  id: yup.number(),
  img: yup.string(),
  title: yup.string(),
  description: yup.string(),
  created_at: yup.string(),
  user_id: yup.number(),
});

export const NewsResponseSchema = yup.object().shape({
  id: yup.number(),
  img: yup.string(),
  title: yup.string(),
  description: yup.string(),
  created_at: yup.string(),
  user_id: yup.number(),
});

export const NewsErrorSchema = yup.object({});

export type TNews = yup.InferType<typeof NewsSchema>;

export type NewsResponse = yup.InferType<typeof NewsResponseSchema>;

export type NewsError = yup.InferType<typeof NewsErrorSchema>;
