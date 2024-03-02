
const routerMapper = {
  "get": {},
  "post": {},
  "all": {}
}

function setRouter(app) {
  for(let url in routerMapper["get"]){
    app.get(url, routerMapper["get"][url]);
  }
  for(let url in routerMapper["post"]){
    app.post(url, routerMapper["post"][url]);
  }
  for(let url in routerMapper["all"]){
    app.all(url, routerMapper["all"][url]);
  }
}

function GetMapping(url) {
  return function(target, propertyKey) {
    routerMapper["get"][url] = target[propertyKey]
  }
}

function PostMapping(url) {
  return function(target, propertyKey) {
    routerMapper["post"][url] = target[propertyKey]
  }
}

function RequestMapping(url) {
  return function(target, propertyKey) {
    routerMapper["all"][url] = target[propertyKey]
  }
}

export {GetMapping, setRouter, PostMapping, RequestMapping}