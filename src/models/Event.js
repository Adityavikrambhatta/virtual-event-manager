var mongoose = require('mongoose')

var Schema = mongoose.Schema

var eventSchema = new Schema({
    eventName : {
        type : String,
        required : [true, "Please provide a valid name for the event."],
        unique: [true, "Event Name Already Exists."]
    },
        createdAt : {  
        type: Date,
        default :Date.now
    },
    eventStartTime : {
        type : Date,
        required : true
    },
    eventDescription : {
        type : String,
    },
    duration : {
        type : Number,
        required : [true, "Please provide the duraton of the event."],
        minimum : 30
    },
    participants : {
        type : [String]
    }
})

module.exports = mongoose.model("Event",eventSchema)