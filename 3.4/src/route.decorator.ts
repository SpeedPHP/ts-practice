import * as express from "express";
import * as multiparty from "multiparty";
import { expressjwt } from "express-jwt";
import { getComponent } from "./core.decorator";

const routerMapper = {
  "get": {},
  "post": {},
  "all": {}
};

const routerMiddleware = {};
function setRouter(app: express.Application) {
  ["get", "post", "all"].forEach(method => {
    for (let key in routerMapper[method]) {
      const rounterFunction = routerMapper[method][key];
      if (routerMiddleware[rounterFunction["name"]]) {
        const args: Array<any> = [key, ...routerMiddleware[rounterFunction["name"]], rounterFunction["invoker"]];
        app[method].apply(app, args);
      } else {
        app[method](key, rounterFunction["invoker"]);
      }
    }
  });
}

function mapperFunction(method: string, value: string) {
  return (target: any, propertyKey: string) => {
    routerMapper[method][value] = {
      "path": value,
      "name": [target.constructor.name, propertyKey].toString(),
      "target": target.constructor,
      "propertyKey": propertyKey,
      "invoker": async (req, res, next) => {
        const routerBean = getComponent(target.constructor);
        try {
          // TODO
          //let paramTotal = routerBean[propertyKey].length;
          const args = [req, res, next];
          // for(let i = 0; i < paramTotal; i++) {
          //   if(routerParams[[target.constructor.name, propertyKey, i].toString()]){
          //     args[i] = routerParams[[target.constructor.name, propertyKey, i].toString()](req,res,next);
          //   }
          // }

          const testResult = await routerBean[propertyKey].apply(routerBean, args);
          if (typeof testResult === "object") {
            res.json(testResult);
          } else if (typeof testResult !== "undefined") {
            res.send(testResult);
          }
          return testResult;
        } catch (err) {
          next(err)
        }
      }
    }
  }
}

function upload(target: any, propertyKey: string) {
  const key = [target.constructor.name, propertyKey].toString();
  if (routerMiddleware[key]) {
    routerMiddleware[key].push(uploadMiddleware);
  } else {
    routerMiddleware[key] = [uploadMiddleware];
  }
}

function uploadMiddleware(req, res, next) {
  const form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    req.files = files || undefined;
    next();
  });
}

function jwt(jwtConfig) {
  return (target: any, propertyKey: string) => {
    const key = [target.constructor.name, propertyKey].toString();
    if (routerMiddleware[key]) {
      routerMiddleware[key].push(expressjwt(jwtConfig));
    } else {
      routerMiddleware[key] = [expressjwt(jwtConfig)];
    }
  }
}
// 前置切面装饰器
function before(constructorFunction, methodName: string) {
  const targetBean = getComponent(constructorFunction);
  return function (target, propertyKey: string) {
      const currentMethod = targetBean[methodName];
      // 检查方法参数的个数，并记录以备参数装饰器使用
      if(currentMethod.length > 0){
        //routerParamsTotal[[constructorFunction.name, methodName].toString()] = currentMethod.length;
      }
      Object.assign(targetBean, {
          [methodName]: function (...args) {
              target[propertyKey](...args);
              return currentMethod.apply(targetBean, args);
          }
      })
  };
}

// 后置切面装饰器
function after(constructorFunction, methodName: string) {
  const targetBean = getComponent(constructorFunction);
  return function (target, propertyKey: string) {
      const currentMethod = targetBean[methodName];
      if(currentMethod.length > 0){
        //routerParamsTotal[[constructorFunction.name, methodName].toString()] = currentMethod.length;
      }
      Object.assign(targetBean, {
          [methodName]: function (...args) {
              const result = currentMethod.apply(targetBean, args);
              const afterResult = target[propertyKey](result);
              return afterResult ?? result;
          }
      })
  };
}

// const routerParams = {};
// function req(target, propertyKey, parameterIndex) {
//   const key = [target.constructor.name, propertyKey, parameterIndex].toString();
//   routerParams[key] = (req, res, next) => req;
// }

// function res(target, propertyKey, parameterIndex) {
//   const key = [target.constructor.name, propertyKey, parameterIndex].toString();
//   routerParams[key] = (req, res, next) => res;
// }

// function getParamInFunction(fn: Function, index: number) {
//   const code = fn.toString().replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, '').replace(/=>.*$/mg, '').replace(/=[^,]+/mg, '');
//   const result = code.slice(code.indexOf('(') + 1, code.indexOf(')')).match(/([^\s,]+)/g);
//   return result[index] || null;
// }

// function reqQuery(target, propertyKey, parameterIndex) {
//   const key = [target.constructor.name, propertyKey, parameterIndex].toString();
//   const paramName = getParamInFunction(target[propertyKey], parameterIndex);
//   routerParams[key] = (req, res, next) => req.query[paramName];
// }

// function reqBody(target, propertyKey, parameterIndex) {
//   const key = [target.constructor.name, propertyKey, parameterIndex].toString();
//   routerParams[key] = (req, res, next) => req.body;
// }

// function reqForm(paramName) {
//   return function(target, propertyKey, parameterIndex) {
//     const key = [target.constructor.name, propertyKey, parameterIndex].toString();
//     routerParams[key] = (req, res, next) => req.body[paramName];
//   }
// }

const getMapping = (value: string) => mapperFunction("get", value);
const postMapping = (value: string) => mapperFunction("post", value);
const requestMapping = (value: string) => mapperFunction("all", value);

export {   before, after, getMapping, postMapping, requestMapping, setRouter, upload, jwt,
  //req, reqQuery, res, reqBody

};