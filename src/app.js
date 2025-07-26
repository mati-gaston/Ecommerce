const express = require('express');
const app = express();

// Middlewares
app.use(express.json());

// Rutas
const productsRoutes = require('./rutas/productosRuta');
const cartsRoutes = require('./rutas/cartsRuta');

app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes); // ✅ corregido aquí

module.exports = app;
