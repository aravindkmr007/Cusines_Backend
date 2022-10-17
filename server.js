const express =  require("express")
const app  = express()
const morgan  = require("morgan")
const PORT =  3011
const mongoose = require("mongoose");
const cors = require("cors")
const bodyParser = require("body-parser")
const logger = require("./util/logger")
app.use(express.json())
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("dotenv").config

app.use(morgan("dev"))
mongoose.connect("mongodb://localhost:27017/Cusines",
() => {
    logger.info("<--------- DB is Conntected --------------->")

    console.log("DB is Conntected")
}, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })


app.get("/" , (req,res) => {
    res.status(200).send({message : "Connect to the Indian Cusine Recipe Backend" })
})

require('./routes')(app, {});

app.listen(PORT , () => {
    console.log("Server is Up and Running")
})