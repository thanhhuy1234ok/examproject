const express = require('express');
const swaggerDocs = require('./swagger');
var bodyParser = require('body-parser')
const path = require('path');
var cors = require('cors')
const app = express()

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors())

app.use(express.static(path.join(__dirname, 'public')));
require("./configs/connect.dbs")
// app.use('/', indexRouter)
app.use('/api/v1', require('./routes/index'));


swaggerDocs(app);


module.exports = app