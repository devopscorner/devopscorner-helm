import { Server as WebSocketServer } from 'ws';

// IMPORTANT: not a secure connection
const wss = new WebSocketServer({
    path: '/ws/',
    port: 40510,
});

wss.on('connection', function (ws) {
    console.log('connection!');
});

wss.on('close', function close() {
    console.log('ws disconnected');
});