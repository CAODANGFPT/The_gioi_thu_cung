import joi from "joi";

export const aboutSchema = joi.object({
  id: joi.number(),
  image: joi.string(),
  description: joi.string().required().messages({
    "String.empty": "description không được để trống",
  }),
});
