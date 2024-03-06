import * as express from "express";
import * as consolidate from "consolidate";
import * as serveFavicon from "serve-favicon";
import * as compression from "compression";
import * as cookieParser from "cookie-parser";
import * as expressSession from "express-session";
import ServerFactory from "../factory/server-factory.class";
import { setRouter } from "../route-mapping.decorator";
import { bean, log, value } from "../speed";

export default class ExpressServer extends ServerFactory {

    @value("view")
    public view: string;

    // TODO
    // @value("static") // 静态资源的路径
    // private static: string;

    // @value("favicon") // 站点图标
    // private favicon: string;

    // @value("compression") // 压缩配置
    // private compression: object;

    // @value("cookie") // Cookie
    // private cookieConfig: object;

    // @value("session") // Session
    // private session: object;


    @bean
    public getSever(): ServerFactory {
        const server = new ExpressServer();
        server.app = express();
        return server;
    }

    public setMiddleware(middleware: any) {
        this.middlewareList.push(middleware);
    }

    public start(port: number) {
        this.middlewareList.forEach(middleware => {
            this.app.use(middleware);
        });
        this.setDefaultMiddleware();
        this.app.listen(port, () => {
            log("server start at port: " + port);
        });
    }

    private setDefaultMiddleware() {

        // TODO
        // 静态资源
        // if(this.static) {
        //     const staticPath = process.cwd() + this.static;
        //     this.app.use(express.static(staticPath)); // 设置中间件
        // }

        // if(this.favicon) {
        //     const faviconPath = process.cwd() + this.favicon;
        //     this.app.use(serveFavicon(faviconPath));
        // }

        // if(this.compression){
        //     this.app.use(compression(this.compression));
        // }

        // if(this.cookieConfig) {
        //     this.app.use(
        //         cookieParser(this.cookieConfig["secret"] || undefined, this.cookieConfig["options"] || {})
        //     );
        // }

        // if(this.session) {
        //     const sessionConfig = this.session;
        //     if(sessionConfig["trust proxy"] === 1){
        //         this.app.set("trust proxy", 1);
        //     }
        //     this.app.use(expressSession(sessionConfig));
        // }


        setRouter(this.app);
    }
}
