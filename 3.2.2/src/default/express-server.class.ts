import * as express from "express";
import ServerFactory from "../factory/server-factory.class";
import { bean, log } from "../speed";

export default class ExpressServer extends ServerFactory {
    // 提供Web服务对象
    @bean
    public getSever(): ServerFactory {
        return new ExpressServer();
    }
    // 设置中间件
    public setMiddleware(middleware: any) {
        this.middlewareList.push(middleware);
    }
    // 启动Web服务
    public start(port: number) {
        const app: express.Application = express();
        this.middlewareList.forEach(middleware => {
            app.use(middleware);
        });
        //TODO 3.2.2 演示路径适配
        // app.get('/', (req, res) => {
        //     res.send('Hello World!');
        // });
        app.listen(port, () => {
            log("server start at port: " + port);
        });
    }
}
