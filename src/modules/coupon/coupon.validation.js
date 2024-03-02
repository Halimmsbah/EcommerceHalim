import Joi from "joi";

export const addCouponVal= Joi.object({
    code: Joi.string().min(2).max(300).required().trim(),
    discount: Joi.number().min(0).required(),
    expires: Joi.date().required(),
}) 

export const paramsIdVal= Joi.object({
    id:Joi.string().hex().length(24).required()
})

export const updateCouponVal= Joi.object({
    id:Joi.string().hex().length(24).required(),
    code: Joi.string().min(2).max(300).trim(),
    discount: Joi.number().min(0),
    expires: Joi.date(),
})