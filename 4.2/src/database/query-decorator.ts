import {createPool, ResultSetHeader} from "mysql2";
import {config} from "../speed";

const pool = createPool(config("mysql")).promise();

function Select(sql) {
  return (target, propertykey, descriptor) => {
    descriptor.value = async () => {
      const [rows] = await pool.query(sql);
      return rows;
    }
  }
}

function Insert(sql) {
  return (target, propertykey, descriptor) => {
    descriptor.value = async () => {
      const result = await queryExecute(sql);
      return result.insertId; // 新增ID
    }
  }
}

function Update(sql) {
  return (target, propertykey, descriptor) => {
    descriptor.value = async () => {
      const result = await queryExecute(sql);
      return result.affectedRows; // 影响行数
    }
  }
}

async function queryExecute(sql): Promise<ResultSetHeader> {
  const [result] = await pool.query(sql);
  return <ResultSetHeader> result;
}

export {Insert, Update, Update as Delete, Select}