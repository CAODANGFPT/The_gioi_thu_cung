import joi from "joi";

export const menuSchema = joi.object({
    id: joi.number(),
    name: joi.string().required().messages({
        "string.empty": "Name không được để trống",
        "any.required": "Trường name là bắt buộc",
    })
    ,
    link: joi.string().required().messages({
        "String.empty": "Link không được để trống",
        "any.required": "Trường link là bắt buộc",
    })
});