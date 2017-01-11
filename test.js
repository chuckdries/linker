var http = require('http');

var server = http.createServer(resHand);

server.listen(8000);

function resHand(request, response){
    console.log(request.headers.host);
    console.log(request.url);
    response.write("hello");
    response.end();
}


function add(num1, num2){
    return num1 + num2;
}

console.log(add(3, 2));