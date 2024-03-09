import {createServer} from "http";

createServer((req, res) => {
  if(req.url == "/first"){
    res.end("I am the first Page");
  }else{
    res.end("Hello World");
  }
}).listen(3000);