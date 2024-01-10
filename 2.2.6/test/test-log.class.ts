import { onClass } from "../src/speed";

@onClass
export default class TestLog {

    constructor() {
        console.log("TestLog constructor");
    }
}