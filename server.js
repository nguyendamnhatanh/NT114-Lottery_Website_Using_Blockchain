const app = require('./src/utils/app');
const schedule = require('node-schedule');
const fs = require('fs');
const winner = require('./src/data/player.js').winner;
const players = require('./src/data/player.js').players;
const { contract } = require('./src/utils/contract');

app.startApp();

const io = app.io;

io.on('connection', (socket) => {
  socket.on('testRandom', async (data) => {
    if (data === 'test') {
      console.log('test');
      const tickets = await contract.getCurrentTickets();
      const random = Math.floor(Math.random() * tickets.length);
      if (tickets && tickets[random]) {
        let number = Number(
          BigInt(parseInt(tickets[random].lotteryCode._hex, 16))
        );
        app.io.emit('testRandom', number);
        winner['address'] = tickets[random].player;
        winner['number'] = number;
        console.log(winner);
      }
    }
  });
});

// const now = new Date();
// const date = new Date(now.getTime() + 4 * 1000);

// const job = schedule.scheduleJob(date, async function () {
//   console.log('run');
//   const random = Math.floor(Math.random() * players.length);
//   const tickets = await contract.getCurrentTickets();
//   if (tickets && tickets[random]) {
//     let number = Number(BigInt(parseInt(tickets[random].lotteryCode._hex, 16)));
//     console.log(number);
//     app.io.emit('pick winner', number);
//     winner['address'] = tickets[random].player;
//     winner['number'] = number;
//     console.log(winner);
//   }
// });
