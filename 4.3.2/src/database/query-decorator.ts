import "reflect-metadata";
import { createPool, ResultSetHeader } from 'mysql2';
import { config, log } from '../speed';
const pool = createPool(config("mysql")).promise();
const paramMetadataKey = Symbol("param");

function Param(name) {
    return (target, propertyKey, parameterIndex) => {
        const existsParameters = Reflect.getOwnMetadata(paramMetadataKey, target, propertyKey) || [];
        // name=id, index=0
        existsParameters.push([name, parameterIndex]);
        Reflect.defineMetadata(paramMetadataKey, existsParameters, target, propertyKey);
    }
}

function convertSQLParam(args, target, propertyKey, decoratorSQL) {
    const queryValues = [];
    let argsVal;
    if(typeof args[0] == 'object') {
        argsVal = new Map(
            Object.getOwnPropertyNames(args[0]).map((valName) => [valName, args[0][valName]])
        );
    }else{
        const existsParameters = Reflect.getOwnMetadata(paramMetadataKey, target, propertyKey);
        argsVal = new Map(
            // id = 2 （0位置的参数值）
            existsParameters.map(([argName, argIdx]) => [argName, args[argIdx]])
        );
    }

    const reqExp = /#{(\w+)}/; // #{id}
    let match;
    while(match = reqExp.exec(decoratorSQL)) {
        // replaceTag=#{id}, matchName=id
        const [replaceTag, matchName] = match; 
        decoratorSQL = decoratorSQL.replace(new RegExp(replaceTag, 'g'), "?");
        queryValues.push(argsVal.get(matchName));
    }
    // select * from `user` where id = #{id}
    // select * from `user` where id = ?
    // queryValues = [ '2' ]
    console.log(decoratorSQL, queryValues);
    return [decoratorSQL, queryValues];
}

// 插入记录的装饰器
function Insert(sql: string) {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        descriptor.value = async (...args: any[]) => {
            const result: ResultSetHeader = await queryForExecute(sql, args, target, propertyKey);
            return result.insertId;
        };
    };
}


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
            if(args.length > 0) {
                [newSql, sqlValues] = convertSQLParam(args, target, propertyKey, newSql);
            }
            const [rows] = await pool.query(newSql, sqlValues);
            return rows;
        };
    }
}


// 执行SQL的核心方法
async function queryForExecute(sql: string, args: any[], target, propertyKey: string,): Promise<ResultSetHeader> {
    let sqlValues = [];
    let newSql = sql;

    //执行SQL语句
    const [result] = await pool.query(newSql, sqlValues);
    return <ResultSetHeader>result;
}



export { Insert, Update, Update as Delete, Select, Param}