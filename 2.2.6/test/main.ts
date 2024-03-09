import * as walkSync from "walk-sync";
import {log} from "../src/speed"

// 载入框架文件
const srcDir = process.cwd() + "/src";
const srcPaths = walkSync(srcDir, {globs: ["**/*.ts"]});

for(let p of srcPaths) {
  console.log("框架TS文件：", p);
  import(srcDir + "/" + p);
}

// 载入用户文件
const testDir = process.cwd() + "/test";
const testPaths = walkSync(testDir, {globs: ["**/*.ts"]});

for(let p of testPaths) {
  console.log("用户TS文件：", p);
  import(testDir + "/" + p);
}

log("Application started");
