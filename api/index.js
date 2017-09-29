const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const abi = require('../resources/floatcoin_abi.js');
const FloatCoin = new web3.eth.Contract(abi);

var password = "";

FloatCoin.options.address = '0xb9D65389cFAE5B64fA666ef222038Aa5AEB0772c';

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

async function claimDoubleSHA256Reward(address, nonce, poolNonce){
    await unlockAccount(address);
    FloatCoin.methods.claimDoubleSHA256Reward(nonce, poolNonce).send({from: address}).on('transactionHash', function(txhash){
        console.log("Claiming Mining Reward with TXID " + txhash);
    }).on('receipt', async function(receipt){
        if (Object.getOwnPropertyNames(receipt.events).length > 0){
            console.log("Mining Reward Claimed");
            var balance;
            await getBalance(address).then(function(result){
                balance = result;
            });
            console.log("Current Balance: " + balance + " EQC");
        } else {
            console.log("Failed to claim mining rewards");
        }
    }).on('error', async function(err){
        console.log("Claim transaction was not mined within 50 blocks.");
        var balance;
        await getBalance(address).then(function(result){
            balance = result;
        });
        console.log("Current Balance: " + balance + " EQC");
    });
}

async function claimKeccak256Reward(address, nonce, poolNonce){
    await unlockAccount(address);
    FloatCoin.methods.claimKeccak256Reward(nonce, poolNonce).send({from: address}).on('transactionHash', function(txhash){
        console.log("Claiming Mining Reward with TXID " + txhash);
    }).on('receipt', async function(receipt){
        if (Object.getOwnPropertyNames(receipt.events).length > 0){
            console.log("Mining Reward Claimed");
            var balance;
            await getBalance(address).then(function(result){
                balance = result;
            });
            console.log("Current Balance: " + balance + " EQC");
        } else {
            console.log("Failed to claim mining rewards");
        }
    }).on('error', async function(err){
        console.log("Claim transaction was not mined within 50 blocks.");
        var balance;
        await getBalance(address).then(function(result){
            balance = result;
        });
        console.log("Current Balance: " + balance + " EQC");
    });
}

async function claimRipeMD160Reward(address, nonce, poolNonce){
    await unlockAccount(address);
    FloatCoin.methods.claimRipeMD160Reward(nonce, poolNonce).send({from: address}).on('transactionHash', function(txhash){
        console.log("Claiming Mining Reward with TXID " + txhash);
    }).on('receipt', async function(receipt){
        if (Object.getOwnPropertyNames(receipt.events).length > 0){
            console.log("Mining Reward Claimed");
            var balance;
            await getBalance(address).then(function(result){
                balance = result;
            });
            console.log("Current Balance: " + balance + " EQC");
        } else {
            console.log("Failed to claim mining rewards");
        }
    }).on('error', async function(err){
        console.log("Claim transaction was not mined within 50 blocks.");
        var balance;
        await getBalance(address).then(function(result){
            balance = result;
        });
        console.log("Current Balance: " + balance + " EQC");
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