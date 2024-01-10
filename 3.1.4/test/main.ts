//import ServerFactory from "../src/factory/server-factory.class";
import { app, log, autoware } from "../src/speed";


@app
class Main {

    // TODO: 3.1.4
    // @autoware
    // public server : ServerFactory;

    public main(){
        //this.server.start(8080);
        log('start application');
    }
}