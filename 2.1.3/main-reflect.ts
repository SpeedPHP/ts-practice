import "reflect-metadata";

class MainReflect{
  
  @injectAge(20)
  private age: number;

  @returnType
  getAge(): number {
    return this.age;
  }
}

const mainReflect = new MainReflect();
console.log("取得Age的值", mainReflect.getAge());

function injectAge(arg) {
  return (target, propertyKey) => {
    Object.defineProperty(target, propertyKey, {
      get: () => {
        return arg;
      }
    });
  }
}

function returnType(target, propertyKey) {
  const rt = Reflect.getMetadata("design:returntype", target, propertyKey);
  console.log(target[propertyKey].name, "类型是", rt);
}