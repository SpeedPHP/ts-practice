import { bean } from "../core.decorator";
import { Redis as IoRedis, RedisKey } from "ioredis";
import {config} from "../typespeed";
import { channel } from "diagnostics_channel";
const redisSubscribers = {};

class Redis extends IoRedis {

  private static pubObj: Redis = null;
  private static subObj: Redis = null;

  @bean
  public getRedis(): Redis {
    return Redis.getIntanceOfRedis("pub");
  }

  static getIntanceOfRedis(mode: "sub" | "pub") {
    if( !config("redis") ){
      return null;
    }
    if(mode == "pub") {
      this.pubObj = this.pubObj || new Redis(config("redis"));
      return this.pubObj;
    } else {
      this.subObj = this.subObj || new Redis(config("redis"));
      return this.subObj;
    }
  }

  // 获取排行榜数据，按分数从高到低
  public async zrevranking(key: RedisKey, start: number | string, stop: number | string): Promise<Map<string, number>> {
      // 用zrevrange()获得数据
      const list = await this.zrevrange(key, start, stop, "WITHSCORES");
      // 转换数据格式，方便开发者直接使用
      const map = new Map<string, number>();
      for (let i = 0; i < list.length; i = i + 2) {
          map.set(list[i], Number(list[i + 1]));
      }
      return map;
  }

    // 获取排行榜数据，按分数从低到高
  public async zranking(key: RedisKey, start: number | string, stop: number | string): Promise<Map<string, number>> {
        // zrange()获得数据
        const list = await this.zrange(key, start, stop, "WITHSCORES");
        // 转换数据格式，方便开发者直接使用
        const map = new Map<string, number>();
        for (let i = 0; i < list.length; i = i + 2) {
            map.set(list[i], Number(list[i + 1]));
        }
        return map;
    }
}

if(config("redis")) {
  process.once("SIGINT", () => {
    Redis.getIntanceOfRedis("sub") || Redis.getIntanceOfRedis("sub").disconnect();
    Redis.getIntanceOfRedis("pub") || Redis.getIntanceOfRedis("pub").disconnect();
  })
}

function redisSubscriber(channel) {
  if(!config("redis")) {
    return () => {
      throw new Error("redis not configured");
    }
  }
  Redis.getIntanceOfRedis("sub").subscribe(channel, (err, count) => {
    if(err) {
      console.error(err);
    }
  });
  return (target, propertyKey) => {
    redisSubscribers[channel] = target[propertyKey];
  }
}

if(config("redis")) {
  Redis.getIntanceOfRedis("sub").on("message", (channel, message) => {
    redisSubscribers[channel](message);
  });
}

export { Redis, redisSubscriber }