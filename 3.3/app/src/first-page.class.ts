import { log, component, getMapping } from "../../src/typespeed";

@component
export default class FirstPage {

    @getMapping("/first")
    public index(req: any, res: any) {
        log("FirstPage index running" + this.getTestFromFirstPage());
        res.send("FirstPage index running");
    }

    public getTestFromFirstPage() {
        return "getTestFromFirstPage";
    }
}