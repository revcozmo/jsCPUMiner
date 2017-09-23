const chalk = require('chalk');
const BigNumber = require("bignumber.js");
const util = require("../utils");
const doubleSHA256 = require("../hash/doubleSHA256");
const keccak256 = require("../hash/keccak256");
const ripemd160 = require("../hash/ripemd160");

var hex = "74657374";
var bytes = util.hexToBytes(hex);
var hex2 = util.bytesToHex(bytes);

console.log(chalk.blue("Testing Hex-Bytes Conversion")); 
console.log(bytes.toString() === [116,101,115,116].toString() ? chalk.green("Passed"):chalk.red("Failed, got [" + bytes + "] expected [" + [116,101,115,116] + "]"));

console.log(chalk.blue("\nTesting Hex-Bytes-Hex Conversion"));
console.log(hex === hex2 ? chalk.green("Passed"):chalk.red('Failed, should be equal but got "' + hex + '" and "' + hex2 + '"'));


var sha256hash = util.bytesToHex(doubleSHA256(util.hexToBytes("ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")));
var sha256Result = "deedbcecde05c2b4e238519c936535b753cb1b5fe2d1a049d169389c795ae490";

console.log(chalk.blue("\nTesting Double SHA256"));
console.log(sha256hash.toString() === sha256Result.toString() ? chalk.green("Passed"):chalk.red("Failed, got " + sha256hash + " expected " + sha256Result));


var keccak256hash = util.bytesToHex(keccak256(util.hexToBytes("ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")));
var keccak256Result = "bd8b151773dbbefd7b0df67f2dcc482901728b6df477f4fb2f192733a005d396";

console.log(chalk.blue("\nTesting Keccak256"));
console.log(keccak256hash.toString() === keccak256Result.toString() ? chalk.green("Passed"):chalk.red("Failed, got " + keccak256hash + " expected " + keccak256Result));


var ripemd160hash = util.bytesToHex(ripemd160(util.hexToBytes("ffc5f026c309af05a4eb634b744b97dff2a4a2367c10762691c4766bd606c37a6330fa9e016bf4deffa259f591ba3f5ef693c0ea2b86383c29c359574536372a")));
var ripemd160Result = "3e0a014576385523e6a328cfe280bd1e71af4476";

console.log(chalk.blue("\nTesting RipeMD160"));
console.log(ripemd160hash.toString() === ripemd160Result.toString() ? chalk.green("Passed"):chalk.red("Failed, got " + ripemd160hash + " expected " + ripemd160Result));


console.log(chalk.blue("\nTesting Greater Than"));
console.log(util.greaterThan("ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff", "0000000000000000000000000000000000000000000000000000000000000000") ? chalk.green("Passed"):chalk.red("Failed, got false expected true"));


var maxDiff = new BigNumber("ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff", 16);
var diff = new BigNumber("100000000");
var difficulty = new BigNumber(maxDiff).dividedBy(diff).toString(16);
difficulty = difficulty.substring(0, difficulty.indexOf('.'));
difficulty = new BigNumber(difficulty, 16).toFixed();
var result = "1157920892373161954235709850086879078532699846656405640394575840079131";

console.log(chalk.blue("\nAsserting Javascript BigNumber Pairity with Solidity"));
console.log(difficulty == result ? chalk.green("Passed"):chalk.red("Failed, got " + difficulty + " expected " + result));


hex = "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
bytes = util.hexToBytes(hex);
var bytesconcat = bytes.concat(bytes);
var hexconcat = util.bytesToHex(bytesconcat);
result = "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

console.log(chalk.blue("\nChecking Byte Array Concat"));
console.log(hexconcat == result ? chalk.green("Passed"):chalk.red("Failed, got " + hexconcat + " expected " + result));