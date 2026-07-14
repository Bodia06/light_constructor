import express from 'express'
import cors from 'cors'
import router from './routers'

const app = express()

const corsOptions = { origin: '*' }

app.use(cors(corsOptions))

app.use(express.json())

app.use('/api', router)

export default app
