import {onClass, log} from "../src/speed";
import {GetMapping} from "../src/route-mapping.decorator";
import {Insert, Update, Select} from "../src/database/query-decorator";

@onClass
export default class TestDatabase{

    @GetMapping("/db/insert")
    async insert(req, res) {
        const newId = await this.addRow();
        res.send("Insert: " + newId);
    }

    @GetMapping("/db/update")
    async update(req, res) {
        const rows = await this.editRow();
        res.send("Updated: " + rows);
    }

    @GetMapping("/db/select")
    async select(req, res) {
        const rows = await this.selectRows();
        res.send(rows);
    }

    @Insert("insert into `user` (name) values ('mytest')")
    private async addRow() {}

    @Update("update `user` set `name` = 'test for me' where id = 3")
    private async editRow() {}

    @Select("select * from `user`")
    private async selectRows() {}
}