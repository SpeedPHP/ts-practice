
const routerMapper = {
  "get": {},
  "post": {},
  "all": {} // 所有类型的请求都可以
}

// 设置路由
function setRouter(app) {
  console.log(routerMapper);
  ["get", "post", "all"].forEach(method => {
    for(let url in routerMapper[method]) {
      app[method](url, routerMapper[method][url]);
    }
  });
}

function mapperFunction(method, url) {
  return (target, propertyKey) => {
    routerMapper[method][url] = target[propertyKey];
  }
}

const GetMapping = (url) => mapperFunction("get", url);
const PostMapping = (url) => mapperFunction("post", url);
const RequestMapping = (url) => mapperFunction("all", url);


export { PostMapping, RequestMapping, GetMapping, setRouter };