 /*BASICS*/
import dotenv from 'dotenv'
import Router from './routes/route'
dotenv.config()
import express, {Express} from 'express'
let cors = require('cors')
require('./config/database')

const App:Express = express()
const PORT = process.env.PORT

/*MIDDLEWARES*/
App.use(cors())
App.use(express.json())
App.use('/api', Router)


App.listen(PORT, () => {
        console.log('Server ready on PORT ' + PORT)
})   
