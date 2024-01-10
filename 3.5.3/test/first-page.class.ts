import { log, onClass } from "../src/speed";
import { GetMapping } from "../src/route-mapping.decorator";

@onClass
export default class FirstPage {



    @GetMapping("/first/renderTest")
    public renderTest(req: any, res: any) {
        res.render("index", {name:"zzz"});
    }

}