import express from 'express'
import { dbConnection } from './database/dbConnection.js'
import { bootstrap } from './src/modules/index.routes.js'
import dotenv from "dotenv"
import cors from 'cors'
import morgan from 'morgan'


dotenv.config()
const app = express()
const port = 3000
app.use(cors())
app.use(express.json())
app.use('uploads/',express.static('uploads'))

bootstrap(app)
dbConnection()
app.use(morgan('dev'))


app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))// get any port from wecsite i upload on it 