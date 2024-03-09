import "reflect-metadata";

@atClassWithArg(1000)
class SecondClass{}

@atClass
export default class FirstClass{

  @atProperty
  private name:string;

  @atPropertyWithArg(10)
  private age:number;

  @atMethod
  changeName(name: string): SecondClass {
    this.name = name;
    return new SecondClass();
  }

  @atMethodWithArg(1000)
  change(
    name: string, // 0
    @atParameter age: number // 1
  ):void{

  }


}

// 参数装饰器
function atParameter(target, propertyKey, paramIndex) {
  const paramType = Reflect.getMetadata("design:paramtypes", target, propertyKey);
  console.log("参数列表", paramType);
  console.log("参数装饰器, 方法", propertyKey, "参数位置", paramIndex, "参数类型", paramType[paramIndex]);
}

// 方法装饰器
function atMethod(target, propertyKey) {
  const returnType = Reflect.getMetadata("design:returntype", target, propertyKey);
  console.log("方法装饰器", propertyKey, "类型：", returnType);
}

function atMethodWithArg(arg) {
  return (target, propertyKey) => {
    const returnType = Reflect.getMetadata("design:returntype", target, propertyKey);
    console.log("方法装饰器", propertyKey, "类型：", returnType, "参数是", arg);
  }
}

// 成员变量装饰器
function atProperty(target, propertyKey) {
  const propertyType = Reflect.getMetadata("design:type", target, propertyKey);
  console.log("变量装饰器：", propertyKey, " 类型：", propertyType);
}

// 带参数的成员变量装饰器
function atPropertyWithArg(arg) {
  return (target, propertyKey) => {
    const propertyType = Reflect.getMetadata("design:type", target, propertyKey);
    console.log("变量装饰器：", propertyKey, " 类型：", propertyType, "参数是：", arg);
  }
}

// 类装饰器
function atClass(target) {
  console.log("类装饰器，类名是："+target.name);
}

// 带参数的类装饰器
function atClassWithArg(arg) {
  return (target) => {
    console.log("类装饰器，类名是："+target.name, " 参数：" + arg);
  };
}