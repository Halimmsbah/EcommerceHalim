import Joi from "joi";

export const addAddressVal= Joi.object({
    street:Joi.string().required().trim(),
    phone:Joi.string().required().trim(),
    city:Joi.string().required().trim(),

})

export const paramsIdVal= Joi.object({
    id:Joi.string().hex().length(24).required()
})

export const updateAddressVal= Joi.object({
    id :Joi.string().hex().length(24).required(),
    street:Joi.string().trim(),
    phone:Joi.string().trim(),
    city:Joi.string().trim(),
})