const app = require('./app');
const http = require('http');
const { Server } = require('socket.io');
const ProductManager = require('./managers/Productmanager');

const server = http.createServer(app);
const io = new Server(server);

const manager = new ProductManager();

io.on('connection', (socket) => {
  console.log('🟢 Cliente conectado');

  // Recibir nuevo producto desde el cliente
  socket.on('nuevoProducto', async (data) => {
    await manager.agregarProducto(data);
    const productosActualizados = await manager.obtenerTodos();
    io.emit('productosActualizados', productosActualizados);
  });

  // Recibir solicitud de eliminación de producto
  socket.on('eliminarProducto', async (id) => {
    await manager.eliminarProducto(id);
    const productosActualizados = await manager.obtenerTodos();
    io.emit('productosActualizados', productosActualizados);
  });

  socket.on('disconnect', () => {
    console.log('🔴 Cliente desconectado');
  });
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
