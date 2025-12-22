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
