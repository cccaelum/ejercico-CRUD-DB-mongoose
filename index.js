const express = require('express');
const dbConnection = require('./config/config');
const taskRoutes = require('./routes/tasks');
const app = express();
const PORT = 8080;

// Conexión a la base de datos
dbConnection();

// Middleware
app.use(express.json());

// Rutas
app.use('/', taskRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
