const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const TaskController = require("../controllers/Task.controller")

router.get('/test', (req, res) => {
    res.send('Ruta de prueba funcionando');
});

// POST - Crear una tarea
router.post('/create', TaskController.create)

// GET - Obtener todas las tareas
router.get('/', TaskController.getAll);

// GET - Buscar tarea por ID
router.get('/id/:_id', TaskController.getId);

// PUT - Marcar tarea como completada
router.put('/markAsCompleted/:_id', TaskController.markCompleted);

// PUT - Actualizar título de la tarea
router.put('/id/:_id', TaskController.updateById);

// DELETE - Eliminar una tarea
router.delete('/id/:_id', TaskController.deleteById);


module.exports = router;
