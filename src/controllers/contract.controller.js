const dotenv = require('dotenv');
const { readableValue } = require('../utils/format');
const { contract, contractAddress } = require('../utils/contract');
dotenv.config();

const ContractController = {
  getLotteryPool: async (req, res) => {
    try {
      const poolWei = await contract.getCurrentPoolBalance();
      const poolETH = readableValue(poolWei);

      if (poolETH) {
        res.status(200).json({
          message: 'success',
          pool: poolETH,
        });
      }
    } catch (error) {
      res.status(500).json({
        error: error + '',
      });
    }
  },
  getAddress: (req, res) => {
    if (contractAddress) {
      res.status(200).json({
        message: 'success',
        address: contractAddress,
      });
    } else {
      res.status(500).json({
        message: 'No Address Found',
      });
    }
  },
  getEntries: async (req, res) => {
    const entries = await contract.getAllPlayer();
    let unique = entries.filter(
      (value, index, array) => array.indexOf(value) === index
    );
    if (unique.length > 0) {
      res.status(200).json({
        message: 'success',
        players: unique,
      });
    } else {
      res.status(204).json({
        message: 'No Player in the lobby',
      });
    }
  },
  destroy: async (req, res) => {
    try {
      await contract.destroy();
      res.status(200).json({
        message: 'success',
      });
    } catch (error) {
      res.status(500).json({
        error: error + '',
      });
    }
  },
};

module.exports = ContractController;
