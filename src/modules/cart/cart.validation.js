import Joi from "joi";

export const addCartVal= Joi.object({
    product:Joi.string().hex().length(24).required(),
    quantity:Joi.number().integer().options({convert:false})//if send string get error and tell user that

})

export const paramsIdVal= Joi.object({
    id:Joi.string().hex().length(24).required()
})

export const updateQTYVal= Joi.object({
    id :Joi.string().hex().length(24).required(),
    quantity:Joi.number().required().integer().options({convert:false})//if send string get error and tell user that

})