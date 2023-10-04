const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); 

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3001;
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());

//Middleware - Routes
app.get('/api', (req, res) => {
  res.json('Hello from the server!');
});

app.get('/', (req, res) => {
  res.send('Welcome to the Socket.io server!');
});


//Socket.io
io.on('connection', (socket) => {
  console.log('A user has connected');
  console.log(socket)

  socket.on('chat message', (msg) => {
    console.log(`Received message: ${msg}`);
    io.emit('chat message', msg);
  })

  socket.on('disconnect', () => {
    console.log('User has disconnected');

  })
})



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});