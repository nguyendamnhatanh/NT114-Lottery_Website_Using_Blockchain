const { ethers } = require('ethers');
const dotenv = require('dotenv');
const { contractAddress } = require('../utils/contract');
const { contract, etherscanKey } = require('../utils/contract');
dotenv.config();

const TransactionController = {
  getAllTransactions: async (req, res) => {
    try {
      let etherscanProvider = new ethers.providers.EtherscanProvider(
        'sepolia',
        etherscanKey
      );
      const histories = await etherscanProvider.getHistory(contractAddress);
      if (histories) {
        res.status(200).json({
          transactions: histories,
        });
      } else {
        res.status(204).json({
          message: 'No Transaction Found',
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error + '',
      });
    }
  },
  getUserTickets: async (req, res) => {
    try {
      let player = req.query.player;
      const tickets = await contract.getCurrentTickets();
      const rawTickets = tickets.filter((item) => item.player === player);
      const userTickets = rawTickets.map((item) => {
        const value = {
          player: item[0],
          luckyNumber: String(BigInt(parseInt(item[1]._hex, 16))),
          createDate: String(BigInt(parseInt(item[2]._hex, 16))),
        };
        return value;
      });
      if (tickets && userTickets) {
        res.status(200).json({
          message: 'success',
          tickets: userTickets,
          limit: 5 - userTickets.length
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error + '',
      });
    }
  },
  getAllTickets: async (req, res) => {
    try {
      const rawTickets = await contract.getCurrentTickets();
      const tickets = rawTickets.map((item) => {
        const value = {
          player: item[0],
          luckyNumber: String(BigInt(parseInt(item[1]._hex, 16))),
          createDate: String(BigInt(parseInt(item[2]._hex, 16))),
        };
        return value;
      });
      res.status(200).json({
        message: 'success',
        tickets: tickets,
      });
    } catch (error) {
      res.status(500).json({
        message: error + '',
      });
    }
  },
};

module.exports = TransactionController;
