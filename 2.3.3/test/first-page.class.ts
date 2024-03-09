import { onClass, log, value } from "../src/speed";
import { GetMapping } from "../src/route-mapping.decorator";

@onClass
export default class FirstPage {

  @value("redis")
  redisConfig;

  @GetMapping("/test_config.html")
  index(req, res) {
    log(this.redisConfig);
    res.end("first Page");
  }
}