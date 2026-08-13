const mongoose = require("mongoose");
require("dotenv");

const dbConnect = () =>{
    mongoose.connect(process.env.URL).then(()=>{
        console.log("db connection is successfull.")
    }).catch((error)=>{
        console.log("Error in db connection.");
        console.error(error);
    })
}

module.exports = dbConnect;