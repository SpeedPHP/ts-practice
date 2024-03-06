// TODO
// import "reflect-metadata";

// @atClass
// class SecondClass {}

// @atClassWithArg("First Object")
// export default class FirstClass {

//     @atProperty
//     private name: string;

//     @atPropertyWithArg(20)
//     private age: number;

//     @atAccessor
//     get newname(): string {
//         return this.name;
//     }

//     @atMethod
//     changeName(name: string): SecondClass {
//         this.name = name;
//         return new SecondClass();
//     }

//     @atMethodWithArg(1000)
//     change(
//         @atParameter name: string, 
//         @atParameter age: number): void {
//         this.age = age;
//         this.name = name;
//     }

//     getName(): string {
//         return this.name;
//     }
// }

// const obj = new FirstClass();

// console.log("FirstClass对象调用getName()取得装饰器赋值为", obj.getName());

// function atClass(target) {
//     console.log("类装饰器，类名是：", target.name);
// }

// function atClassWithArg(arg) {
//     return function(target) {
//         console.log("类装饰器，输入参数为：", arg, "类名是：", target.name);
//     }
// }

// function atMethod(target, propertyKey) {
//     const returnType = Reflect.getMetadata("design:returntype", target, propertyKey);
//     console.log("方法装饰器，类名", target, "方法是：", propertyKey, "方法返回值类型：", returnType);
// }

// function atMethodWithArg(arg) {
//     return function (target, propertyKey) {
//         const returnType = Reflect.getMetadata("design:returntype", target, propertyKey);
//         console.log("方法装饰器，输入参数：", arg, "类名", target, "方法是：", propertyKey, "方法返回值类型：", returnType);
//     }
// }

// function atProperty(target, propertyKey) {
//     const propertyType = Reflect.getMetadata("design:type", target, propertyKey);
//     console.log("变量装饰器，名称为：", propertyKey, "变量类型是：", propertyType);
// }

// function atPropertyWithArg(arg) {
//     return function (target, propertyKey) {
//         const propertyType = Reflect.getMetadata("design:type", target, propertyKey);
//         console.log("变量装饰器，输入参数：", arg, "名称为：", propertyKey, "变量类型是：", propertyType);
//     }
// }

// function atAccessor(target, propertyKey) {
//     const returnType = Reflect.getMetadata("design:type", target, propertyKey);
//     console.log("访问器装饰器，类名", target, "访问器是：", propertyKey, "访问器类型：", returnType);
// }

// function atParameter(target, propertyKey, parameterIndex) {
//     const paramType = Reflect.getMetadata("design:paramtypes", target, propertyKey);
//     console.log("参数装饰器，方法：",propertyKey, "参数位置:", parameterIndex, "参数类型：", paramType[parameterIndex]);
// }