const { ethers } = require('ethers');
const dotenv = require('dotenv');
const res = require('express/lib/response');
const { readableValue } = require('../utils/format');
dotenv.config();

const abi = require('../../artifacts/contracts/Lottery.sol/Lottery.json').abi;

const contractAddress = process.env.CONTRACT_ADDRESS;

const provider = new ethers.providers.JsonRpcProvider(process.env.APP_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contract = new ethers.Contract(contractAddress, abi, signer);

const PaymentController = {
  getAllTransactions: async (req, res) => {
    try {
      let etherscanProvider = new ethers.providers.EtherscanProvider('sepolia');
      const histories = await etherscanProvider.getHistory(contractAddress);
      if (histories) {
        res.status(200).json({
          transactions: histories,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error + '',
      });
    }
  },
  generateLottery: async (req, res) => {
    try {
      let etherscanProvider = new ethers.providers.EtherscanProvider('sepolia');
      const histories = await etherscanProvider.getHistory(contractAddress);

      let txHash = req.body.txHash;
      let ticketPrice = req.body.ticketPrice;

      let noTransaction = !histories.some(item => item.hash === txHash);
      if (noTransaction) {
        res.status(429).json({
          message: 'No Transaction Found',
        });
      }

      const hasTransaction = histories.some(
        (item) =>
          item.hash === txHash && readableValue(item.value) >= ticketPrice
      );

      let fisrtTransaction = histories.find(item => item.hash === txHash); 
      let invalidTransaction = readableValue(fisrtTransaction.value) <= ticketPrice;
      
      if (invalidTransaction) {
        res.status(429).json({
          message: "insufficient funds"
        })
      }

      if (hasTransaction) {
        let lotteryNumber = Math.floor(100000 + Math.random() * 900000);
        await contract.addTicket(lotteryNumber);
        res.status(201).json({
          message: 'Create Lottery Successfully',
          lottery: lotteryNumber,
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
