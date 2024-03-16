import { GetMapping } from "../src/route-mapping.decorator";
import { autoware, component, log } from "../src/speed";
import UserModel from "./user-model.class";

@component
export default class TestOrm{

    @autoware("user")
    private userModel: UserModel;

    @GetMapping("/orm/first")
    async first(req, res) {
        await this.userModel.getUsers();
        res.send("findAll");
    }
}