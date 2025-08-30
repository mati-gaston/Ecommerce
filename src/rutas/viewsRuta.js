const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/Productmanager');
const manager = new ProductManager();

// Vista home.handlebars con productos (HTTP)
router.get('/home', async (req, res) => {
  const productos = await manager.obtenerTodos();
  res.render('home', { productos });
});

// Vista realTimeProducts.handlebars
router.get('/realtimeproducts', async (req, res) => {
  const productos = await manager.obtenerTodos();
  res.render('realTimeProducts', { productos });
});

module.exports = router;
