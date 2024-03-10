import { GetMapping } from "../src/route-mapping.decorator";
import {onClass} from "../src/speed";

@onClass
export default class SecondPage {

  @GetMapping("/compression.html")
  testCompression(req, res) {
    const result = Array(1026).join('a').slice(0, -1);
    return result;
  }

  @GetMapping("/set_cookie.html")
  setCookiePage(req, res) {
    res.cookie("Hello", "World");
    return "set cookie";
  }

  @GetMapping("/get_cookie.html")
  getCookiePage(req, res) {
    return "get cookie: " + req.cookies.Hello;
  }

  @GetMapping("/session.html")
  testSession(req, res) {
    req.session.counter = req.session.counter ? req.session.counter + 1 : 1;
    return "Counter Now is :" + req.session.counter;
  }
}