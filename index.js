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

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


const connectDB = async () => {
    try {
        await client.connect();

        const productCollection = client.db("productDB").collection("products");



        //GET products
        app.get("/products", async (req, res) => {
            const result = await productCollection.find().toArray();
            res.send(result);
        })









        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    finally {

    }
}
connectDB().catch(console.dir);



app.get("/", (req, res) => {
    res.send("Server is up and running....");
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});