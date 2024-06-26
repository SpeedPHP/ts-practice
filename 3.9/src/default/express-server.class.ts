import * as express from "express";
import * as consolidate from "consolidate";
import * as serveFavicon from "serve-favicon";
import * as compression from "compression";
import * as cookieParser from "cookie-parser";
import * as expressSession from "express-session";
import ServerFactory from "../factory/server-factory.class";
import { setRouter } from "../route-mapping.decorator";
import { bean, log, value, error } from "../speed";

export default class ExpressServer extends ServerFactory {

    @value("view")
    public view: string;

    @value("static")
    private static: string;

    @value("favicon")
    private favicon: string;

    @value("compression")
    private compression: object;

    @value("cookie")
    private cookieConfig: object;

    @value("session")
    private session: object;

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
        log(this.middlewareList);
        this.middlewareList.forEach(middleware => {
            this.app.use(middleware);
        });
        this.setDefaultMiddleware();
        this.app.listen(port, () => {
            log("server start at port: " + port);
        });
    }

    private setDefaultMiddleware() {
        if (this.view) {
            const viewConfig = this.view;
            this.app.engine(viewConfig["suffix"], consolidate[viewConfig["engine"]]);
            this.app.set('view engine', viewConfig["suffix"]);
            this.app.set('views', process.cwd() + viewConfig["path"]);
        }

        if (this.static) {
            const staticPath = process.cwd() + this.static;
            this.app.use(express.static(staticPath))
        }

        if (this.favicon) {
            const faviconPath = process.cwd() + this.favicon;
            this.app.use(serveFavicon(faviconPath));
        }

        if (this.compression) {
            this.app.use(compression(this.compression));
        }

        this.app.use(cookieParser(this.cookieConfig["secret"] || undefined, this.cookieConfig["options"] || {}));

        // 设置路由页面
        setRouter(this.app);

        // 404 找不到路由页面
        this.app.use((req, res, next) => {
            res.status(404);
            if(req.accepts("html")) {
                res.render(process.cwd() + "/static/error-page/404.html");
            }else if(req.accepts("json")) {
                res.json({error: "Not Found"});
            }else{
                res.type("txt").send("Not Found");
            }
        });

        // 500 系统错误
        this.app.use((err, req, res, next) => {
            if(!err) {
                next();
            }
            res.status(err.status || 500);
            if(req.accepts("html")) {
                res.render(process.cwd() + "/static/error-page/500.html");
            }else if(req.accepts("json")) {
                res.json({error: "Server Error"});
            }else{
                res.type("txt").send("Server Error");
            }
        });
    }
}
