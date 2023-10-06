import joi from "joi";

export const profileSchema = joi.object({
    id: joi.number(),
    logo: joi.string().required().messages({
        "String.empty": "Logo không được để trống",
        "any.required": "Trường tên là bắt buộc",
    }),
    email: joi.string().required().messages({
        "string.empty": "Email không được để trống",
        "any.required": "Trường email là bắt buộc",
        "string.email": "Email không đúng định dạng",
    })
    ,
    phone: joi.number().required().messages({
        "string.empty": "Phone không được để trống",
        "any.required": "Trường phone là bắt buộc",
    })
    ,
    fb: joi.string().required().messages({
        "String.empty": "Fb không được để trống",
        "any.required": "Trường fb là bắt buộc",
    })
});