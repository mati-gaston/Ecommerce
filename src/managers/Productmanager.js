const fs = require('fs').promises;
const path = require('path');

class ProductManager {
  constructor() {
    this.path = path.join(__dirname, '../data/products.json');
  }

  async #leerArchivo() {
    try {
      const datos = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(datos);
    } catch (error) {
      return [];
    }
  }

  async #guardarArchivo(productos) {
    await fs.writeFile(this.path, JSON.stringify(productos, null, 2));
  }

  async obtenerTodos() {
    return await this.#leerArchivo();
  }

  async obtenerPorId(id) {
    const productos = await this.#leerArchivo();
    return productos.find(prod => prod.id === id);
  }

  async agregarProducto(producto) {
    const productos = await this.#leerArchivo();
    const nuevoId = productos.length > 0 ? productos[productos.length - 1].id + 1 : 1;
    const nuevoProducto = { id: nuevoId, ...producto };
    productos.push(nuevoProducto);
    await this.#guardarArchivo(productos);
    return nuevoProducto;
  }

  async actualizarProducto(id, camposActualizados) {
    const productos = await this.#leerArchivo();
    const indice = productos.findIndex(prod => prod.id === id);
    if (indice === -1) return null;

    productos[indice] = { ...productos[indice], ...camposActualizados, id }; // no se actualiza el ID
    await this.#guardarArchivo(productos);
    return productos[indice];
  }

  async eliminarProducto(id) {
    const productos = await this.#leerArchivo();
    const productosFiltrados = productos.filter(prod => prod.id !== id);
    await this.#guardarArchivo(productosFiltrados);
    return productosFiltrados;
  }
}

module.exports = ProductManager;
