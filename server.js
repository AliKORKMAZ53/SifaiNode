const express = require('express');
const dotenv = require('dotenv');
//const morgan = require('morgan');
const winston = require('winston');
const bodyparser = require("body-parser");
const path = require('path');
const createError = require('http-errors');
const cors = require('cors');

const connectDB = require('./server/database/connection');

const app = express();

app.use(cors());

dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT || 8080



// log requests
/*
app.use(morgan(':method :url :status :res[header] - :response-time ms :postData'));

morgan.token('postData', (request) => {
  if (request.method == 'POST' || request.method == 'PUT') return ' ' + JSON.stringify(request.body);
  else return ' ';
});
*/

//morgan.token('response-body', (req, res) => {return JSON.stringify(req.body)});

// mongodb connection
connectDB();

app.use(express.json());
// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))


// set view engine
app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

// load routers
app.use('/', require('./server/routes/router'))

app.listen(PORT, ()=> { console.log(`Server is running on address:${PORT}`)});