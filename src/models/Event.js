var mongoose = require('mongoose')
const path = require('path')
var Schema = mongoose.Schema

var userSchemaNew = new Schema({
    name : {
        type : String,
        required : "Unable to find the user name", 
    },
    email : {         
        type : String,
        required : [true, "Email not provided." ],
        lowercase: true,
        trim: true,
        validate : {
            validator : function(v) {
                return /^[a-zA-Z0-9_.+]*[a-zA-Z][a-zA-Z0-9_.+]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
                
            },
            message : "Invalid email."
        },

    },
    role:{
        type : String, 
        required : [true, " Role not provided"],
        enum : ["organiser", "participant"]
}
})

var eventSchema = new Schema({
    eventName : {
        type : String,
        required : [true, "Please provide a valid name for the event."],
        unique: [true, "Event Name Already Exists."]
    },
        createdAt : {  
        type: Date,
        default :Date.now,
    },
    eventStartDateTime : {
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
    participants : [{
        type: userSchemaNew
    }], 
    createdBy : {
      type: userSchemaNew,
      required : true
    }
})

module.exports = mongoose.model("Event",eventSchema)