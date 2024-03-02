import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { catchAsyncError } from '../../middleware/catchError.js'
import { userModel } from '../../../database/models/user.model.js'
import { AppError } from '../../utils/AppError.js'


export const signup = async (req, res) => {
	let user = new userModel(req.body)
	await user.save()
	let token = jwt.sign({ userId:user._id , role:user.role }, process.env.JWT_KEY)
	res.json({ message: 'Signed up successfully',token })
}

export const signin = catchAsyncError(async (req, res,next) => {
	let user = await userModel.findOne({ email:req.body.email })
	if (user && bcrypt.compareSync(req.body.password, user.password)){
		let token = jwt.sign({ userId:user._id , role:user.role }, process.env.JWT_KEY)
		res.json({ message: 'Signed in successfully',token })
	}
	next(new AppError('Invalid credentials', 408))
})


export const protectedRoutes = catchAsyncError(async (req, res,next) => {
	let{token}=req.headers

	//1- token exist or not
	if(!token) return next(new AppError('token not exist',401))

	//2- verify token
	let decoded= jwt.verify(token,process.env.JWT_KEY)
	console.log(decoded)

	//3-userId -> exist or not
	let user=  await userModel.findById(decoded.userId)
	if(!user) return next(new AppError('user not found',401))

	if(user.passwordChanghedAt){
		let time=parseInt(user?.passwordChanghedAt.getTime()/1000)
		console.log( time + '|' + decoded.iat)
		if(time>decoded.iat) return next(new AppError('invaild token...login again',404))
	}

	req.user=user

	next()
})

export const changePassword = catchAsyncError(async (req, res,next) => {
	let user = await userModel.findById( req.user._id )
	if (user && bcrypt.compareSync(req.body.password, user.password)){
		let token = jwt.sign({ userId:user._id , role:user.role }, process.env.JWT_KEY)
		await userModel.findByIdAndUpdate(req.params.id,{password:req.body.newPassword,passwordChanghedAt:Date.now()})
		res.json({ message: 'Signed in successfully',token })
	}
	next(new AppError('Invalid credentials', 408	))
})

export const allowedTo =(...roles)=>{
	return catchAsyncError(async (req, res,next) => {
		if(!roles.includes(req.user.role))
		return next(new AppError('you are not authorized', 401	))
	next()
	})
}