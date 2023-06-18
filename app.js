//app.js
const express = require('express');
const app = express();
const server = require('http').Server(app);

//Socket.io
const io = require('socket.io')(server);
//We'll store our online users here
let onlineUsers = {};
let channels = {"General" : []};
io.on("connection", (socket) => {
  // Make sure to send the users to our chat file
  require('./sockets/chat.js')(io, socket, onlineUsers, channels);
})

//Handlebars
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// use public folder
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.render('index.handlebars');
})

server.listen('3000', () => {
  console.log('Server listening on Port 3000');
})
