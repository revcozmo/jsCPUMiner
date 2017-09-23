const sha256 = require('js-sha256').sha256;

module.exports = function(bytes){
    return sha256.array(sha256.array(bytes));
}