import joi from "joi";

export const contactSchema = joi.object({
    id: joi.number(),
    title: joi.string().required().messages({
        "String.empty": "Tên không được để trống",
        "any.required": "Trường tên là bắt buộc",
    }),
    subject: joi.string().required().messages({
        "String.empty": "Subject không được để trống",
        "any.required": "Trường subject là bắt buộc",
    })
    ,
    user_id: joi.number().required().messages({
        "String.empty": "User_ID không được để trống",
        "any.required": "Trường User_ID là bắt buộc",
    }),
    status_id: joi.number().required().messages({
        "String.empty": "User_ID không được để trống",
        "any.required": "Trường User_ID là bắt buộc",
    })
});