const keccak256 = require('js-sha3').keccak256;

module.exports = function(bytes){
    return keccak256.array(bytes);
}