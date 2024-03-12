const express = require("express");
const eventRouter = express.Router();
const path = require("path");
const User = require (path.join("..", "models", "user.js"));
const Event = require(path.join("..", "models", "event.js"));


// routers.get('/', (req, res)=>{
//     console.log(req)
//     if (req.user ) {
//         User.findOne({ _id : id }).then(data => {
          
//             res.status(200).json({data})
//         }).catch(err =>{
//             return res.status(500).send("Preferences not found.")
//         })
//     } else {
//         return res.status(401).send("Unable to Authenticate.")
//     }
// })

eventRouter.post('/', (req,res)=>{
    console.log(req.body)
    if( req.body.createdBy && req.body.createdBy.role == "organiser"){
        var {eventName, eventStartDateTime, duration, createdBy, participants, 
            eventDescription,createdAt  } = req.body     
        const event = Event({   
        eventName : eventName,
        eventStartDateTime : eventStartDateTime, 
        duration : duration ? duration : 30,
        createdAt : createdAt,
        createdBy: {
            name :  createdBy.name,
            email : createdBy.email, 
            role : createdBy.role,
        },
        eventDescription : eventDescription ? eventDescription : "",
        participants : participants ? participants : [createdBy]
        })
        event
        .save()
        .then((data) => {
        return res
            .status(200)
            .json({ user: data, message: "User created successfully." });
        })
        .catch((err) => {
        return res.status(400).send({ message: err });
        });
    } else {
        res.status(403).send("Unauthorized to perform this action.")
    } 
})

module.exports = eventRouter