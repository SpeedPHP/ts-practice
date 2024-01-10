import { log, onClass } from "../src/speed";
import { GetMapping } from "../src/route-mapping.decorator";

@onClass
export default class FirstPage {

    @GetMapping("/first")
    public index(req: any, res: any) {
        res.send("FirstPage index running");
    }

    // TODO: 3.9
    // @GetMapping("/second/testError")
    // testError(req, res) {
    //     throw new Error('Test Error');
    // }

}