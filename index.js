const cluster = require('cluster');
const inquirer = require('inquirer');
const miner = require('./miner');
const util = require("./utils");
const api = require('./api');
const numCPUs = require('os').cpus().length;

var hashcount = 0;
var lastCheck = Date.now();
var oldDiff;
var oldChall;

function varHandler(msg) {
    if(oldChall != msg.challenge || oldDiff != msg.difficulty){
        console.log("Difficulty: " + msg.difficulty);
        console.log("Challenge: " + msg.challenge);
        oldChall = msg.challenge;
        oldDiff = msg.difficulty;
    }
}

function hashHandler(msg) {
    hashcount += msg;
    if (Date.now() - lastCheck >= 5000){
        console.log(util.numToSI((hashcount)/5));
        lastCheck = Date.now();
        hashcount = 0;
    } 
}

async function start(){
    var accounts = [];
    var address;
    await api.getAccounts().then((result) => {
        accounts = result;
    });
    var questions = [
        {
            type: 'list',
            name: 'account',
            message: 'Address',
            choices: accounts
        },
        {
            type: 'password',
            name: 'password',
            message: 'Password'
        },
        {
            type: 'list',
            name: 'algorithm',
            message: 'Algorithm',
            choices: ["Double Sha256", "Keccak256", "RipeMD160"]
        },
        {
            type: 'confirm',
            name: 'multiThread',
            message: 'MultiThreaded?',
            default: true
        }
    ];
    inquirer.prompt(questions).then(async function (answers) {
        await api.getBalance(answers.account).then((balance) => {
            console.log("Balance: " + balance + " EQC");
        });
        if (answers.multiThread = false){
            numCPUs = 1;
        }
        for (var i = 0; i < numCPUs; i++) {
            var worker = cluster.fork(answers);
            worker.on('message', function(msg){
                switch(msg.type) {
                    case "vars":
                        varHandler(msg.msg);
                        break;
                    case "hash":
                        hashHandler(msg.msg);
                        break;
                }
            });
        }
    });
}

if(cluster.isMaster) {
    start();
} else {
    api.setPassword(process.env.password);
    miner(process.env.algorithm, process.env.account);
}