import { GetMapping } from "2.3.3/src/route-mapping.decorator";
import { component, getMapping, value } from "../../src/typespeed";
import * as jwttoken from "jsonwebtoken";

@component
export default class FirstPage {

    @value("jwt.secret")
    private secret: string;

    @getMapping("/")
    public index(req: any, res: any) {
        res.send("FirstPage index running");
    }

    @getMapping("/session")
    testForSession(req, res) {
        req.session.view = req.session.view ? req.session.view + 1 : 1;
        res.end("testForSession: " + req.session.view);
    }

    @getMapping("/login")
    login() {
      // 登录逻辑，检查校验


      // 已经登录成功
      const token = jwttoken.sign({
        user: "myname"
      }, this.secret);
      return token;
    }

}