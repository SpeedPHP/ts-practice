// 
// import { GetMapping } from "../src/route-mapping.decorator";
// import { onClass } from "../src/speed";


// @onClass
// export default class SecondPage {

//   @GetMapping("/second/compression")
//   testCompression(req, res) {
//     const result = Array(1026).join('a').slice(0,-1);
//     return result;
//   }

//   @GetMapping("/second/session")
//   testSession(req, res) {
//     req.session.counter = req.session.counter ? req.session.counter + 1 : 1;
//     return "Counter Now is :" + req.session.counter;
//   }

//   @GetMapping("/second/set_cookie")
//   setCookiePage(req, res) {
//     res.cookie("Hello", "world");
//     return "set cookie";
//   }

//   @GetMapping("/second/get_cookie")
//   getCookiePage(req, res) {
//     return "get cookie:" + req.cookies.Hello;
//   }
// }