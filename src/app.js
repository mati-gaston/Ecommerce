const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Para archivos estáticos si los necesitás

// Configuración de Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Rutas
const productsRoutes = require('./rutas/productosRuta');
const cartsRoutes = require('./rutas/cartsRuta');
const viewsRouter = require('./rutas/viewsRuta');

app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);
app.use('/', viewsRouter); // para /home y /realtimeproducts

module.exports = app;
