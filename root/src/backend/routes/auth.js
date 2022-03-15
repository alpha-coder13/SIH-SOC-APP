const express = require('express');
const { getMaxListeners } = require('../models/users');
const router = express.Router();
const User = require('../models/users');


//---------------------------------------------------
//    Signup Route
//---------------------------------------------------

router.post('/signup', async(req, res) => {
    if(req.body.username && req.body.email && req.body.firstname && req.body.lastname && req.body.UID) {
        const user = new User({
            username:  req.body.username ,
            firstname: req.body.firstname ,
            lastname:  req.body.lastname ,
            email:     req.body.email ,
            UID: req.body.UID
        });
        try{
            await user.save();
            console.log("User "+req.body.email+" Signed UP.")
            res.status(201);
            res.send({
                status: 'OK',
                message: "Success"
            });
        } catch (err) {
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

//---------------------------------------------------
//    Login Route
//---------------------------------------------------

router.post('/login', async(req, res)=>{

    //*********** VPN Checking goes here *******************/

    if(req.body.email /*&& req.body.UID*/) {
        try {
            const userData = await User.findOne({email: 'test@gmail.com', UID:'519705c4d078f2d4295184afe93b0c7191e2a97db9a4f61486bbd0d24b087c27'});
            if(userData === null){
                res.status(404);
                res.send({
                    status: 'ERROR',
                    message: "Cannot find user"
                });
            } else if(userData.blocked==1) {
                res.status(403);
                res.send({
                    status: 'ERROR',
                    message: "You have been blocked. Contact admin if you think this might be a mistake."
                });
            } else if(userData.registered==0) {
                res.status(403);
                res.send({
                    status: 'ERROR',
                    message: "Your registration has not yet been approved by the admin."
                });
            } else {
                console.log("User "+req.body.email+" Logged In.")
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

//---------------------------------------------------
//    Logout Route
//---------------------------------------------------

router.post('/logout', (req, res)=>{
    console.log("User "+req.body.email+" Logged Out.")
    res.status(200);
    res.send({
        status: 'OK',
        message: "Successfully logged out"
    });
});

//---------------------------------------------------
//    Block user
//---------------------------------------------------

router.post('/block', async(req, res)=>{
    if(! req.body.email) {
        console.log("ERROR!!! => Bad request")
        res.status(400);
        res.send({
            status: 'ERROR',
            message: "Bad request, Incorrect parameters provided"
        });  
    } else {
        try
        {
            const user = await User.findOne({email: req.body.email})
            if (!user) {
                console.log("ERROR!!! : User "+req.body.email+" cannot be blocked. No matching record in database.")
            }
            await User.updateOne({email: req.body.email}, {blocked: 1});
            console.log("User "+req.body.email+" was Blocked.")
            res.status(200);
            res.send({
                status: 'OK',
                message: "Successfully blocked user"
            });
        } catch (err) {
            console.log("ERROR!!! => Internal Server error"+err)
            res.status(500);
            res.send({
                status: 'ERROR',
                message: "Server error"
            });
        }
    }
});

//---------------------------------------------------
//    Unblock User
//---------------------------------------------------

router.post('/unblock', async(req, res)=>{
    if(! req.body.email) {
        console.log("ERROR!!! => Bad request")
        res.status(400);
        res.send({
            status: 'ERROR',
            message: "Bad request, Incorrect parameters provided"
        });  
    } else {
        try
        {
            const user = await User.findOne({userID: req.body.email})
            if (!user) {
                console.log("ERROR!!! : User "+req.body.email+" cannot be unblocked. No matching record in database.")
            }
            await User.updateOne({email: req.body.email}, {blocked: 0});
            console.log("User "+req.body.email+" was unblocked.")
            res.status(200);
            res.send({
                status: 'OK',
                message: "Successfully unblocked user"
            });
        } catch (err) {
            console.log("ERROR!!! => Internal Server error"+err)
            res.status(500);
            res.send({
                status: 'ERROR',
                message: "Server error"
            });
        }
    }
});

//---------------------------------------------------
//    Register User
//---------------------------------------------------

router.post('/register', async(req, res)=>{
    if(! req.body.email) {
        console.log("ERROR!!! => Bad request")
        res.status(400);
        res.send({
            status: 'ERROR',
            message: "Bad request, Incorrect parameters provided"
        }); 
    } else {
        try
        {
            const user = await User.findOne({userID: req.body.email})
            if (!user) {
                console.log("ERROR!!! : User "+req.body.email+" cannot be registered. No matching record in database.")
            }
            await User.updateOne({email: req.body.email}, {regsitered: 1});
            console.log("User "+req.body.email+" registration approved by admin.")
            res.status(200);
            res.send({
                status: 'OK',
                message: "Successfully registered user"
            });
        } catch (err) {
            console.log("ERROR!!! => Internal Server error"+err)
            res.status(500);
            res.send({
                status: 'ERROR',
                message: "Server error"
            });
        }
    }
});

module.exports = router;