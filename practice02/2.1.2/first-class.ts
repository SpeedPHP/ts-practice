import "reflect-metadata";

class SecondClass {}

export default class FirstClass {

    private name: string;

    private age: number;

    get newname(): string {
        return this.name;
    }

    changeName(name: string): SecondClass {
        this.name = name;
        return new SecondClass();
    }

    change(name: string, 
        age: number): void {
        this.age = age;
        this.name = name;
    }

    getName(): string {
        return this.name;
    }
}

const obj = new FirstClass();

console.log("FirstClass对象调用getName()取得装饰器赋值为", obj.getName());

