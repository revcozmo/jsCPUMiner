const ripemd160 = require('ripemd160');
const util = require("../utils");

module.exports = function(bytes){
    var str = util.bytesToHex(bytes).match(/.{1,2}/g).map(function(v){
        return String.fromCharCode(parseInt(v, 16));
    }).join('');
    return util.hexToBytes(new ripemd160().update(str).digest('hex'));
}