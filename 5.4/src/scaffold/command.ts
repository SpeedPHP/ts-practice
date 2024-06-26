#!/usr/bin/env node

import { Command  } from "commander";
const program = new Command();
import * as fs from "fs";

program.command("new [appName]").description("Create a new APP").action((appName) => {
  const currentDir = process.cwd();
    // 创建新项目的初始文件
    fs.mkdirSync(currentDir + "/" + appName);
    mkFile("nodemon.json", currentDir + "/" + appName, appName);
    mkFile("package.json", currentDir + "/" + appName, appName);
    mkFile("tsconfig.json", currentDir + "/" + appName, appName);

    fs.mkdirSync(currentDir + "/" + appName + "/src");
    mkFile("main.ts", currentDir + "/" + appName + "/src", appName);
    mkFile("front-page.class.ts", currentDir + "/" + appName + "/src", appName);

    console.log('');
    console.log('  Create app success!');
    console.log('');
    console.log('  Please run `npm install` in the app directory.');
    console.log('');
})

program.on("--help", () => {
  console.log('');
  console.log('  Examples:');
  console.log('');
  console.log('    $ typespeed new blog');
})

program.parse(process.argv);

function mkFile(fileName, targetPath, appName) {
  const tplPath = __dirname + "/templates";
  const fileContents = fs.readFileSync(tplPath + "/" + fileName + ".tpl", "utf-8");
  fs.writeFileSync(targetPath + "/" + fileName, fileContents.replace("###appName###", appName));
}