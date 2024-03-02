import Joi from "joi";

export const addOrderVal = Joi.object({
    id: Joi.string().hex().length(24).required(),
    shippingAddress: Joi.object({
        street:Joi.string().trim().required(),
        city:Joi.string().trim().required(),
        phone:Joi.string().trim().required(),
    }).required(),

})

export const paramsIdVal = Joi.object({
    id: Joi.string().hex().length(24).required()
})

export const updateQTYVal = Joi.object({
    id: Joi.string().hex().length(24).required(),
    quantity: Joi.number().required().integer().options({ convert: false })//if send string get error and tell user that

})
//halimEcommerce
//Halim1143 