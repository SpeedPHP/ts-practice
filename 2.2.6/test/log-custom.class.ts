import LogFactory from "../src/log-factory.class";
import { bean } from "../src/speed";
import * as tracer from "tracer";

export default class LogCustom extends LogFactory {

  @bean
  createCustomLog() : LogFactory {
    return new LogCustom();
  }

  private logger = tracer.console({
    format: "[{{title}}] {{timestamp}} {{file}}:{{line}} ({{method}}) {{message}}",
    dateformat: "yyyy-mm-dd HH:MM:ss",
    stackIndex: 2,
    preprocess: function (data) {
      data.title = data.title.toUpperCase();
    }
  });

  log(message) {
    this.logger.log(message);
  }
}