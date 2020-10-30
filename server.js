const express = require('express')
const path = require('path')

const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')

const socketIo = io(server)

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use('', (request, response) => {
  response.render('index.html')
})

let chat = []

socketIo.on('connection', socket => {
  socket.emit('previousMessages', chat)
  
  socket.on('sendMessage', data => {
    chat.push(data)
    socket.broadcast.emit('receivedMessage', data)
  })
})

server.listen(3000)