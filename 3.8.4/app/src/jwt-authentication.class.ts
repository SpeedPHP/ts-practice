// TODO
// import { AuthenticationFactory, bean, config } from "../../src/typespeed";
// import { expressjwt, GetVerificationKey } from "express-jwt";
// import * as jwt from 'jsonwebtoken';

// const jwtConfig: {
//     secret: jwt.Secret | GetVerificationKey;
//     algorithms: jwt.Algorithm[];
//     ignore: string[];
// } = config("jwt");

// export default class JwtAuthentication extends AuthenticationFactory{

//   @bean
//   public getAuthentication(): AuthenticationFactory{
//     return new JwtAuthentication;
//   }

//   // 前置拦截器
//   preHandle(req, res, next) {
//     if(!jwtConfig.ignore.includes(req.path)){
//       // 不在忽略的路径上面才检查
//       const jwtMiddleware = expressjwt(jwtConfig);
//       jwtMiddleware(req, res, (err) => {
//         if(err) {
//           //没有通过jwt检查
//           next(err)
//         }else{
//           // 已经通过检查
//           next();
//         }
//       })
//     }
//     // 忽略的页面放行
//     next();

//   }
// }