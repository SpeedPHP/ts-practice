import { Redis, component, autoware, getMapping, log, reqQuery, redisSubscriber } from "../../src/typespeed";

@component
export default class TestRedis {

  @autoware
  private redisObj: Redis;

  @getMapping("/redis")
  async redisString() {
      await this.redisObj.set("redisKey", "Hello World");
      const value = await this.redisObj.get("redisKey");
      return "get from redis: " + value;
  }

  @redisSubscriber("mychannel")
  listen(message) {
    log("Received by Decorator: ", message);
  }

  @getMapping("/publish")
  async publish() {
      await this.redisObj.publish("mychannel", "Hello World");
      return "ok";
  }


  @getMapping("/zadd")
  async zadd(@reqQuery name, @reqQuery score) {
      await this.redisObj.zadd("MyScoreSet", score, name);
      return "ok";
  }

  @getMapping("/read")
  async readScore() {
      const result = await this.redisObj.zrevranking("MyScoreSet", 0, -1)
      return Object.fromEntries(result);
  }

  @getMapping("/readscore")
  async readWithScore() {
      const result = await this.redisObj.zrevrange("MyScoreSet", 0, -1, "WITHSCORES")
      return JSON.stringify(result);
  }
}