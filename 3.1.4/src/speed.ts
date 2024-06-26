import "reflect-metadata";
import * as walkSync from "walk-sync";
import BeanFactory from "./bean-factory.class";
import LogFactory from "./factory/log-factory.class";

function app<T extends { new(...args: any[]): {} }>(constructor: T) {
    const srcDir = process.cwd() + "/src";
    const srcFiles = walkSync(srcDir, { globs: ['**/*.ts'] });

    const testDir = process.cwd() + "/test";
    const testFiles = walkSync(testDir, { globs: ['**/*.ts'] });
    (async function () {
        try {
            // 载入框架的TS文件，执行其中装饰器
            for (let p of srcFiles) {
                let moduleName = p.replace(".d.ts", "").replace(".ts", "");
                await import(srcDir + "/" + moduleName);
            }
            // 载入开发者的TS文件，执行装饰器并覆盖
            for (let p of testFiles) {
                let moduleName = p.replace(".d.ts", "").replace(".ts", "");
                await import(testDir + "/" + moduleName);
            }
        } catch (err) {
            console.error(err);
        }
        const main = new constructor();
        main["main"]();
    }());
}

function onClass<T extends { new(...args: any[]): {} }>(constructor: T) {
    log("decorator onClass: " + constructor.name);
    return class extends constructor {
        constructor(...args: any[]) {
            super(...args);
            //console.log("this.name");
        }
    };
}

function bean(target: any, propertyName: string, descriptor: PropertyDescriptor) {
    let returnType = Reflect.getMetadata("design:returntype", target, propertyName);
    log("decorator bean, the return Type is: " + returnType.name);
    BeanFactory.putBean(returnType, target[propertyName]);
}

function autoware(target: any, propertyName: string): void {
    let type = Reflect.getMetadata("design:type", target, propertyName);
    Object.defineProperty(target, propertyName, {
      get: function myProperty() {
        const beanObject = BeanFactory.getBean(type);
        return beanObject()
      }
    });
}

function inject(): any {
    console.log("decorator inject, outside the return.");
    return (target: any, propertyKey: string) => {
        console.log("decorator inject, in the return, propertyKey: " + propertyKey);
        let type = Reflect.getMetadata("design:type", target, propertyKey);
        console.log("decorator inject, in the return, type.name: " + type.name);
        return {
            get: function () {
                return "decorator inject, in the return get function";
            }
        };
    }
}

function log(message?: any, ...optionalParams: any[]) {
    const logBean = BeanFactory.getBean(LogFactory);
    if (logBean) {
        const logObject = logBean();
        logObject.log(message, ...optionalParams);
    } else {
        console.log(message, ...optionalParams);
    }
}

export { onClass, bean, autoware, inject, log, app };