import Joi from "joi";

export const addBrandVal= Joi.object({
    name: Joi.string().min(2).max(300).required().trim(),
    image:Joi.object({
        fieldname:Joi.string().required(),
        originalname:Joi.string().required(),
        encoding:Joi.string().required(),
        mimetype:Joi.string().valid('image/jpeg','image/png').required(),
        size:Joi.number().max(5555555).required(),
        destination:Joi.string().required(),
        filename:Joi.string().required(),
        path:Joi.string().required(),
    }).required()
})

export const paramsIdVal= Joi.object({
    id:Joi.string().hex().length(24).required()
})

export const updateBrandVal= Joi.object({
    name: Joi.string().min(2).max(300).trim(),
    id:Joi.string().hex().length(24).required(),
    image:Joi.object({
        fieldname:Joi.string().required(),
        originalname:Joi.string().required(),
        encoding:Joi.string().required(),
        mimetype:Joi.string().valid('image/jpeg','image/png').required(),
        size:Joi.number().max(5555555).required(),
        destination:Joi.string().required(),
        filename:Joi.string().required(),
        path:Joi.string().required(),
    })
    
})