import * as walkSync from "walk-sync";
import {log} from "../src/speed"

const srcDir = process.cwd() + "/src";

const srcPaths = walkSync(srcDir, {globs : ['**/*.ts']});

for(let p of srcPaths) {
  console.log(srcDir + "/" + p)
  import(srcDir + "/" + p);
}

const testDir = process.cwd() + "/test";

const testPaths = walkSync(testDir, {globs : ['**/*.ts']});
for(let p of testPaths) {
  console.log(testDir + "/" + p)
  import(testDir + "/" + p);
}

log("Main file running...");