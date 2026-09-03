const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3000;

// Alias virtual directories to root & subfolders
app.use('/Scripts', express.static(__dirname));
app.use('/Styles', express.static(__dirname));
app.use('/Images', express.static(__dirname));
app.use('/Sounds', express.static(path.join(__dirname, 'Sounds')));
app.use('/Sounds', express.static(__dirname));
app.use('/Questions', express.static(__dirname));

// Serve static files from root directory with default.html as index
app.use(express.static(__dirname, { index: 'default.html' }));

// Route fallback
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'default.html'));
});

// Socket.io real-time event synchronization
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('sharedKeyEvent', (data) => {
    socket.broadcast.emit('sharedKeyEvent', data);
  });

  socket.on('levelChangeEvent', (data) => {
    socket.broadcast.emit('levelChangeEvent', data);
  });

  socket.on('hostInfoMessage', (data) => {
    socket.broadcast.emit('hostInfoMessage', data);
  });

  socket.on('ATA_RESULT', (data) => {
    socket.broadcast.emit('ATA_RESULT', data);
  });

  socket.on('FF_RESULT', (data) => {
    socket.broadcast.emit('FF_RESULT', data);
  });

  socket.on('gameSync', (data) => {
    socket.broadcast.emit('gameSync', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});

