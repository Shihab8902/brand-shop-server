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
        const cartCollection = client.db("productDB").collection("cart");



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


        //PUT a product
        app.put("/update/:id", async (req, res) => {
            const document = req.body;
            const id = req.params;
            const updatedDocument = {
                $set: {
                    name: document.name,
                    brand: document.brand,
                    type: document.type,
                    price: document.price,
                    photo: document.photo,
                    rating: document.rating,
                    description: document.description
                }
            }
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };

            const result = await productCollection.updateOne(filter, updatedDocument, options);
            res.send(result);

        });



        //GET cart items
        app.get("/cart", async (req, res) => {
            const cartItems = await cartCollection.find().toArray();
            res.send(cartItems);
        });


        //POST cart items
        app.post("/cart", async (req, res) => {
            const cartDocument = req.body;
            const result = await cartCollection.insertOne(cartDocument);
            res.send(result);
        });



        //DELETE cart item
        app.delete("/cart/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: id };
            const result = await cartCollection.deleteOne(query)
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