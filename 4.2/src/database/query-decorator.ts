// TODO
// import {createPool, ResultSetHeader} from 'mysql2';
// import { config } from "../speed";

// const pool = createPool(config("mysql")).promise();

// function Insert(sql) {
//   return (target, properKey, descriptor) => {
//     descriptor.value = async () => {
//       const result: ResultSetHeader = await queryForExecute(sql);
//       return result.insertId; // 新增的主键id
//     }
//   }
// }

// function Update(sql) {
//   return (target, properKey, descriptor) => {
//     descriptor.value = async () => {
//       const result: ResultSetHeader = await queryForExecute(sql);
//       return result.affectedRows; // 被影响的行数，修改了多少行记录
//     }
//   }
// }

// async function queryForExecute(sql): Promise<ResultSetHeader> {
//   const [result] = await pool.query(sql);
//   return <ResultSetHeader>result;
// }

// function Select(sql) {
//   return (target, properKey, descriptor) => {
//     descriptor.value = async () => {
//       const [rows] = await pool.query(sql);
//       return rows; 
//     }
//   }
// }

// export {Insert, Update, Update as Delete, Select};