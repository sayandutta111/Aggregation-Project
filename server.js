const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(cors());

mongoose.connect("mongodb://localhost:27017/mongolookupDB");

//create data
const productsSchema = {
  id: Number,
  title: String,
  price: Number,
};

const Product = mongoose.model("Product", productsSchema);

const product1 = new Product({
  id: 1,
  title: "phone",
  price: 400,
});

const product2 = new Product({
  id: 2,
  title: "laptop",
  price: 600,
});

const ordersSchema = {
  id: Number,
  item: String,
};
const Order = mongoose.model("Order", ordersSchema);

const order1 = new Order({
  id: 1,
  item: "laptop",
});
const order2 = new Order({
  id: 2,
  item: "phone",
});

const clientsSchema = {
  id: Number,
  name: String,
  orderId: Number,
};

const Client = mongoose.model("Client", clientsSchema);

const client1 = new Client({
  id: 1,
  name: "Marina",
  orderId: 2,
});
const client2 = new Client({
  id: 2,
  name: "Daniele",
  orderId: 1,
});

app.get("/products", (req, res) => {
  Product.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});
app.get("/orders", (req, res) => {
  Order.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "item",
        foreignField: "title",
        as: "output",
      },
    },
  ])
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});
app.get("/clients", (req, res) => {
  Client.aggregate([
    {
      $lookup: {
        from: "orders",
        localField: "orderId",
        foreignField: "id",
        as: "output",
      },
    },
  ])
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

app.listen(4000, function () {
  console.log("server running");
});
