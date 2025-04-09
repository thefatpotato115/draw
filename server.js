const WebSocket = require('ws');
const port = process.env.PORT || 3001;
const wss = new WebSocket.Server({ port });

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    try {
      const parsed = JSON.parse(data);
      const jsonString = JSON.stringify(parsed);
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(jsonString);
        }
      });
    } catch (e) {
      console.error('Invalid JSON:', data);
    }
  });
});

console.log(`WebSocket server running on port ${port}`);