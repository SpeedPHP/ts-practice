import {GetMapping, PostMapping, RequestMapping} from "../src/route-mapping.decorator";


export default class FirstPage {

  @GetMapping("/")
  public index(req, res) {
    res.end("Hello World By First Page.");
  }


  @PostMapping("/post")
  public post(req, res) {
    res.end("About By First Page.");
  }

  @GetMapping("/about")
  public about(req, res) {
    res.end("About By First Page.");
  }

  @RequestMapping("/all-page.html")
  public indexPage(req, res) {
    res.end("Hello World By First Page.");
  }

  @RequestMapping("/all.html")
  public indexAll(req, res) {
    res.end("Hello World By First Page.");
  }
}