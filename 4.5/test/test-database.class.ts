
import { Insert, Update, Select, Param, cache} from "../src/database/query-decorator";
import { GetMapping } from "../src/route-mapping.decorator";
import { onClass, log, autoware } from "../src/speed";
import CacheFactory from "../src/factory/cache-factory.class";

@onClass
export default class TestDatabase {

    @autoware
    private cacheBean: CacheFactory;

    @GetMapping("/set-cache")
    testCache(req, res) {
        this.cacheBean.set("test", req.query.value);
        res.end("Set Cache");
    } 
    @GetMapping("/show-cache")
    showCache(req, res) {
        res.end("Cache: " + this.cacheBean.get("test"));
    }


    @GetMapping("/db/find")
    async selectById(req, res) {
        const row = await this.findRow(req.query.id || 1);
        res.send(row);
    }

    @GetMapping("/db/edit")
    async editById(req, res) {
        const row = await this.editRow(req.query.id || 1, req.query.name);
        res.send("ok");
    }

    @Update("update `user` set name = #{name} where id=#{id}")
    private async editRow(@Param("id") id, @Param("name") name) {}

    @cache(1000)
    @Select("Select * from `user` where id = #{id}")
    private async findRow(@Param("id") id: number) { }

}