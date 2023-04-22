const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./src/routes/routes');

//Server Configs's section
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', routes);
dotenv.config();

//Connection Section

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ` + port);
});
