var common = module.exports;

var path = require('path');
var fs = require('fs');
var root = path.join(__dirname, '..');

common.dir = {
  fixture: root + '/test/fixture',
  tmp: root + '/test/tmp',
};

// Create tmp directory if it does not exist 如果没有tmp文件夹，创建天麻片文件夹
// Not using fs.exists so as to be node 0.6.x compatible 为了兼容 node 0.6.x 不要使用 fs.exists
try {
  fs.statSync(common.dir.tmp);
}
catch (e) {
  // Dir does not exist 如果文件夹不存在
  fs.mkdirSync(common.dir.tmp);
}

common.CombinedStream = require(root);
common.assert = require('assert');
