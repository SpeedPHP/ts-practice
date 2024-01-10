import * as express from "express";
import * as consolidate from "consolidate";
import ServerFactory from "../factory/server-factory.class";
import { setRouter } from "../route-mapping.decorator";
import { bean, log, value } from "../speed";

export default class ExpressServer extends ServerFactory {

    // TODO: 2.3.3
    // @value("view")
    // public view: string;

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
        // TODO: 2.3.3
        // const viewConfig = this.view;
        // this.app.engine(viewConfig["suffix"], consolidate[viewConfig["engine"]]);
        // this.app.set('view engine', viewConfig["suffix"]);
        // this.app.set('views', process.cwd() + viewConfig["path"]);

        setRouter(this.app);
    }
}
