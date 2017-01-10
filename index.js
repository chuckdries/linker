var http = require('http');

var server = http.createServer(onRequest);

server.listen(8080);

function onRequest(request, response){
    console.log(request);
    response.writeHead(200, {"Content-Type":"text/plain"});
    response.write("Hello world!");
    response.end();
}

//test