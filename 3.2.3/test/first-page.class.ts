import { GetMapping, RequestMapping } from "../src/route-mapping.decorator";

export default class FirstPage {

  @GetMapping("/first")
  public index(req, res) {
    res.send("Hello World by First Page");
  }

  @RequestMapping("/myPost")
  public mypost(req, res) {
    res.send("Hello World by POST");
  }

  @GetMapping("/page-:id.html")
  public page(req, res) {
    console.log(req.params["id"]);
    res.send("Hello World by POST");
  }
}