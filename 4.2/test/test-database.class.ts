import {onClass, log} from "../src/speed";
import {GetMapping} from "../src/route-mapping.decorator";
import {Insert, Update, Delete, Select} from "../src/database/query-decorator";

@onClass
export default class TestDatebase {

  @GetMapping("/db/insert")
  async insert(req, res) {
    const newId = await this.addRow();
    res.send("Insert: " + newId);
  }

  @GetMapping("/db/update")
  async update(req, res) {
    const result = await this.editRow();
    res.send("Affected: " + result);
  }

  @GetMapping("/db/delete")
  async delete(req, res) {
    const result = await this.delRow();
    res.send("Affected: " + result);
  }

  @GetMapping("/db/select")
  async select(req, res) {
    const rows = await this.selectRow();
    res.send(rows);
  }

  @Select("select * from `user` ")
  private async selectRow() {}

  @Delete("delete from `user` where id = 3")
  private async delRow() {}

  @Update("update `user` set `name` = 'new name' where id = 2")
  private async editRow(){}

  @Insert("insert into `user` (name) values ('the name')")
  private async addRow() {}
}