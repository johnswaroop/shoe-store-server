const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 5000;
const urls = require('./links.json')

mongoose.connect('mongodb+srv://john:0XdrrfWP3RSEdOJH@cluster0.wzne0.mongodb.net/shoeStore', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log("-- DB CONNECTED --");
})

const productsSchema = new mongoose.Schema({
    name: String,
    url: String,
    price: Number
})

const Products = mongoose.model('Products', productsSchema);

const getProducts = async () => {
    const res = await Products.find({});
    return res;
}


app.get("/api/products", async (req, res) => {
    res.json(await getProducts());
})

app.listen(port, () => {
    console.log("-- SERVER STARTED --");
})