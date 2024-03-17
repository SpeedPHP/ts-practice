import { expect } from "chai";

function sayHello(name: string) {
    return "Hello " + name + "!";
}

// 测试集
describe("Test Demo!", () => {
    before(() => {
        
    })

    // 单个测试
    it("Should return 'Hello World!'", () => {
        expect(sayHello("World")).to.equal("Hello World!");
    });
});