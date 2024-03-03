import { log, onClass } from "../src/speed";
import { GetMapping } from "../src/route-mapping.decorator";

@onClass
export default class FirstPage {

    @GetMapping("/")
    public index(req: any, res: any) {
        res.send("FirstPage index running");
    }

    @GetMapping("/error") // 500 错误
    testError(req, res) {
        throw new Error("Test Error");
    }

}