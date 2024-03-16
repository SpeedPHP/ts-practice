import { createConnection, createPool } from "mysql2";
import { bean, config } from "../speed";
import DataSourceFactory from "../factory/data-source-factory.class";

export default class ReadWriteDb extends DataSourceFactory {

    private readonly readSession;
    private readonly writeSession;

    @bean
    getDataSource(): DataSourceFactory {
        if(!config("mysql")) {
            return null;
        }
        return new ReadWriteDb();
    }


    constructor() {
        super();
        const dbConfig = config("mysql");
        if(dbConfig["master"] && dbConfig["slave"]) {
            this.writeSession = this.getConnectionByConfig(dbConfig["master"]);
            if(Array.isArray(dbConfig["slave"])){
                // 一主多从（数组）
                this.readSession = dbConfig['slave'].map(config=>this.getConnectionByConfig(config));
            }else{
                // 一主一从
                this.readSession = [
                    this.getConnectionByConfig(dbConfig["slave"])
                ];
            }

        } else {
            // 单个数据源
            this.writeSession = this.getConnectionByConfig(dbConfig);
            this.readSession = [this.writeSession];
        }
    }

    private getConnectionByConfig(config) {
        return createPool(config).promise();
    }


    readConnection() {
        return this.readSession[Math.floor(Math.random() * this.readSession.length)];
    }
    writeConnection() {
        return this.writeSession;
    }
    
}