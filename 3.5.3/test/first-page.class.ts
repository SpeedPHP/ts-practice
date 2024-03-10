
import { log, onClass } from "../src/speed";
import { GetMapping } from "../src/route-mapping.decorator";

@onClass
export default class FirstPage {

  @GetMapping("/")
  public index(req, res) {
    res.render("index", {
      "name": "Mustache 模板引擎"
    });
  }
}