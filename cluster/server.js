const http = require('node:http');
const cluster = require('node:cluster');
const numCPUs = require('node:os').availableParallelism();

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });

} else {

    const server = http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });

        res.end('Hello, World!\n');
    });

    server.listen(8000, () => {
        console.log(`Worker ${process.pid} started`);
    });

}
