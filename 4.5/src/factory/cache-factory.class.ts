export default abstract class CacheFactory {
  abstract get(key); // 取一个缓存
  abstract set(key, value, expire?) // 设置一个缓存
  abstract del(key); // 删除特定的一个缓存
  abstract has(key); // 查询某个缓存是否存在
  abstract flush(); // 清空所有缓存
}