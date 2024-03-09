import * as express from "express";
import ServerFactory from "../factory/server-factory.class";
import { bean } from "../speed";

export default class ExpressServer extends ServerFactory {

  @bean
  public getServer(): ServerFactory {
    return new ExpressServer();
  }

  public setMiddleware(middleware) {
    this.middleware.push(middleware);
  }

  public start(port) {
    const app = express();

    app.get("/", (req, res) => {
      res.send("Hello World!");
    });
    
    app.listen(port, () => {
      console.log("Server start at port:", port);
    });
  }
}