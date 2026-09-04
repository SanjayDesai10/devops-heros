const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hello World</title>
    <style>
        body {
            background-color: #121417;
            color: #ffffff;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            padding-top: 15px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            margin: 0;
            height: 100vh;
        }
        h1 {
            font-size: 32px;
            font-weight: 400;
        }
    </style>
</head>
<body>
    <h1>Hello World</h1>
</body>
</html>`);
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
