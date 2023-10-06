import joi from "joi";

export const reviewSchema = joi.object({
    id: joi.number(),
    user_id: joi.number().required().messages({
      "number.empty": "user_id không được để trống",
      "any.required": "user_id là trường bắt buộc",
    }),
    rating: joi.number().required().messages({
      "number.empty": "rating không được để trống",
      "any.required": "rating là trường bắt buộc",
    }),
    comment: joi.string().required().messages({
      "string.empty": "comment không được để trống",
      "any.required": "comment là trường bắt buộc",
    }),
    created_at: joi
    .string()
    .regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Ngày tạo phải có định dạng hợp lệ (YYYY-MM-DD HH:mm:ss)",
      "any.required": "Ngày tạo không được để trống",
    }),
    services_id: joi.number().required().messages({
      "number.empty": "services_id không được để trống",
      "any.required": "services_id là trường bắt buộc",
    }),
});
