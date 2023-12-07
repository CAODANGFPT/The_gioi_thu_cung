import joi from "joi";

export const roleSchema = joi.object({
  id: joi.number(),
  img: joi.string().messages({
    "string.empty": "Image không được để trống",
  })
});
