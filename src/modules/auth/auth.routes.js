import  express  from 'express'
import { validation } from '../../middleware/validation.js'
import { changePasswordVal, signinVal, signupVal } from './auth.validation.js'
import { changePassword, protectedRoutes, signin, signup } from './auth.controller.js'
import { checkEmail } from '../../middleware/emailExist.js'

const authRouter = express.Router()

authRouter.post('/signup',  validation(signupVal),checkEmail,signup)
authRouter.post('/signin', validation(signinVal), signin)
authRouter.patch('/changePassword/',protectedRoutes, validation(changePasswordVal), changePassword)


export default authRouter
