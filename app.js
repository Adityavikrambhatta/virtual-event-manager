const express = require('express');
const app = express();
const port = 3000;
const path = require('path')
require('dotenv').config();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res)=>{
    return res.status(200).send("<HTML><h1>Server  Initialised . <br/> Welcome to 'Virtual Event Management'  </h1></HTML>")
});


app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;