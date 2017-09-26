const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const fs = require('fs');
const abi = fs.readFileSync('resources/floatcoin_abi.json', 'utf-8');
const FloatCoin = new web3.eth.Contract(JSON.parse(abi));

var password = "";

FloatCoin.options.address = '0x1a7c96cd8b9cc80aFD0591f81ABc47725d2B33F4';

function setPassword(pass){
    password = pass;
}

async function unlockAccount(address) {
    return await web3.eth.personal.unlockAccount(address, password);
}

async function getBalance(address) {
    var balance;
    await FloatCoin.methods.balanceOf(address).call().then((result) => {
        balance = result/10**16;
    })
    return balance;
}

function claimDoubleSHA256Reward(address, nonce){
    await unlockAccount(address);
    FloatCoin.methods.claimDoubleSHA256Reward(nonce).send({from: address}).on('transactionHash', function(txhash){
        console.log("Claiming Mining Reward with TXID " + txhash);
    }).on('receipt', function(receipt){
        if (Object.getOwnPropertyNames(receipt.events).length > 0){
            console.log("Mining Reward Claimed (" + receipt.events[0].returnValues.value/10**16 + " FC)");
            console.log("Current Balance: " + getBalance(address));
        } else {
            console.log("Failed to claim mining rewards");
        }
    });
}

function claimKeccak256Reward(address, nonce){
    await unlockAccount(address);
    FloatCoin.methods.claimKeccak256Reward(nonce).send({from: address}).on('transactionHash', function(txhash){
        console.log("Claiming Mining Reward with TXID " + txhash);
    }).on('receipt', function(receipt){
        if (Object.getOwnPropertyNames(receipt.events).length > 0){
            console.log("Mining Reward Claimed (" + receipt.events[0].returnValues.value/10**16 + " FC)");
            console.log("Current Balance: " + getBalance(address));
        } else {
            console.log("Failed to claim mining rewards");
        }
    });
}

function claimRipeMD160Reward(address, nonce){
    await unlockAccount(address);
    FloatCoin.methods.claimRipeMD160Reward(nonce).send({from: address}).on('transactionHash', function(txhash){
        console.log("Claiming Mining Reward with TXID " + txhash);
    }).on('receipt', function(receipt){
        if (Object.getOwnPropertyNames(receipt.events).length > 0){
            console.log("Mining Reward Claimed (" + receipt.events[0].returnValues.value/10**16 + " FC)");
            console.log("Current Balance: " + getBalance(address));
        } else {
            console.log("Failed to claim mining rewards");
        }
    });
}

async function getAccounts() {
    var addresses = [];
    await web3.eth.getAccounts().then((result) => {
        addresses = result;
    });
    return addresses;
}

function watchDoubleSHA256(handler) {
    FloatCoin.events.DoubleSHA256RewardClaimed(handler);
}

function watchKeccak256(handler) {
    FloatCoin.events.Keccak256RewardClaimed(handler);
}

function watchRipeMD160(handler) {
    FloatCoin.events.RipeMD160RewardClaimed(handler);
}

async function getDoubleSHA256Difficulty() {
    var difficulty;
    await FloatCoin.methods.DoubleSHA256Difficulty().call().then((result) => {
        difficulty = result;
    })
    return difficulty;
}

async function getKeccak256Difficulty() {
    var difficulty;
    await FloatCoin.methods.Keccak256Difficulty().call().then((result) => {
        difficulty = result;
    })
    return difficulty;
}

async function getRipeMD160Difficulty() {
    var difficulty;
    await FloatCoin.methods.RipeMD160Difficulty().call().then((result) => {
        difficulty = result;
    })
    return difficulty;
}

async function getDoubleSHA256Challenge() {
    var challenge;
    await FloatCoin.methods.currentDoubleSHA256Challenge().call().then((result) => {
        challenge = result;
    })
    return challenge;
}

async function getKeccak256Challenge() {
    var challenge;
    await FloatCoin.methods.currentKeccak256Challenge().call().then((result) => {
        challenge = result;
    })
    return challenge;
}

async function getRipeMD160Challenge() {
    var challenge;
    await FloatCoin.methods.currentRipeMD160Challenge().call().then((result) => {
        challenge = result;
    })
    return challenge;
}


module.exports.setPassword = setPassword;
module.exports.unlockAccount = unlockAccount;
module.exports.getBalance = getBalance;
module.exports.claimDoubleSHA256Reward = claimDoubleSHA256Reward;
module.exports.claimKeccak256Reward = claimKeccak256Reward;
module.exports.claimRipeMD160Reward = claimRipeMD160Reward;
module.exports.getAccounts = getAccounts;
module.exports.watchDoubleSHA256 = watchDoubleSHA256;
module.exports.watchKeccak256 = watchKeccak256;
module.exports.watchRipeMD160 = watchRipeMD160;
module.exports.getDoubleSHA256Difficulty = getDoubleSHA256Difficulty;
module.exports.getKeccak256Difficulty = getKeccak256Difficulty;
module.exports.getRipeMD160Difficulty = getRipeMD160Difficulty;
module.exports.getDoubleSHA256Challenge = getDoubleSHA256Challenge;
module.exports.getKeccak256Challenge = getKeccak256Challenge;
module.exports.getRipeMD160Challenge = getRipeMD160Challenge;
module.exports.web3 = web3;