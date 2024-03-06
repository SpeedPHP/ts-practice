// TODO
// import {GetMapping} from "../src/route-mapping.decorator";
// import {onClass, log, config} from "../src/speed";
// import {createPool} from 'mysql2';

// const pool = createPool(config('mysql')).promise();

// @onClass
// export default class TestSqlInjection {

//   @GetMapping("/sql/injection")
//   async login(req, res) {
//     // 1 文本拼装SQL - 替代方案：参数绑定
//     const sql = "select * from `check_user` where `name` = '" 
//       // 2 直接使用浏览器输入的参数，未作检验
//       + req.query.name + "' and `password` = '" + req.query.password + "'";
//     log("SQL: " + sql);

//     const [rows] = await pool.query(sql);
//     res.set("Content-Type", "text/html; charset=utf-8");
//     if(rows == null || Object.keys(rows).length == 0) {
//       res.end("账号密码不匹配");
//     }else{
//       res.end("登录成功，欢迎您：" + rows[0].name);
//     }
//   }
// }