const express = require('express');
const cors = require('cors');
const http = require('http');
const app = express();
const port = 8000;
require('./config/mongoose.config');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allUserRoutes = require('./routes/user.routes');
allUserRoutes(app);

const server = http.createServer(app);

// Importa el servidor WebSocket y configúralo
const setupWebSocketServer = require('./websocketServer');
setupWebSocketServer(server);

server.listen(port, () => {
  console.log("Server listening at port", port);
});