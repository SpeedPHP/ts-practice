// TODO
// import * as express from "express";
// import ServerFactory from "../factory/server-factory.class";
// import {bean} from "../speed";


// export default class ExpressServer extends ServerFactory{

//   @bean
//   public getServer(): ServerFactory {
//     return new ExpressServer();
//   }

//   public setMiddleware(middleware: any) {
//     this.middleware.push(middleware);
//   }
//   public start(port: any) {
//     const app: express.Application = express();

//     app.get("/", (req, res, next) => {
//       res.send("Hello World!");
//     })
    
//     app.listen(port, () => {
//       console.log("Server start at port: " + port);
//     })

//   }
// }