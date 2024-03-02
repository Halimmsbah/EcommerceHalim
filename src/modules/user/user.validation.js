import Joi from "joi";

export const addUserVal= Joi.object({
    name: Joi.string().min(2).max(30).required(),
	email: Joi.string().email().required(),
	password: Joi.string().pattern(/^[A-Z][a-z0-9A-Z]{8,}$/).required(),
	rePassword: Joi.valid(Joi.ref('password')).required(),
	age: Joi.number().integer().min(10).max(80).required(),
	role:Joi.string().valid('user','admin')


})

export const paramsIdVal= Joi.object({
    id:Joi.string().hex().length(24).required()
})

export const updateUserVal= Joi.object({
    id:Joi.string().hex().length(24).required(),
    name: Joi.string().min(2).max(30),
	email: Joi.string().email(),
	password: Joi.string().pattern(/^[A-Z][a-z0-9A-Z]{8,}$/),
	rePassword: Joi.valid(Joi.ref('password')),
	age: Joi.number().integer().min(10).max(80),
    role:Joi.string().valid('user','admin')
})