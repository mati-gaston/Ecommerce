const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/Productmanager');
const manager = new ProductManager();

// GET /api/products → Listar todos los productos
router.get('/', async (req, res) => {
  const productos = await manager.obtenerTodos();
  res.json(productos);
});

// GET /api/products/:pid → Obtener un producto por ID
router.get('/:pid', async (req, res) => {
  const id = parseInt(req.params.pid);
  const producto = await manager.obtenerPorId(id);
  if (producto) {
    res.json(producto);
  } else {
    res.status(404).json({ mensaje: 'Producto no encontrado' });
  }
});

// POST /api/products → Agregar un nuevo producto
router.post('/', async (req, res) => {
  const { title, description, code, price, status, stock, category, thumbnails } = req.body;

  if (!title || !description || !code || !price || stock === undefined || !category) {
    return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
  }

  const nuevoProducto = await manager.agregarProducto({
    title,
    description,
    code,
    price,
    status: status ?? true,
    stock,
    category,
    thumbnails: thumbnails || [],
  });

  res.status(201).json(nuevoProducto);
});

// PUT /api/products/:pid → Actualizar un producto
router.put('/:pid', async (req, res) => {
  const id = parseInt(req.params.pid);
  const campos = req.body;

  if ('id' in campos) {
    return res.status(400).json({ mensaje: 'No se puede modificar el ID del producto' });
  }

  const productoActualizado = await manager.actualizarProducto(id, campos);

  if (productoActualizado) {
    res.json(productoActualizado);
  } else {
    res.status(404).json({ mensaje: 'Producto no encontrado' });
  }
});

// DELETE /api/products/:pid → Eliminar un producto
router.delete('/:pid', async (req, res) => {
  const id = parseInt(req.params.pid);
  const producto = await manager.obtenerPorId(id);

  if (!producto) {
    return res.status(404).json({ mensaje: 'Producto no encontrado' });
  }

  await manager.eliminarProducto(id);
  res.json({ mensaje: 'Producto eliminado correctamente' });
});

module.exports = router;
