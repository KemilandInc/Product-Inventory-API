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
// These are the API interaction points that your group members will complete the logic for.
// Continue with CRUD operations for the inventory management system.