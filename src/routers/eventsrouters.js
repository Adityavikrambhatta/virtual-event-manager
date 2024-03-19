const express = require("express");
const eventRouter = express.Router();
const path = require("path");
const User = require(path.join("..", "models", "user.js"));
const Event = require(path.join("..", "models", "event.js"));
const Validators = require(path.join("..", "helpers", "validator.js"));
const _ = require("lodash");

eventRouter.get("/:id", (req, res) => {
    if (req.user && req.user.role == "organiser") {
        var { id } = req.params;
        Event.findOne({ _id: id })
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch((err) => {
                return res.status(500).send("Unable to find event");
            });
    } else {
        res.status(403).send("Unauthorized to perform this action.");
    }
});

eventRouter.post("/", (req, res) => {
    
    if (req.user && req.user.role == "organiser") {
        var {
            eventName,
            eventStartDateTime,
            duration,
            createdBy,
            participants,
            eventDescription,
            createdAt,
        } = req.body;

        const event = Event({
            eventName: eventName,
            eventStartDateTime: eventStartDateTime,
            duration: duration ? duration : 30,
            createdAt: createdAt,
            createdBy: {
                name: createdBy.name,
                email: createdBy.email,
                role: createdBy.role,
            },
            eventDescription: eventDescription ? eventDescription : "",
            participants: participants ? participants : [createdBy],
        });
        console.log(event)
        event
            .save()
            .then((data) => {
                return res
                    .status(200)
                    .json({ event: data, message: "User created successfully." });
            })
            .catch((err) => {
                return res.status(400).send({ message: err });
            });
    } else {
        res.status(403).send("Unauthorized to perform this action.");
    }
});
eventRouter.put("/:id", (req, res) => {
    if (req.user && req.user.role == "organiser") {
        var { id } = req.params;
        if (
            !Validators.validatePropsNotNeeded(req.body).status &&
            Validators.validateForUpdate(req.body).status
        ) {
            Event.findOne({ _id: id })
                .then((data) => {
                    let oldEventData = _.cloneDeep(data);
                    let eventUpdates = req.body;

                    _.keys(eventUpdates).map((key) => {
                        if (key == "participants") {
                            oldEventData[key] = [...oldEventData[key], ...eventUpdates[key]];
                        } else {
                            oldEventData[key] = eventUpdates[key];
                        }
                    });
            
                    console.log("oldEventData ", oldEventData);
                    Event.findByIdAndUpdate(id, {
                        oldEventData
                    })
                        .then((updatedData) => {
                            console.log(updatedData, " data ");
                            return res
                                .status(200)
                                .json({
                                    updatedData,
                                    message: " Event is successfully updated. ",
                                });
                        })
                        .catch((err) => {
                            return res
                                .status(500)
                                .json({ message: "Couldn't update event. ", error: err });
                        });
                })
                .catch((err) => {
                    return res.status(500).send("Unable to find event.");
                });
        } else {
            return res.status(500).send("Unable to validate event properties.");
        }
    } else {
        res.status(403).send("Unauthorized to perform this action.");
    }
});

eventRouter.delete("/:id", (req, res) => {
    if (req.user && req.user.role == "organiser") {
        var { id } = req.params;
        Event.deleteOne({_id : id}).then(data =>{
            return res.status(200).json({ data : data, message : "The event has been removed from the Event list."})
        }).catch(err =>{
            return res.status(500).json({ err : err, message : "Unable to delete event."})
        })
    } else {
        res.status(403).send("Unauthorized to perform this action.");
    }
})
module.exports = eventRouter;


