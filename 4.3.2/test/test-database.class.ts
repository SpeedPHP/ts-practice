import {onClass, log} from "../src/speed";
import {GetMapping} from "../src/route-mapping.decorator";
import {Insert, Update, Select, Param} from "../src/database/query-decorator";

@onClass
export default class TestDatabase{

 

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
        const rows = await this.findRows(req.query.id);
        res.send(rows);
    }

    @GetMapping("/db/findObject")
    async findObject(req, res) {
        const rows = await this.findRowsByObject({
            id : req.query.id
        });
        res.send(rows);
    }


    @Update("update `user` set `name` = 'test for me' where id = 3")
    private async editRow() {}

    @Select("select * from `user` where id = #{id}")
    private async findRows(@Param("id") id:number) {}

    @Select("select * from `user` where id = #{id}")
    private async findRowsByObject(arg: object) {}

    @Select("select * from `user`")
    private async selectRows() {}


}