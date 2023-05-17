const app = require('./src/utils/app');
const schedule = require('node-schedule');

app.startApp();

app.io.on('connection', () => {
  console.log('user connected');
});

const now = new Date();
const date = new Date(now.getTime() + 4 * 1000);

const job = schedule.scheduleJob(date, function () {
  const random = Math.floor(100000 + Math.random() * 900000);
  console.log('Random:' + random);
  app.io.emit('pick winner', random);
});

console.log("test")