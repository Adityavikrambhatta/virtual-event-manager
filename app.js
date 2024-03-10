const express = require('express');
const app = express();
const port = 3000;
const path = require('path')
const mongoose = require('mongoose')


require('dotenv').config();

// const eventsRouters =require(path.join(__dirname, "src", "routers", "eventsrouters.js"))
const {signUp, login} = require(path.join(__dirname,"src", "routers", "authrouters.js"))

app.use(express.json());

try{
    mongoose.connect("mongodb://localhost:27017/eventManagerDb",{
            useUnifiedTopology: true,
            useNewUrlParser: true
    });
    console.log("Connected to the DB")

}catch(err){
    console.log("Connection to the DB failed")
}



app.get('/', (req, res)=>{
    return res.status(200).send("<HTML><h1>Server  Initialised . <br/> Welcome to 'Virtual Event Management'  </h1></HTML>")
});

app.post('/register', signUp );
app.post('/login', login ) ;

// app.use("/events", eventsRouters )


app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;