const express = require('express');
const router = express.Router();
const io = require('../io');
const moment = require('moment');
const sockets_by_id = {}


io.on('connection', function(socket){
  sockets_by_id[socket.id] = socket

  // console.log(socket)
  // Greeting
  // // socket.emit('Greetings', { msg: 'Welcome to chatrooms!!' });
  console.log( "Welcome", socket.handshake.address.split(':')[3], "!");

  socket.on('join', function(room){
    console.log('Joined room'); 
    socket.join(room);  
    io.to(room).emit('joined', socket.id);
    // socket.emit('lobby', sockets_by_id)
  });

  socket.on('leave', function(room){
    console.log(`${socket.id} left room`);
    socket.leave(room);
    io.to(room).emit('left', socket.id);
  })

  // Receive, modify, and send back msg
  socket.on('msg-sent', function(msg) {
    msg.ip = socket.handshake.address.split(':')[3];
    msg.timestamp = moment();
    io.to("TLM").emit("msg", msg);
  });

  // User disconnect
  socket.on('disconnect', function(){
    console.log( "Good bye", socket.handshake.address.split(':')[3], "disconnected");
  });

});



module.exports = router;