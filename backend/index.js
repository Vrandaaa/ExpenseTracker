const express = require("express");
const app = express(); 
const cookieParser = require("cookie-parser");
require("dotenv").config();
var cors = require("cors");
const dbConnect = require("./config/database");
const routes = require("./routes/userRoutes");
dbConnect();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser())
app.use("/api/v1", routes);

app.listen(PORT, ()=>{
    console.log("server is sucessfully running at port ", PORT);
})



app.get('/',(req,res)=>{
    res.send("This is home page baby!");
})