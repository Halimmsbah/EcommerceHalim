import Joi from "joi";

export const addSubCategoryVal= Joi.object({
    name: Joi.string().min(2).max(300).required().trim(),
    category:Joi.string().hex().length(24).required()

})

export const paramsIdVal= Joi.object({
    id:Joi.string().hex().length(24).required()
})

export const updateSubCategoryVal= Joi.object({
    name: Joi.string().min(2).max(300).trim(),
    id:Joi.string().hex().length(24).required(),
    category:Joi.string().hex().length(24)

})