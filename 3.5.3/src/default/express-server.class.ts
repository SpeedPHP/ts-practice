import * as express from "express";
import * as consolidate from "consolidate";
import ServerFactory from "../factory/server-factory.class";
import { setRouter } from "../route-mapping.decorator";
import { bean, log } from "../speed";

export default class ExpressServer extends ServerFactory {
    // 提供Web服务对象
    @bean
    public getSever(): ServerFactory {
        const server = new ExpressServer();
        server.app = express();
        return server;
    }

    // 设置中间件
    public setMiddleware(middleware: any) {
        this.middlewareList.push(middleware);
    }

    // 启动服务
    public start(port: number) {
        this.middlewareList.forEach(middleware => {
            this.app.use(middleware);
        });
        this.setDefaultMiddleware();
        this.app.listen(port, () => {
            log("server start at port: " + port);
        });
    }

    // 设置默认中间件
    private setDefaultMiddleware() {
        // 模板配置
        // TODO 3.5.3
        // const viewConfig = {
        //     "engine": "mustache",
        //     "path": "/test/views",
        //     "suffix": "html"
        // };
        // this.app.engine(viewConfig["suffix"], consolidate[viewConfig["engine"]]);
        // this.app.set('view engine', viewConfig["suffix"]);
        // this.app.set('views', process.cwd() + viewConfig["path"]);

        setRouter(this.app);
    }
    // TODO 3.5.3
    // public start(port: number) {
    //     const app: express.Application = express();
    //     this.middlewareList.forEach(middleware => {
    //         app.use(middleware);
    //     });
    //     setRouter(app);
    //     // 使用 fs 库
    //     const fs = require('fs')
    //     // 配置模板引擎
    //     app.engine('ntl', (filePath, options, callback) => {
    //         // 通过 fs 读取模板文件
    //         fs.readFile(filePath, (err, content) => {
    //             if (err) return callback(err)
    //             // 进行简单的替换操作
    //             const rendered = content.toString()
    //                 .replace('#title#', `<title>${options["title"]}</title>`)
    //                 .replace('#message#', `<h1>${options["message"]}</h1>`)
    //             return callback(null, rendered)

    //         })
    //     })
    //     // 配置模板目录和模板文件后缀
    //     app.set('views', './test') // specify the views directory
    //     app.set('view engine', 'ntl') // register the template engine
    //     app.listen(port, () => {
    //         log("server start at port: " + port);
    //     });
    // }
}
