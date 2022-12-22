import app from './src/app.js'
import http from 'http'
import configs from './src/configs.js'

const server = http.createServer(app)

server.listen(configs.port, () => {
  console.log(`Server running on port ${configs.port}`) // eslint-disable-line no-console
})
