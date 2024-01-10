// TODO: 3.8.4
// import * as jwttoken from "jsonwebtoken";
// import { component, getMapping } from "../../src/typespeed";

// @component
// export default class FirstPage {

//     @getMapping("/first")
//     public index(req: any, res: any) {
//         res.send("FirstPage index running");
//     }

//     @getMapping("/session")
//     testForSession(req, res) {
//         req.session.view = req.session.view ? req.session.view + 1 : 1;
//         return "testForSession: " + req.session.view;
//     }

//     @getMapping("/login")
//     login() {
//         const token = jwttoken.sign({ foo: 'bar' }, 'shhhhhhared-secret');
//         /**
//          * 将这里获得的token，放到header的Authorization中。
//          * 值是：Bearer + token
//          */
//         return token;
//     }

// }