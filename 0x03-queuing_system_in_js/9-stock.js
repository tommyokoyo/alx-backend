const express = require('express');
const redis = require('redis');
const { promisify } = require('util');

// Create an Express app
const app = express();
const port = 1246;

// Create a Redis client
const redisClient = redis.createClient();

// Promisify Redis functions
const hsetAsync = promisify(redisClient.hset).bind(redisClient);
const hgetAsync = promisify(redisClient.hget).bind(redisClient);

// Sample product data
const listProducts = [
    { itemId: 1, itemName: 'Suitcase 250', price: 50, initialAvailableQuantity: 4 },
    { itemId: 2, itemName: 'Suitcase 450', price: 100, initialAvailableQuantity: 10 },
    { itemId: 3, itemName: 'Suitcase 650', price: 350, initialAvailableQuantity: 2 },
    { itemId: 4, itemName: 'Suitcase 1050', price: 550, initialAvailableQuantity: 5 },
];

// Function to reserve stock by itemId
async function reserveStockById(itemId, stock) {
    await hsetAsync('item', itemId, stock);
}

// Function to get current reserved stock by itemId
async function getCurrentReservedStockById(itemId) {
    const reservedStock = await hgetAsync('item', itemId);
    return parseInt(reservedStock) || 0;
}

// Middleware to set headers for JSON response
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});

// Route to list all products
app.get('/list_products', (req, res) => {
    res.json(listProducts.map((product) => ({
        itemId: product.itemId,
        itemName: product.itemName,
        price: product.price,
        initialAvailableQuantity: product.initialAvailableQuantity,
    })));
});

// Route to get product details by itemId
app.get('/list_products/:itemId', async (req, res) => {
    const itemId = parseInt(req.params.itemId);
    const product = listProducts.find((p) => p.itemId === itemId);

    if (!product) {
        res.json({ status: 'Product not found' });
    } else {
        const currentQuantity = await getCurrentReservedStockById(itemId);
        res.json({ ...product, currentQuantity });
    }
});

// Route to reserve a product by itemId
app.get('/reserve_product/:itemId', async (req, res) => {
    const itemId = parseInt(req.params.itemId);
    const product = listProducts.find((p) => p.itemId === itemId);

    if (!product) {
        res.json({ status: 'Product not found' });
    } else {
        const currentQuantity = await getCurrentReservedStockById(itemId);

        if (currentQuantity < 0) {
            res.json({ status: 'Not enough stock available', itemId });
        } else {
            await reserveStockById(itemId, currentQuantity - 1);
            res.json({ status: 'Reservation confirmed', itemId });
        }
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});