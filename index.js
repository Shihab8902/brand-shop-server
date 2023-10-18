require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

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

        const productCollection = client.db("productDB").collection("products");
        const slidersCollection = client.db("productDB").collection("sliders");



        //GET products
        app.get("/products", async (req, res) => {
            const result = await productCollection.find().toArray();
            res.send(result);
        });


        //GET single product
        app.get("/product/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await productCollection.findOne(query);
            res.send(result);
        });


        //POST product
        app.post("/products", async (req, res) => {
            const document = req.body;
            const result = await productCollection.insertOne(document);
            res.send(result);
        });




        //GET sliders
        app.get("/sliders", async (req, res) => {
            const sliders = await slidersCollection.find().toArray();
            res.send(sliders);
        });




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