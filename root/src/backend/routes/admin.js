const express = require('express');
const router = express.Router();
const User = require('../models/users');


router.post('/login', async(req, res)=>{
    if(req.body.email && req.body.password) {
        try {
            const adminData = await User.findOne({email: req.body.email, password: req.body.password});
            if(adminData === null){
                res.status(404);
                res.send({
                    status: 'ERROR',
                    message: "Cannot find user"
                });
            } else {
                console.log("Admin "+req.body.email+" Logged In.")
                res.send({
                    status: 'OK',
                    message: "Success",
                    data: userData
                });
            }
        } catch(err) {
            console.log("ERROR!!! => Internal Server error"+err)
            res.status(500);
            res.send({
                status: 'ERROR',
                message: "Server error"
            });
        }
    } else {
        console.log("ERROR!!! => Bad request")
        res.status(400);
        res.send({
            status: 'ERROR',
            message: "Bad request, Incorrect parameters provided"
        });    
    }
});

module.exports = router;
