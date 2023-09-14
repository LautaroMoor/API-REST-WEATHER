require('dotenv').config();
// console.log(process.env);

const Server = require('./models/server');

const svr = new Server();

svr.listen();