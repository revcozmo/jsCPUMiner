const BigNumber = require("bignumber.js");

function bytesToHex(uint8arr) {
    if (!uint8arr) {
        return '';
    }
    var hexStr = '';
    for (var i = 0; i < uint8arr.length; i++) {
        var hex = (uint8arr[i] & 0xff).toString(16);
        hex = (hex.length === 1) ? '0' + hex : hex;
        hexStr += hex;
    }
    return hexStr;
}

function hexToBytes(str) {
    str = str.toLowerCase();
    if (!str) {
        return new Array();
    }
    var a = [];
    for (var i = 0, len = str.length; i < len; i+=2) {
        a.push(parseInt(str.substr(i,2),16));
    }
    return a;
}

function greaterThan(reference, comparator){
    if(reference instanceof Array){
        reference = bytesToHex(reference);
    }
    if(comparator instanceof Array ){
        comparator = bytesToHex(comparator);
    }
    if(typeof(reference) != 'object'){
        reference = new BigNumber(reference, 16);
    }
    if(typeof(comparator) != 'object'){
        comparator = new BigNumber(comparator, 16);
    }
    return new BigNumber(reference).greaterThan(comparator);
}

function numToSI(num) {
   var sizes = ['H/s', 'KH/s', 'MH/s', 'GH/s', 'TH/s'];
   if (num == 0) return '0 H/s';
   var i = parseInt(Math.floor(Math.log(num) / Math.log(1000)));
   return Math.round(num / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}


module.exports.bytesToHex = bytesToHex;
module.exports.hexToBytes = hexToBytes;
module.exports.greaterThan = greaterThan;
module.exports.numToSI = numToSI;
module.exports.randomInt = randomInt;