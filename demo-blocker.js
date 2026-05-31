import net from 'net';

const PORT = 5000;
const server = net.createServer((socket) => {
    socket.write('Blocked.\r\n');
    socket.pipe(socket);
});

server.listen(PORT, '127.0.0.1', () => {
    console.log(`[BLOCKER] Demo Blocker actively listening on port ${PORT}...`);
    console.log(`[BLOCKER] This will intentionally cause an EADDRINUSE error for demo-app.`);
});
