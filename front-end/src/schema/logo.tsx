/* eslint-disable @typescript-eslint/no-redeclare */
import * as yup from "yup";

export const LogoSchema = yup.object().shape({
  id: yup.number(),
  img: yup.string(),
});

export const LogoRequestSchema = yup.object().shape({
  id: yup.number(),
  img: yup.string(),
});

export const LogoResponseSchema = yup.object().shape({
  id: yup.number(),
  img: yup.string(),
});

export const LogoErrorSchema = yup.object({});

export type TLogo = yup.InferType<typeof LogoSchema>;

export type LogoResponseSchema = yup.InferType<typeof LogoResponseSchema>;

export type LogoError = yup.InferType<typeof LogoErrorSchema>;
