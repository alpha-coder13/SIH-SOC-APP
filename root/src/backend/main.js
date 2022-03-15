require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const cors = require("cors");
const mongoose = require('mongoose');

const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => console.log(error));


//---------------------------------------------------
//    Server setup
//---------------------------------------------------

const io = new Server(server, { cors: { origin: '*' } });
const RESTPORT = process.env.RESTPORT;
const SOCKETPORT = process.env.SOCKETPORT;
const jsonParser = new bodyparser.json();
const urlParser = new bodyparser.urlencoded({extended:false});
app.use(jsonParser);
app.use(urlParser);
app.use(cors({
    origin: "*",
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
}));


//---------------------------------------------------
//    Logging Utils
//---------------------------------------------------

var fs = require('fs');
var util = require('util');
var logFile = fs.createWriteStream('./logs/authlog.txt', { flags: 'a' });
var logStdout = process.stdout;

console.log = function () {     // Overloading the console.log function
    const date = new Date();
    const format = date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear()+'-'+date.getHours()+'-'+date.getMinutes()+'-'+date.getSeconds()+'  =>  '
  logFile.write(format + util.format.apply(null, arguments) + '\n');
  logStdout.write(util.format.apply(null, arguments) + '\n');
}


//---------------------------------------------------
//    REST application
//---------------------------------------------------


app.get('/', (req, res)=>{
    res.send("Welcome to the application");
});

const authRoute = require('./routes/auth');
app.use('/auth', authRoute);

const roomRoute = require('./routes/rooms');
app.use('/rooms', roomRoute);

const adminRoute = require('./routes/admin');
app.use('/admin', adminRoute);

const vpnroute=require('./routes/vpnCheck');
app.use('/vpn',vpnroute);

//---------------------------------------------------
//  SocketIO Application
//--------------------------------------------------



//---------------------------------------------------
//    Server main runners
//    Rest API : http://127.0.0.1:5000
//    SocketIO : http://127.0.0.1:8000
//---------------------------------------------------

app.listen(RESTPORT, ()=>{
    console.log("Server is up and running on port "+RESTPORT);
});

