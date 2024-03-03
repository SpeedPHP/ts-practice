import {onClass, log} from "../src/speed";
import {GetMapping} from "../src/route-mapping.decorator";
import {Insert, Update, Select, Param} from "../src/database/query-decorator";

@onClass
export default class TestDatabase{

    @GetMapping("/db/insert")
    async insert(req, res) {
        const newId = await this.addRow(req.query.name);
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

    @GetMapping("/db/find")
    async find(req, res) {
        const rows = await this.selectById({id: req.query.id});
        res.send(rows);
    }

    @Insert("insert into `user` (name) values (#{newName})") // 占位符
    private async addRow(@Param("newName") newName) {}

    @Update("update `user` set `name` = 'test for me' where id = 3")
    private async editRow() {}

    @Select("select * from `user`")
    private async selectRows() {}

    @Select("select * from `user` where id = #{id}")
    private async selectById(obj) {}
}