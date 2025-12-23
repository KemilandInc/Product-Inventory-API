require("dotenv").config()
const express = require("express");
const app = express();

app.use(express.json()); // Parse JSON request bodies

// In-memory 'database' (array of objects)
let products = [
  { id: 1, item: "Plywood", stock: 90 },
  { id: 2, item: "Hammer", stock: 77 },
];

// Helper function to find a product by ID
const findProductById = (id) => products.find((p) => p.id === parseInt(id));

// ROUTES
// These are the API interaction points that you guys will complete the logic for.
// Continue with CRUD operations for the inventory management system.
app.get("/products", (req, res) => {
  res.json(products);
});

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

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
})
