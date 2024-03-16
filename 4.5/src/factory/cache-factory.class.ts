export default abstract class CacheFactory{
  abstract get(key); // 取缓存
  abstract set(key, value, expire?) // 存入缓存
  abstract del(key); // 删除某个缓存
  abstract has(key); // 检查某个缓存是否存在
  abstract flush(); // 清空缓存
}