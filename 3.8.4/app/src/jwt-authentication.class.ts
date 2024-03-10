import { GetVerificationKey, expressjwt } from "express-jwt";
import AuthenticationFactory from "../../src/factory/authentication-factory.class";
import {bean, config} from "../../src/typespeed";
import * as jwt from 'jsonwebtoken';

const jwtConfig: {
  secret: jwt.Secret | GetVerificationKey;
  algorithms: jwt.Algorithm[];
  ignore: string[]
} = config("jwt");


export default class JwtAuthentication extends AuthenticationFactory {

  @bean
  getJwtAuthentication(): AuthenticationFactory {
    return new JwtAuthentication();
  }

  preHandle(req, res, next) {
    if(!jwtConfig.ignore.includes(req.path)) {
      // 不在忽略的路径数组里，才需要拦截
      const jwtMiddleware = expressjwt(jwtConfig);
      jwtMiddleware(req, res, (err) => {
        if(err) {
          next(err); // 不能通过jwt检查，已经被拦截
        }else{
          next(); // 通过jwt检查，放行
        }
      })
    }
    next(); // 放行
  }
}