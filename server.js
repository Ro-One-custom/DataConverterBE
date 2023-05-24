const http = require('http')
const app = require('./app')

const port = process.env.port || 1827

const server =http.createServer(app)

server.listen(port)

console.log("server is running on port " + port)