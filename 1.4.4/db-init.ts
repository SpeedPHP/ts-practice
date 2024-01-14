import {createServer} from "http";
import { createConnection } from "mysql2";

interface Page {
  display(req, res):void;
}

class User implements Page{
  display(req: any, res: any): void {
    const conn = createConnection({
      host: "localhost", 
      user: "root",
      password : "root",
      database: "test"
    });
    conn.query("select * from `user`", (err, results) => {
      console.log(err);
      res.end(JSON.stringify(results));
    })
  }
}

class Second implements Page{
  display(req: any, res: any): void {
    res.end("I am the Second Page");
  }
}

class First implements Page {
  display(req: any, res: any): void {
    res.end("I am the First Page")
  }
}

class Root implements Page{
  display(req: any, res: any): void {
    res.end("I am the Main page")
  }
}

const router = new Map<string, Page>();
router.set("/first", new First());
router.set("/second", new Second());
router.set("/user", new User());
router.set("/main", new Root());
createServer((req, res) => {
  let page = router.get(req.url === undefined ? "" : req.url);
  if(page === undefined) {
    page = new Root();
  }
  page.display(req, res);
}).listen(3000);