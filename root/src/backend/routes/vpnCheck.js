const cors= require('cors')
const express=require('express');
const fetch= require('cross-fetch');
const route= express.Router();
const bodyParser = require('body-parser');
const os= require('os');
route.post("/check",bodyParser.json(),(req,res)=>{
    let object= {'host':req.socket.remoteAddress};
    fetch("http://localhost:6000/api/vpndetect/checkip",{
    method: 'POST',
    headers:{
        'Content-type' : 'application/json'
    },
    body:JSON.stringify(object)
    }).then((result)=> result.json()).then((data)=>{console.log(data),res.send(data)})
})
module.exports =route;