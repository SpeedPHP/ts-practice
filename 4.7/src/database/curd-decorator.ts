import { createPool, ResultSetHeader } from 'mysql2';
import { config, log } from '../speed';
import BeanFactory from "../bean-factory.class";
import CacheFactory from '../factory/cache-factory.class';
const pool = createPool(config("mysql")).promise();
const paramMetadataKey = Symbol('param');
const resultTypeMap = new Map<string, object>();
const cacheDefindMap = new Map<string, number>();
const tableVersionMap = new Map<string, number>();
let cacheBean: CacheFactory;

function Insert(sql: string) {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        descriptor.value = async (...args: any[]) => {
            const result: ResultSetHeader = await queryForExecute(sql, args, target, propertyKey);
            if (cacheBean && result.affectedRows > 0) {
                const [tableName, tableVersion] = getTableAndVersion("insert", sql);
                tableVersionMap.set(tableName, tableVersion + 1);
            }
            return result.insertId;
        };
    };
}

function Update(sql: string) {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        descriptor.value = async (...args: any[]) => {
            const result: ResultSetHeader = await queryForExecute(sql, args, target, propertyKey);
            if (cacheBean && result.affectedRows > 0) {
                const [tableName, tableVersion] = getTableAndVersion("update", sql);
                tableVersionMap.set(tableName, tableVersion + 1);
            }
            return result.affectedRows;
        };
    };
}

function Delete(sql: string) {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        descriptor.value = async (...args: any[]) => {
            const result: ResultSetHeader = await queryForExecute(sql, args, target, propertyKey);
            if (cacheBean && result.affectedRows > 0) {
                const [tableName, tableVersion] = getTableAndVersion("delete", sql);
                tableVersionMap.set(tableName, tableVersion + 1);
            }
            return result.affectedRows;
        };
    };
}

function Select(sql: string) {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        descriptor.value = async (...args: any[]) => {
            const [newSql, sqlValues] = convertSQLParams(sql, target, propertyKey, args);
            const resultType = resultTypeMap.get([target.constructor.name, propertyKey].toString());
            if (cacheBean && cacheDefindMap.has([target.constructor.name, propertyKey].toString())) {
                const [tableName, tableVersion] = getTableAndVersion("select", newSql);
                const cacheKey = JSON.stringify([tableName, tableVersion, newSql, sqlValues]);
                if (cacheBean.get(cacheKey)) {
                    return cacheBean.get(cacheKey);
                } else {
                    const rows = await actionQuery(newSql, sqlValues, resultType);
                    cacheBean.set(cacheKey, rows, cacheDefindMap.get([target.constructor.name, propertyKey].toString()));
                    return rows;
                }
            } else {
                return await actionQuery(newSql, sqlValues, resultType);
            }
        };
    }
}

function ResultType(dataClass) {
    return function (target, propertyKey: string) {
        resultTypeMap.set([target.constructor.name, propertyKey].toString(), new dataClass());
        //never return
    };
}

function Param(name: string) {
    return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
        const existingParameters: [string, number][] = Reflect.getOwnMetadata(paramMetadataKey, target, propertyKey) || [];
        existingParameters.push([name, parameterIndex]);
        Reflect.defineMetadata(paramMetadataKey, existingParameters, target, propertyKey);
    };
}

async function queryForExecute(sql: string, args: any[], target, propertyKey: string): Promise<ResultSetHeader> {
    const [newSql, sqlValues] = convertSQLParams(sql, target, propertyKey, args);
    return actionExecute(newSql, sqlValues);
}

async function actionExecute(newSql, sqlValues): Promise<ResultSetHeader> {
    const [result] = await pool.query(newSql, sqlValues);
    return <ResultSetHeader>result;
}

async function actionQuery(newSql, sqlValues, dataClassType?) {
    const [rows] = await pool.query(newSql, sqlValues);
    if (rows === null || Object.keys(rows).length === 0 || !dataClassType) {
        return rows;
    }
    const records = [];
    for (const rowIndex in rows) {
        const entity = new dataClassType();
        Object.getOwnPropertyNames(entity).forEach((propertyRow) => {
            if (rows[rowIndex].hasOwnProperty(propertyRow)) {
                Object.defineProperty(entity, propertyRow, Object.getOwnPropertyDescriptor(rows[rowIndex], propertyRow));
            }
        });
        records.push(entity);
    }
    return records;
}

function convertSQLParams(decoratorSQL: string, target: any, propertyKey: string, args: any[]): [string, any[]] {
    const queryValues = [];
    if (args.length > 0) {
        let argsVal;
        if (typeof args[0] === 'object') {
            argsVal = new Map(Object.getOwnPropertyNames(args[0]).map((valName) => [valName, args[0][valName]]));
        } else {
            const existingParameters: [string, number][] = Reflect.getOwnMetadata(paramMetadataKey, target, propertyKey,);
            argsVal = new Map(existingParameters.map(([argName, argIdx]) => [argName, args[argIdx]]));
        }
        const regExp = /#{(\w+)}/;
        let match;
        while (match = regExp.exec(decoratorSQL)) {
            const [replaceTag, matchName] = match;
            decoratorSQL = decoratorSQL.replace(new RegExp(replaceTag, 'g'), '?');
            queryValues.push(argsVal.get(matchName));
        }
    }
    return [decoratorSQL, queryValues];
}

function cache(ttl: number) {
    return function (target: any, propertyKey: string) {
        cacheDefindMap.set([target.constructor.name, propertyKey].toString(), ttl);
        if (cacheBean == null) {
            const cacheFactory = BeanFactory.getBean(CacheFactory);
            if (cacheFactory || cacheFactory["factory"]) {
                cacheBean = cacheFactory["factory"];
            }
        }
        log(cacheDefindMap);
    }
}

function getTableAndVersion(name: string, sql: string): [string, number] {
    const regExpMap = {
        insert: /insert\sinto\s+([\w`\'\"]+)/i,
        update: /update\s+([\w`\'\"]+)/i,
        delete: /delete\sfrom\s+([\w`\'\"]+)/i,
        select: /\s+from\s+([\w`\'\"]+)/i
    }
    const macths = sql.match(regExpMap[name]);
    if (macths && macths.length > 1) {
        const tableName = macths[1].replace(/[`\'\"]/g, "");
        const tableVersion = tableVersionMap.get(tableName) || 1;
        tableVersionMap.set(tableName, tableVersion);
        log(tableVersionMap);
        return [tableName, tableVersion];
    } else {
        throw new Error("can not find table name");
    }
}

export { Insert, Update, Delete, Select, Param, ResultType, cache, actionQuery, actionExecute };