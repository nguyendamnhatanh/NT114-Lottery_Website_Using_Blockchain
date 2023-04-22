const { ethers } = require('ethers');
const dotenv = require('dotenv');
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
      let player = req.body.playerAddress;

      let noTransaction = !histories.some((item) => item.hash === txHash);
      if (noTransaction) {
        res.status(429).json({
          message: 'No Transaction Found',
        });
      }

      const hasTransaction = histories.some(
        (item) =>
          item.hash === txHash && readableValue(item.value) >= ticketPrice
      );

      let fisrtTransaction = histories.find((item) => item.hash === txHash);
      let invalidTransaction =
        readableValue(fisrtTransaction.value) < ticketPrice;

      if (invalidTransaction) {
        res.status(429).json({
          message: 'insufficient funds',
        });
      }

      if (hasTransaction) {
        console.log("excecuted")
        let lotteryNumber = Math.floor(100000 + Math.random() * 900000);
        let expireDate = Math.floor(
          (new Date().getTime() + 7 * 24 * 60 * 60 * 1000) / 1000
        );  
        await contract.addTicket(player, lotteryNumber, expireDate);
        res.status(201).json({
          message: 'Create Lottery Successfully',
          lottery: lotteryNumber,
          expireDate: expireDate,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error + '',
      });
    }
  },
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
    const address = process.env.CONTRACT_ADDRESS;
    if (address) {
      res.status(200).json({
        message: 'success',
        address: address,
      });
    } else {
      res.status(500).json({
        message: 'No Address Found',
      });
    }
  },
};

module.exports = PaymentController;
