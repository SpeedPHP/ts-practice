
import { actionQuery } from '../database/curd-decorator';

class Model {

    private table: string;

    constructor (table?: string) {
        if(table) this.table = table;
    }

    async findAll<T>(conditions, _sort = '', fields = '*', limit = undefined): Promise<T[]> {
        let sort = _sort ? " ORDER BY " + _sort : "";
        const {sql, values} = where(conditions);
        let newSql = "select " + fields + " from " + this.table + ' where ' + sql + sort;
        if(limit == undefined || typeof limit == 'string'){
            newSql += (limit == undefined) ? "" : " LIMIT " + limit;
        }
        console.log(newSql, values)
        return <T[]> await actionQuery(newSql, values);
    }


}

function where(conditions) {
    const result = { sql: '', values: [] };
    if (typeof conditions === 'object' && Object.keys(conditions).length > 0) {
        // 遍历条件
        Object.keys(conditions).map((field) => {
            if (result["sql"].length > 0) {
                result["sql"] += " AND "
            }
            // 判定是否为对象，如果是视为自定义语法
            if (typeof conditions[field] === 'object') {
                if (field === '$or') {
                    // $or 开启新的条件分支
                    let orSql = "";
                    conditions[field].map((item) => {
                        const { sql, values } = where(item);
                        orSql += (orSql.length > 0 ? " OR " : "") + `(${sql})`;
                        result["values"] = result["values"].concat(values);
                    });
                    result["sql"] += `(${orSql})`;
                } else {
                    // 解析自定义语法
                    const operatorTemplate = { 
                        $lt: "<", $lte: "<=", $gt: ">", $gte: ">=", $ne: "!=", $like: "LIKE" };
                    let firstCondition: boolean = Object.keys(conditions[field]).length > 1;
                    Object.keys(conditions[field]).map((operator) => {
                        if (operatorTemplate[operator]) {
                            // 替换占位符
                            const operatorValue = operatorTemplate[operator];
                            result["sql"] += ` ${field} ${operatorValue} ? ` + (firstCondition ? " AND " : "");
                            result["values"].push(conditions[field][operator]);
                            firstCondition = false;
                        }
                    });
                }
            } else {
                // 非对象时，则是字符串条件
                result["sql"] += ` ${field} = ? `;
                result["values"].push(conditions[field]);
            }
        });
    }
    return result
}


export {Model}