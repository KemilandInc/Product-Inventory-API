const express = require('express');
const app = express();

app.use(express.json()); // Parse JSON request bodies

// In-memory 'database' (array of objects)
let products = [
    { id: 1, item: 'Plywood', stock: 90 },
    { id: 2, item: 'Hammer', stock: 77 }
];

// Helper function to find a product by ID
const findProductById = (id) => products.find(p => p.id === parseInt(id));

// ROUTES 
// These are the API interaction points that you guys will complete the logic for.
// Continue with CRUD operations for the inventory management system.


// DELETE A PRODUCT BY ID
app.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === productId);

    if (index === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }

    products.splice(index, 1);

    res.json({ message: 'Product deleted successfully' });
});