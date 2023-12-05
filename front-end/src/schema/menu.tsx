import * as yup from "yup";

export const MenuSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
  link: yup.string(),
  menuType_id: yup.string(),
  nameMenuMenuType: yup.number(),
});

export const MenuRequestSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
  link: yup.string(),
  menuType_id: yup.string(),
  nameMenuMenuType: yup.number(),
});

export const MenuResponseSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
  link: yup.string(),
  menuType_id: yup.string(),
  nameMenuMenuType: yup.number(),
});

export const MenuErrorSchema = yup.object({});

export type TMenu = yup.InferType<typeof MenuSchema>;

export type MenuResponse = yup.InferType<typeof MenuResponseSchema>;

export type MenuError = yup.InferType<typeof MenuErrorSchema>;

export const MenuAddSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
  link: yup.string(),
  menuType_id: yup.string(),
});

export type TMenuAdd = yup.InferType<typeof MenuAddSchema>;
