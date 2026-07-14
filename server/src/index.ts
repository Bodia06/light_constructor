import http from 'node:http'
import app from './app'

const HOST = process.env.HOST || '0.0.0.0'
const PORT = Number(process.env.PORT) || 5001

const httpServer = http.createServer(app)

httpServer.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`)
})
