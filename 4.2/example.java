package com.example.internal;

import com.example.internal.dto.User;
import com.example.internal.BaseMapper;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;


public interface InnerMapper extends BaseMapper {
  @Results(id = "userResult", value = {
    @Result(property = "id", column = "uid", id = true),
    @Result(property = "firstName", column = "first_name"),
    @Result(property = "lastName", column = "last_name")
  })
  @Select("select * from users where id = #{id}")
  User getUserById(Integer id);

}