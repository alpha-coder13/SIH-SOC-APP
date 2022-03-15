const express = require('express');
const router = express.Router();
const { uuid } = require('uuidv4');
const http = require('http');

const ROOMS = [];
const MEMBERS = {};
const MESSAGES = {};

router.post('/newroom', (req, res) => {
    console.log(req.body)
    try {
        let RID = 0;
        while(true)
        {
            let roomID = uuid();
            let f=0;
            for(let i=0; i<ROOMS.length; i++) {
                if(ROOMS[i]==req.body.roomID)   {
                    f=1;
                    break;
                }
            }
            if(f) {
                continue;
            } else {
                RID = roomID;
                break;
            }
        }
        ROOMS.push(RID);
        MEMBERS[RID]=[];
        MESSAGES[RID]=[];
        console.log("User "+req.body.email+" created a meeting room with ID "+RID);
        console.log(ROOMS);
        console.log(MEMBERS);
        res.status(200);
        res.send({
            status: 'OK',
            roomID: RID
        });
        MESSAGES[RID]=[];
    } catch (err) {
        console.log("ERROR!!! => Internal Server error", err)
        res.status(500);
        res.send({
            status: 'ERROR',
            message: "Server error"
        });
    }
})
  
router.post('/joinroom', (req, res) => {
    if(!(req.body.roomID)){
        res.status(400);
            res.status({
                status: 'ERROR',
                message: 'No such Meeting ID exists' 
            })
        return;
    }
    try {
        let f=0;
            for(let i=0; i<ROOMS.length; i++) {
                if(ROOMS[i]==req.body.roomID)   {
                    f=1;
                    break;
                }
                console.log(f)
            }
        if(f) {
            res.status(200);
            res.send({ 
                status: 'OK',
                roomId: req.body.roomID 
            })
            MEMBERS[req.body.roomID].push(req.body.email);
            console.log("User "+req.body.email+" joined a meeting room with ID "+req.body.roomID);
        } else {
            res.status(400);
            res.status({
                status: 'ERROR',
                message: 'No such Meeting ID exists' 
            })
        }
        console.log(ROOMS);
        console.log(MEMBERS);
    } catch (err) {
        console.log("ERROR!!! => Internal Server error", err)
        res.status(500);
        res.send({
            status: 'ERROR',
            message: "Server error"
        });
    }
})

router.post('/message', (req, res)=>{
    try {
        if(req.body.roomID && req.body.email && req.body.message)
        {
            let f=0;
            for(let i=0; i<ROOMS.length; i++) {
                if(ROOMS[i]==req.body.roomID)   {
                    f=1;
                    break;
                }
            }
            const nsfwstatus = req.body.nsfw||false;
            MESSAGES[req.body.roomID].push({email:req.body.email, message:req.body.message, nsfw: nsfwstatus });
        }
        res.status(400);
        res.status({
            status: 'ERROR',
            message: 'No such Meeting ID exists' 
        })
        console.log(MESSAGES);
    }   catch (err) {
        console.log("ERROR!!! => Internal Server error", err)
        res.status(500);
        res.send({
            status: 'ERROR',
            message: "Server error"
        });
    }
})

router.post('/getMessages', (req, res)=>{
    //console.log("Called")
    if(req.body.roomID )    {
        let f=0;
        for(let i=0; i<ROOMS.length; i++) {
            if(ROOMS[i]==req.body.roomID)   {
                f=1;
                break;
            }
        }
        //console.log('messages',MESSAGES[req.body.roomID]);
        res.status(200);
        res.send({
            status: "OK",
            messagedata: MESSAGES[req.body.roomID],
        })
    }
    res.status(400);
    res.status({
        status: 'ERROR',
        message: 'No such Meeting ID exists' 
    })
})

module.exports = router;