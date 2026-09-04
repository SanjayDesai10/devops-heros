const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>Hello World from Docker Multi-Stage Build!</h1>');
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
