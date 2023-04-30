const { ethers } = require('ethers');
const dotenv = require('dotenv');
const { readableValue } = require('../utils/format');
dotenv.config();

const abi = require('../../artifacts/contracts/Lottery.sol/Lottery.json').abi;

const contractAddress = process.env.CONTRACT_ADDRESS;

const provider = new ethers.providers.JsonRpcProvider(process.env.APP_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contract = new ethers.Contract(contractAddress, abi, signer);

const etherscanKey = process.env.ETHERSCAN_KEY;

provider.on('pending', (tx) => {
  console.log('New pending transaction:', tx);
});

const PaymentController = {
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
      }
    } catch (error) {
      res.status(500).json({
        message: error + '',
      });
    }
  },
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
        await contract.addTicket(player, lotteryNumber);
        res.status(201).json({
          message: 'Create Lottery Successfully',
          lottery: lotteryNumber,
        });
      }
      else {
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
      await contract.destroy()
      res.status(200).json({
        message: 'success'
      })
    } catch (error) {
      res.status(500).json({
        error: error + ''
      })
    }
  },
};

module.exports = PaymentController;
