import { log, component, getMapping, reqQuery, res } from "../../src/typespeed";

@component
export default class FirstPage {

    @getMapping("/index.html")
    public index(@reqQuery id, @res res) {
      log(id);
      res.send("Hello World!");
    }
}