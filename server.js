const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: false
  }
});

const PORT = process.env.PORT || 3000;

// Permissive CORS middleware for cross-domain and file:// support
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

// Alias virtual directories to root & subfolders
app.use('/Scripts', express.static(__dirname));
app.use('/Styles', express.static(__dirname));
app.use('/Images', express.static(__dirname));
app.use('/Sounds', express.static(path.join(__dirname, 'Sounds')));
app.use('/Sounds', express.static(__dirname));
app.use('/Questions', express.static(path.join(__dirname, 'Questions')));
app.use('/Questions', express.static(__dirname));
app.use('/socket.io', express.static(path.join(__dirname, 'socket.io')));

// Route fallbacks for named HTML endpoints
const HTML_FILES = [
  'default', 'player', 'host', 'controller', 'control-panel',
  'videowall', 'floorvideowall', 'question-editor', 'variables-editor'
];

HTML_FILES.forEach((name) => {
  app.get(`/${name}`, (req, res) => {
    res.sendFile(path.join(__dirname, `${name}.html`));
  });
  app.get(`/${name}.html`, (req, res) => {
    res.sendFile(path.join(__dirname, `${name}.html`));
  });
});

app.get('/', (req, res) => {
  if (req.query.return_url) {
    res.sendFile(path.join(__dirname, 'index.html'));
  } else {
    res.sendFile(path.join(__dirname, 'default.html'));
  }
});

app.get('/index.html', (req, res) => {
  if (req.query.return_url) {
    res.sendFile(path.join(__dirname, 'index.html'));
  } else {
    res.sendFile(path.join(__dirname, 'default.html'));
  }
});

// Serve static files from root directory with default.html as primary index
app.use(express.static(__dirname, {
  index: ['default.html', 'index.html'],
  extensions: ['html', 'htm']
}));

// Socket.io real-time event synchronization with asymmetric encrypted packet relay
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  const forwardEvents = [
    'sharedKeyEvent',
    'levelChangeEvent',
    'hostInfoMessage',
    'ATA_RESULT',
    'FF_RESULT',
    'gameSync',
    'syncStorage',
    'questionSync',
    'revealAnswer'
  ];

  forwardEvents.forEach((evName) => {
    socket.on(evName, (data) => {
      socket.broadcast.emit(evName, data);
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});

