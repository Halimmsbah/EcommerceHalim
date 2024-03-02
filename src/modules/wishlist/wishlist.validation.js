import Joi from "joi";

export const addWishlistVal= Joi.object({
    product:Joi.string().hex().length(24).required(),
})

export const paramsIdVal= Joi.object({
    id:Joi.string().hex().length(24).required()
})

export const updateWishlistVal= Joi.object({
    product:Joi.string().hex().length(24) ,
})