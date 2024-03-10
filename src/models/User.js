var mongoose = require('mongoose')

var Schema = mongoose.Schema


var userSchema = new Schema({

    name : {
        type : String,
        required : [true, "Full Name not provided."]

    },
    email : {
        type : String,
        required : [true, "Email not provided." ],
        lowercase: true,
        trim: true,
        unique: [true, "Email already exist in the database."],
        validate : {
            validator : function(v) {
                return /^[a-zA-Z0-9_.+]*[a-zA-Z][a-zA-Z0-9_.+]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
                
            },
            message : "Invalid email."
        },
        
    },
    password :{
            type : String, 
            required : "Password not provided",
    },
    role:{
            type : String, 
            required : [true, " Role not provided"],
            enum : ["organiser", "participant"]
    },
    created :{
            type: Date,
            default :Date.now
    }

})
module.exports = mongoose.model("User", userSchema)