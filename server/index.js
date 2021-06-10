const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', socket => {
  // console.log('Bir kullanıcı bağlandı: ' + socket.id);
  socket.on('message', ({ name, message }) => {
    io.emit('message', { name, message })
  })
})

http.listen(4000, function() {
  console.log('4000 portu ayaklandırıldı.')
})
