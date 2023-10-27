import joi from "joi";

export const setTimeSchema = joi.object({
    id: joi.number(),
    name: joi.string().required().messages({
        "String.empty": "Tên không được để trống",
    }),
    time: joi.string().required().messages({
        "String.empty": "Thời gian không được để trống",
    }),
});
