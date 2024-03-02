import Joi from 'joi'

export const signupVal = Joi.object({
	name: Joi.string().min(2).max(30).required(),
	email: Joi.string().email().required(),
	password: Joi.string().pattern(/^[A-Z][a-z0-9A-Z]{8,}$/).required(),
	rePassword: Joi.valid(Joi.ref('password')).required(),
})

export const signinVal = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().pattern(/^[A-Z][a-z0-9A-Z]{8,}$/).required(),
})

export const changePasswordVal = Joi.object({
	password: Joi.string().required(),
	newPassword: Joi.string().required(),
})


