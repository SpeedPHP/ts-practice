import {Model} from "../src/database/orm-decorator";
import {log, component} from "../src/speed";


export default class UserModel extends Model{

    async getUsers() {
        const users = await this.findAll({
            id: {$lt: 10, $lte: 43}, "name": {$like : "%a%"},
            $or: [{id : 1}, {id : 3}]
        });
        log(users)
        return "getUsers";
    }
}