import { log, onClass } from "../src/speed";
import { GetMapping } from "../src/route-mapping.decorator";

@onClass
export default class FirstPage {

  @GetMapping("/")
  public index(req, res) {
    res.render("index", {"title": "你好", "message": "我是模板引擎"})
  }

  @GetMapping("/mu")
  public mu(req, res) {
    res.render("index", {"name": "模板引擎"})
  }
}