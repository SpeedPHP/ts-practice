
const config = require("./test/config.json");
const testConfig = require("./test/config-test.json");

const realConfig = Object.assign(config, testConfig);
console.log(realConfig);