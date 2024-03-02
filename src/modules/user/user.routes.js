import { validation } from "../../middleware/validation.js";
import { addUser, deleteUser, getAllUser, getSingleUser, updateUser } from "./user.controller.js";
import express from 'express'
import { addUserVal, paramsIdVal, updateUserVal } from "./user.validation.js";
import { checkEmail } from "../../middleware/emailExist.js";

const userRouter=express.Router()//كدا الاتنين هيبقوا شايفين الاي دي اللي بينهم

userRouter
.route('/')
.post(validation(addUserVal),checkEmail,addUser)//
.get(getAllUser)

userRouter
.route('/:id')
.get(validation(paramsIdVal),getSingleUser)
.put(validation(updateUserVal),updateUser)
.delete(validation(paramsIdVal),deleteUser)

export default userRouter