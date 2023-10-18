require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');

const port = process.env.PORT || 9000;

//middlewares
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kitiq8p.mongodb.net/?retryWrites=true&w=majority`;




app.get("/", (req, res) => {
    res.send("Server is up and running....");
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});