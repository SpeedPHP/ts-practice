import { bean } from "../src/speed";
import LogFactory from "../src/log-factory.class";
import * as tracer from "tracer"

export default class CustomLog extends LogFactory {

  private logger = tracer.console({
      format: "[{{title}}] {{timestamp}} {{file}}:{{line}} ({{method}}) {{message}}",
      dateformat: "yyyy-mm-dd HH:MM:ss",
      stackIndex: 2,
      preprocess: function (data) {
          data.title = data.title.toUpperCase();
      }
  });

  @bean
  createLog(): LogFactory {
    return new CustomLog();
  }

  log(message?: any): void {
    this.logger.log(message);
  }
}