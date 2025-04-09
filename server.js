const WebSocket = require('ws');
const port = process.env.PORT || 3001;
const wss = new WebSocket.Server({ port });

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});

console.log(`WebSocket server running on port ${port}`);