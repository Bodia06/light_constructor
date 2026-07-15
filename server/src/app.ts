import express from 'express'
import cors from 'cors'
import router from './routers'
import { errorHandlers } from './middlewares'

const app = express()

const corsOptions = { origin: '*' }

app.use(cors(corsOptions))

app.use(express.json())

app.use('/api', router)

app.use(errorHandlers.errorHandler)

export default app
