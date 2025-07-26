const express = require('express');
const router = express.Router();
const CartManager = require('../managers/CartManager');
const manager = new CartManager();

// POST /api/carts → Crear nuevo carrito
router.post('/', async (req, res) => {
  const nuevoCarrito = await manager.crearCarrito();
  res.status(201).json(nuevoCarrito);
});

// GET /api/carts/:cid → Obtener los productos de un carrito
router.get('/:cid', async (req, res) => {
  const cid = parseInt(req.params.cid);
  const carrito = await manager.obtenerCarritoPorId(cid);

  if (!carrito) {
    return res.status(404).json({ mensaje: 'Carrito no encontrado' });
  }

  res.json(carrito.products);
});

// POST /api/carts/:cid/product/:pid → Agregar producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
  const cid = parseInt(req.params.cid);
  const pid = parseInt(req.params.pid);

  const carritoActualizado = await manager.agregarProductoAlCarrito(cid, pid);

  if (!carritoActualizado) {
    return res.status(404).json({ mensaje: 'Carrito no encontrado' });
  }

  res.json(carritoActualizado);
});

module.exports = router;
