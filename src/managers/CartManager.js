const fs = require('fs').promises;
const path = require('path');

class CartManager {
  constructor() {
    this.path = path.join(__dirname, '../data/carts.json');
  }

  async #leerArchivo() {
    try {
      const datos = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(datos);
    } catch (error) {
      return [];
    }
  }

  async #guardarArchivo(carritos) {
    await fs.writeFile(this.path, JSON.stringify(carritos, null, 2));
  }

  async crearCarrito() {
    const carritos = await this.#leerArchivo();
    const nuevoId = carritos.length > 0 ? carritos[carritos.length - 1].id + 1 : 1;
    const nuevoCarrito = { id: nuevoId, products: [] };
    carritos.push(nuevoCarrito);
    await this.#guardarArchivo(carritos);
    return nuevoCarrito;
  }

  async obtenerCarritoPorId(id) {
    const carritos = await this.#leerArchivo();
    return carritos.find(c => c.id === id);
  }

  async agregarProductoAlCarrito(cid, pid) {
    const carritos = await this.#leerArchivo();
    const carrito = carritos.find(c => c.id === cid);

    if (!carrito) return null;

    const productoEnCarrito = carrito.products.find(p => p.product === pid);

    if (productoEnCarrito) {
      productoEnCarrito.quantity += 1;
    } else {
      carrito.products.push({ product: pid, quantity: 1 });
    }

    await this.#guardarArchivo(carritos);
    return carrito;
  }
}

module.exports = CartManager;
