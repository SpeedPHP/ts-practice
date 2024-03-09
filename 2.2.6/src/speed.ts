import "reflect-metadata";
import BeanFactory from "./bean-factory.class";
import LogFactory from "./log-factory.class";

function bean(target, propertyKey) {
  const returnType = Reflect.getMetadata("design:returntype", target, propertyKey);
  // 存入对象
  BeanFactory.putBean(returnType, target[propertyKey]);
}

function log(message) {
  const logBean = BeanFactory.getBean(LogFactory);
  if(logBean) {
    const logObject = logBean();
    logObject.log(message);
  }else{
    console.log(message);
  }
}

function onClass<T extends { new(...args: any[]): {} }>(constructor: T) {
  log("decorator onClass: " + constructor.name);
  return class extends constructor {
      constructor(...args: any[]) {
          super(...args);
      }
  };
}

export { bean, log, onClass }