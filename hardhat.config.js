require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const APP_URL = process.env.APP_URL;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.18',
  networks: {
    sepolia: {
      url: APP_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};
