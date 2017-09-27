const BigNumber = require("bignumber.js");
const api = require('../api');
const util = require("../utils");

var address;
var maxDiff;
var getDiff;
var getChallenge;
var challenge = "FF";
var difficulty = 1;
var diffRaw;
var claim;
var hashfunc;

var lastSubmission = Date.now();

async function getVars() {
    await getChallenge().then((chall) => {
        challenge = chall.substring(2);
    });
    await getDiff().then((diff) => {
        diffRaw = diff;
        difficulty = new BigNumber(maxDiff).dividedBy(diff).toString(16);
        difficulty = difficulty.substring(0, difficulty.indexOf('.'));
    });
    process.send({
        type: "vars",
        msg: {
            difficulty: new BigNumber(diffRaw).toFixed(),
            challenge: challenge
        }
    });
}

function foundCB(solution) {
    if (Date.now() - lastSubmission >= 20000){
        console.log("Found Solution: " + solution);
        claim(address, solution);
        lastSubmission = Date.now();
    }
}

function hash() {
    var hashcount = 0;
    var lastCheck = Date.now();

    function hashloop() {
        var challengeBytes = util.hexToBytes(challenge);
        var noncebytes = new Array(32);
        for (var i = 0; i < noncebytes.length; i++) {
            noncebytes[i] = util.randomInt(0,255);
        }
        var hashme = noncebytes.concat(challengeBytes);
        var hash = hashfunc(hashme);
        if (util.greaterThan(difficulty, hash)){
            foundCB("0x" + util.bytesToHex(noncebytes));
        }
        if (Date.now() - lastCheck >= 500){
            process.send({
                type: "hash",
                msg: hashcount
            });
            lastCheck = Date.now();
            hashcount = 0;
        }
        hashcount++;
        setImmediate(hashloop);
    }
    hashloop();
}

module.exports = async function(algorithm, addr) {
    address = addr;
    switch(algorithm) {
        case "Double Sha256":
            maxDiff = new BigNumber("ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff", 16);
            getDiff = api.getDoubleSHA256Difficulty;
            getChallenge = api.getDoubleSHA256Challenge;
            claim = api.claimDoubleSHA256Reward;
            hashfunc = require("../hash/doubleSHA256");
            break;
        case "Keccak256":
            maxDiff = new BigNumber("ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff", 16);
            getDiff = api.getKeccak256Difficulty;
            getChallenge = api.getKeccak256Challenge;
            claim = api.claimKeccak256Reward;
            hashfunc = require("../hash/keccak256");
            break;
        case "RipeMD160":
            maxDiff = new BigNumber("ffffffffffffffffffffffffffffffffffffffff", 16);
            getDiff = api.getRipeMD160Difficulty;
            getChallenge = api.getRipeMD160Challenge;
            claim = api.claimRipeMD160Reward;
            hashfunc = require("../hash/ripemd160");
            break;
        default:
            throw "No algorithm specified";
    }
    setInterval(getVars, 10000);
    getVars();
    setTimeout(hash, 1000);
}