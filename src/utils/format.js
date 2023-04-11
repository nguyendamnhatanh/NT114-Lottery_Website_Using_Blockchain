const { ethers } = require('ethers');

function readableValue(value) {
  return ethers.utils.formatEther(value);
}

module.exports = {
  readableValue: readableValue
}