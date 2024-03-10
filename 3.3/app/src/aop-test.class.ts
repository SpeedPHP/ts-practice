import {log, before} from "../../src/typespeed";
import FirstPage from "./first-page.class";

export default class AopTest{

  @before(FirstPage, "index")
  FirstIndex() {
    log("AopTest - FirstIndex");
    return "FirstIndex";
  }
}