import * as cache from "node-cache";
import CacheFactory from "../factory/cache-factory.class";
import {value, bean} from "../../src/speed";

export default class NodeCache extends CacheFactory {

  private nodeCache;
  private nodeCacheOptions;

  @value("cache")
  private config;

  constructor() {
    super();
    this.nodeCacheOptions = this.config || {stdTTL: 3600};
    this.nodeCache = new cache();
  }

  @bean
  getNodeCache(): CacheFactory {
    return new NodeCache();
  }

  get(key) {
    return this.nodeCache.get(key);
  }
  set(key,value, expire?) {
    this.nodeCache.set(key, value, expire || this.nodeCacheOptions["stdTTL"]);
  }
  del(key){
    this.nodeCache.del(key);
  }

  has(key) {
    return this.nodeCache.has(key);
  }

  flush() {
    this.nodeCache.flushAll();
  }
}