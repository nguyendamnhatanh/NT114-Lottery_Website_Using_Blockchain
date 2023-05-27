const { ethers } = require('ethers');
const dotenv = require('dotenv');
const { contract } = require('../utils/contract');
const players = require('../data/player').players
dotenv.config();

const PaymentController = {
  generateLottery: async (req, res) => {
    try {
      let wssProvider = new ethers.providers.WebSocketProvider(
        'wss://eth-sepolia.g.alchemy.com/v2/PaYQty97bkPd0uDjTGjWX0eB8zAblAQE',
        'sepolia'
      );

      let txHash = req.body.txHash;
      let player = req.body.playerAddress;

      let transaction = await wssProvider.getTransaction(txHash);

      if (transaction) {
        let lotteryNumber = Math.floor(100000 + Math.random() * 900000);
        const rawTickets = tickets.filter((item) => item.player === player);
        if (rawTickets.length <= 5) {
          await contract.addTicket(player, lotteryNumber);
          res.status(201).json({
            message: 'Create Lottery Successfully',
            lottery: lotteryNumber,
          });
        } else {
          res.status(403).json({
            message: 'You have reached limit',
          });
        }
      } else {
        res.status(422).json({
          message: 'No transaction found',
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error + '',
      });
    }
  },
};

module.exports = PaymentController;
