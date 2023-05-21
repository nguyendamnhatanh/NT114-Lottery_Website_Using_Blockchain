const app = require('./src/utils/app');
const schedule = require('node-schedule');

app.startApp();

const io = app.io;

io.on('connection', (socket) => {
  socket.on('testRandom', (data) => {
    if (data === 'test') {
      const random = Math.floor(100000 + Math.random() * 900000);
      socket.emit('getTestNum', random);
    }
  });
});

const now = new Date();
const date = new Date(now.getTime() + 4 * 1000);

// const job = schedule.scheduleJob(date, function () {
//   const random = Math.floor(100000 + Math.random() * 900000);
//   console.log('Random:' + random);
//   app.io.emit('pick winner', random);
// });