import {createServer} from "http";
import {createConnection} from 'mysql2';

// 页面接口类
interface Page{
  display(req, res);
}

// 查询用户页面
class User implements Page {
  display(req, res) {
    const conn = createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "test"
    });
    conn.query("select * from `user`", (err, results) => {
      console.log(err);
      res.end(JSON.stringify(results));
    })
  }
}

// 页面类
class First implements Page{
  display(req, res) {
    res.end("I am the First Page");
  }
}

// 第二个页面类
class Second implements Page{
  display(req, res) {
    res.end("I am the Second Page");
  }
}

// 默认页面类
class Root implements Page{
  display(req, res) {
    res.end("I am the Main Page");
  }
}

// 路由变量
const router = new Map<string, Page>();
router.set("/first", new First);
router.set("/second", new Second);
router.set("/user", new User);
router.set("/main", new Root);

createServer((req, res) => {
  let page = router.get(req.url == undefined ? "" : req.url);
  if(page == undefined) {
    page = new Root();
  }
  page.display(req, res);
}).listen(3000);