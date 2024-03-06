import { createPool, ResultSetHeader } from 'mysql2';
import { config, log } from '../speed';
const pool = createPool(config("mysql")).promise();
// const paramMetadataKey = Symbol("param");

// function Param(name) {
//     return function (target, propertyKey, parameterIndex) {
//         const existingParameters = Reflect.getOwnMetadata(paramMetadataKey, target, propertyKey) || [];
//         existingParameters.push([name, parameterIndex]);
//         Reflect.defineMetadata(paramMetadataKey, existingParameters, target, propertyKey);
//     }
// }

// 插入记录的装饰器
function Insert(sql: string) {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        descriptor.value = async (...args: any[]) => {
            const result: ResultSetHeader = await queryForExecute(sql, args, target, propertyKey);
            return result.insertId;
        };
    };
}

// TODO
// function convertSQLParams(args, target, propertyKey, decoratorSQL) {
//     const queryValues = [];
//     let argsVal;
//     if(typeof args[0] == 'object') { 
//         // 对象作为绑定值
//         argsVal = new Map(
//             Object.getOwnPropertyNames(args[0]).map((valName) => [valName, args[0][valName]])
//         );
//     }else{
//         // Param装饰器作为绑定值
//         const existingParameters = Reflect.getOwnMetadata(paramMetadataKey, target, propertyKey);
//         argsVal = new Map(existingParameters.map(([argName, argIdx]) => [argName, args[argIdx]]));
//     }

//     const regExp = /#{(\w+)}/;
//     let match;
//     while(match = regExp.exec(decoratorSQL)) {
//         const [replaceTag, matchName] = match; // replaceTag=#{newName}, matchName=newName
//         decoratorSQL = decoratorSQL.replace(new RegExp(replaceTag, 'g'), "?");
//         queryValues.push(argsVal.get(matchName));
//     }
//     console.log(decoratorSQL);
//     console.log(queryValues);
//     return [decoratorSQL, queryValues];
// }

function Update(sql: string) {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        descriptor.value = async (...args: any[]) => {
            const result: ResultSetHeader = await queryForExecute(sql, args, target, propertyKey);
            return result.affectedRows;
        };
    };
}

function Select(sql: string) {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        descriptor.value = async (...args: any[]) => {
            let newSql = sql;
            let sqlValues = [];
            // TODO
            // if(args.length > 0) {
            //     [newSql, sqlValues] = convertSQLParams(args, target, propertyKey, newSql);
            // }
            const [rows] = await pool.query(newSql, sqlValues);
            return rows;
        };
    }
}


// 执行SQL的核心方法
async function queryForExecute(sql: string, args: any[], target, propertyKey: string,): Promise<ResultSetHeader> {
    let sqlValues = [];
    let newSql = sql;
    // TODO
    // if(args.length > 0) {
    //     [newSql, sqlValues] = convertSQLParams(args, target, propertyKey, newSql);
    // }
    //执行SQL语句
    const [result] = await pool.query(newSql, sqlValues);
    return <ResultSetHeader>result;
}



export { Insert, Update, Update as Delete, Select
    //, Param
};