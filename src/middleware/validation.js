import { AppError } from "../utils/AppError.js"

export const validation = (schema) => {
	return (req, res, next) => {
		let filter={}
		if(req.file) {
			filter={image:req.file,...req.body,...req.params,...req.query}
		} else if(req.files) {
			filter={...req.files,...req.body,...req.params,...req.query}
		} else {
			filter={...req.body,...req.params,...req.query}
		}
		//لو فيه صوره امين مفيش خلاص تبقي فاضي
		const { error } = schema.validate(filter,{abortEarly:false})
		if (error) {
			throw new AppError( 
				error.details.map((d) => d.message),
				400
			)
		}
		next()
	}
}
