const http = require('http')
const path = require('path')
const socketIo = require('socket.io')
const express = require('express')
const config = require('dotenv').config()
const PORT = process.env.PORT || 3000
const lastCheckedBooks = require('./resources/last-checked-books.json')
console.log(__dirname)

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'))
})

app.get('/index.js', (req, res) => {
  res.set('Content-Type', 'application/javascript')
  res.sendFile(path.resolve(__dirname, '../client/index.js'))
})

io.on('connection', () => {
  console.log('Client connected...')
  sendData(io)
})

function sendData(socket) {
  lastCheckedBooks.books.map(book => {
    socket.emit('old_data', book)
  })
}

server.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
