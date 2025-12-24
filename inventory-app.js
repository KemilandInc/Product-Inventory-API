require("dotenv").config()
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json()); // Parse JSON request bodies

// In-memory 'database' (array of objects)
// (Task 2)
let products = [
  { id: 1, item: "Plywood", stock: 90 },
  { id: 2, item: "Hammer", stock: 77 },
];

// Helper function to find a product by ID
const findProductById = (id) => products.find(p => p.id === Number.parseInt(id));

// ROUTES
// These are the API interaction points that you guys will complete the logic for.
// Continue with CRUD operations for the inventory management system.

//(Task 3)
app.get("/products", (req, res) => {
  res.json(products);
});

//Routes to list items currently in stock (Task 5)
app.get("/products/instock", (req, res) => {
  const inStockProducts = products.filter((p) => p.stock > 0);
  res.json(inStockProducts);
});

//Route to list the items out of stock
app.get("/products/nostock", (req, res) => {
    const noStock = products.filter(p => p.stock === 0)
    res.status(200).json(noStock)
})

// (Task 4)
app.get("/products/:id", (req, res) => {
  // const id = Number(req.params.id); Converted to number which is parsedInt below
  // const product = products.find((i) => i.id === id); finding product by id

  // Using helper function to find product by ID
  const product = findProductById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});


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

//Route to remove a particular item
app.delete("/products/:id", (req, res) => {
  const product = products.find(p => p.id === Number.parseInt(req.params.id))
  const newProducts = products.filter(p => p.id !== product.id)
  if(newProducts.length === products.length) return res.status(404).json({error: "Product removal unsuccessful :("})
  products = newProducts
  res.status(204).send()
})


app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
})
