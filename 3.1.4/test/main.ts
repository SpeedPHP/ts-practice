import ServerFactory from "../src/factory/server-factory.class";
import { app, log, autoware } from "../src/speed";


@app
class Main {

    @autoware // 依赖注入
    server: ServerFactory;

    public main(){
        this.server.start(8080);
        log('start application');
    }
}