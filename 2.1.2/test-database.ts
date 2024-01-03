// 数据库测试类
class TestDatabase {
  private defaultId: number = 1;
  selectById(req, res): void {
      const row: UserDto = this.findRow(req.query.id || this.defaultId);
      res.send(row);
  }
  private findRow(id: number): UserDto {
    return new UserDto(id, 'test');
  }
}

class UserDto {
  constructor(public id: number, public name: string){}
}