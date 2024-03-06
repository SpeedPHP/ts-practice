// TODO
// import "reflect-metadata"

// class MainReflect {
//     @injectAge(18)
//     private age: number;

//     @returnType
//     getAge(): Number {
//         return this.age;
//     }
// }

// const mainReflect = new MainReflect();
// console.log("获得Age值：", mainReflect.getAge());

// function injectAge(arg) {
//     return function (target, propertyKey) {
//         Object.defineProperty(target, propertyKey, {
//             get: () => {
//                 return arg;
//             }
//         })
//     }
// }

// function returnType(target, propertyKey) {
//     const rt = Reflect.getMetadata("design:returntype", target, propertyKey);
//     console.log(target[propertyKey].name, "返回值类型是：", rt.name);
// }