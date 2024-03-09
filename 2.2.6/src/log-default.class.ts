import LogFactory from "./log-factory.class";
import { bean } from "./speed";

export default class LogDefault extends LogFactory {

  @bean
  createDefaultLog(): LogFactory {
    return new LogDefault();
  }

  log(message) {
    console.log(message);
  }
}