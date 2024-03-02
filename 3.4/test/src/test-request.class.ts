import {getMapping, postMapping, req, component, reqQuery, log, res, reqBody} from "../../";

@component
export default class TestRequest{

  @getMapping("/request.req")
  testReq(@req req, res) {
    res.send("test req");
  }

  @getMapping("/request/query")
  testQuery(@res res, @reqQuery id) {
    log("id: " + id);
    res.send("test req");
  }

  @postMapping("/request/body")
  testBody(@res res, @reqBody body) {
    log("body: " + JSON.stringify(body));
    return "test body";
  }
}