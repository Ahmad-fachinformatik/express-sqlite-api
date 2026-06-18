const express = require("express");
const database = require("./database");

const customersRouter = require("./routes/customers");
const productsRouter = require("./routes/products");

const app = express();

const port = 3000;

app.use(express.json());


app.get("/", function (request, response) {
    response.status(200).send("Welcome to my API");
});

app.use("/customers", customersRouter);
app.use("/products", productsRouter);

app.listen(port, function () {
    console.log("Server is running on port " + port);
    console.log("http://localhost:" + port);
});