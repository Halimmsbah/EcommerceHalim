import Joi from "joi";

export const addReviewVal= Joi.object({
    text: Joi.string().min(2).max(300).required().trim(),
    rate: Joi.number().min(0).max(5).required(),
    product:Joi.string().hex().length(24).required(),


})

export const paramsIdVal= Joi.object({
    id:Joi.string().hex().length(24).required()
})

export const updateReviewVal= Joi.object({
    id:Joi.string().hex().length(24).required(),
    text: Joi.string().min(2).max(300).trim(),
    rate: Joi.number().min(0).max(5),
    product:Joi.string().hex().length(24) ,

})