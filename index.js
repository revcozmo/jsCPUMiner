const inquirer = require('inquirer');
const miner = require('./miner');
const util = require("./utils");
const api = require('./api');
const numCPUs = require('os').cpus().length;

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
            type: 'input',
            name: 'intensity',
            message: 'Intensity (5 Recommended)',
            filter: Number
        }
    ];
    inquirer.prompt(questions).then(async function (answers) {
        await api.unlockAccount(answers.account, answers.password);
        await api.getBalance(answers.account).then((balance) => {
            console.log("Balance: " + balance + " FC");
        });
        api.setPassword(answers.password);
        miner(answers.algorithm, answers.account, answers.intensity);
    });
}

start();