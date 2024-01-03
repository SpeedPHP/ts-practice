
class MainReflect {
    private age: number;

    getAge(): Number {
        return this.age;
    }
}

const mainReflect = new MainReflect();
console.log("获得Age值：", mainReflect.getAge());
