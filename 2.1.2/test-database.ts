import { component,getMapping,param,select,value,cache  } from "typespeed";


@component
class TestDatabase {

  @value("search.page.default.id")
  private defaultId: number;

  // http://localhost:3000/db/select
  @getMapping("/db/select")
  selectById(req, res): void {
      const row: UserDto = this.findRow(req.query.id || this.defaultId);
      res.send(row);
  }

  @cache(1800)
  @select("select * from `user` where id = #{id}")
  private findRow(@param("id") id: number): UserDto {
    return new UserDto(id, 'test');
  }
}

class UserDto {
  constructor(public id: number, public name: string){}
}