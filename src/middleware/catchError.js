import { AppError } from "../utils/AppError.js"

export const catchAsyncError = (fn) => {
	return (req, res, next) => {
		fn(req, res, next).catch(err=>{
            next(new AppError(err,500))
        })
    }
}