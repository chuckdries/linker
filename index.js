var http = require('http');
var url = require('url');
var password = require('./password');

var server = http.createServer(onRequest);

server.listen(8080);

var payload = {
    "content":"http://chuckdries.rocks",
    "type":"url"
}

function onRequest(request, response){
    var pathname = url.parse(request.url).pathname;
    console.log("request for " + pathname + " via method " + request.method);
    
    if(request.method == "GET"){
        if(payload.type == "url"){
            response.writeHead(200, {"Content-Type":"text/html"});
            response.write(getHTML(payload.content));
        } else {
            response.writeHead(200, { "Content-Type": "text/plain" });
            response.write(payload.content);
        }
        response.end();
    } else if (request.method == "POST"){
        var body = "";
        request.on('data', function(data) {
            body += data;
        });
        request.on('end', function(){
            body = JSON.parse(body);
            if(body.password == password){
                payload = body;
                console.log(payload);
                response.writeHead(202, { "Content-Type": "text/plain " });
                response.write("we recieved the payload " + payload);
                response.end();
            } else {
                console.log("incorrect password");
                response.writeHead(403, { "Content-Type": "text/plain " });
                response.write("Your payload contained the wrong password");
                response.end();
            }

});
    } else {
        response.writeHead(405, { "Content-Type": "text/plain " });
        response.write("invalid http verb");
        response.end();
    }
}



function getHTML(url){
    return "<html><head></head><body>Please wait<script>window.location=\"" + url + "\";</script></body></html>";
}