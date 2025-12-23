require("dotenv").config()
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000
app.use(express.json()); // Parse JSON request bodies

//Route to list the items out of stock
app.get("/products/nostock", (req, res) => {
    const noStock = products.filter(p => p.stock === 0)
    res.status(200).json(noStock)
})

//Route to add a new item and stock number
app.post("/products", (req, res) => {
    const newItem = {id: products.length + 1, item: req.body.item, stock: req.body.stock}
    if(!req.body.item || !req.body.stock || req.body.stock < 0){
        return res.status(400).json({error: "Please make sure that both item and stock are present"})
    }
    products.push(newItem)
    res.status(201).send("New item added successfully!")
})

//Route to edit the number of items in stock
app.patch("/products/:id", (req, res) => {
    const product = products.find(p => p.id === Number.parseInt(req.params.id))
    if(!product){
        return res.status(404).json({error: "Product does not exist"})
    }
    if(Number.parseInt(req.body.stock) >= 0){
        product.stock = req.body.stock
        return res.status(200).json(product)
    }
    return res.status(400).json({error: "Please enter valid values for the stock"})
})

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
})
