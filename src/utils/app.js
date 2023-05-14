const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('../routes/routes');

//Server Configs's section
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', routes);
dotenv.config();

const http = require('http').Server(app);

const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  },
});

//Connection Section
const port = process.env.PORT || 3000;
function startApp() {
  http.listen(port, () => {
    console.log(`Server listening on port ` + port);
  });
}

module.exports = {
  startApp,
  io
};
