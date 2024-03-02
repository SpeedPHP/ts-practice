import { log, before, after } from "../../src/typespeed"
import FirstPage from './first-page.class'

export default class AopTest {

    @before(FirstPage, "index")
    public FirstIndex() {
        log("AopTest - FirstIndex")
        return "FirstIndex";
    }

    @after(FirstPage, "index")
    public FirstLast() {
        log("AopTest - FirstLast")
        return "FirstIndex";
    }
}