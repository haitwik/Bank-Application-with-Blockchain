const path = require("path");
const fs = require("fs");
const solc = require("solc");

const myBank = path.resolve(__dirname, "contracts", "myBank.sol");
const source = fs.readFileSync(myBank, "utf8");

module.exports = solc.compile(source, 1).contracts[":MyBank"];
