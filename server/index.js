import app from './src/app.js'
import http from 'http'

const server = http.createServer(app)

const PORT = 5000
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`) // eslint-disable-line no-console
})
