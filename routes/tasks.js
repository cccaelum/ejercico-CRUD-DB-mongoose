const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.get('/test', (req, res) => {
    res.send('Ruta de prueba funcionando');
});

// POST /create - Crear una tarea
router.post('/create', async (req, res) => {
    try {
        const newTask = new Task(req.body); // Crea una nueva tarea con los datos recibidos en el body
        await newTask.save(); // Guarda la tarea en la base de datos
        res.status(201).json(newTask); // Devuelve la tarea recién creada
    } catch (error) {
        res.status(500).json({ message: 'Error creando la tarea', error });
    }
});

// GET / - Obtener todas las tareas
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find(); // Encuentra todas las tareas
        res.status(200).json(tasks); // Devuelve la lista de tareas
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo las tareas', error });
    }
});

// GET /id/:_id - Buscar tarea por ID
router.get('/id/:_id', async (req, res) => {
    try {
        const task = await Task.findById(req.params._id); // Encuentra una tarea por su ID
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.status(200).json(task); // Devuelve la tarea encontrada
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo la tarea', error });
    }
});

// PUT /markAsCompleted/:_id - Marcar tarea como completada
router.put('/markAsCompleted/:_id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params._id, { completed: true }, { new: true }); // Actualiza el campo 'completed'
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.status(200).json(task); // Devuelve la tarea actualizada
    } catch (error) {
        res.status(500).json({ message: 'Error marcando la tarea como completada', error });
    }
});

// PUT /id/:_id - Actualizar título de la tarea
router.put('/id/:_id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params._id, { title: req.body.title }, { new: true });
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error actualizando la tarea', error });
    }
});

// DELETE /id/:_id - Eliminar una tarea
router.delete('/id/:_id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params._id); // Elimina la tarea por su ID
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.status(200).json({ message: 'Tarea eliminada con éxito' });  // Confirma que la tarea ha sido eliminada
    } catch (error) {
        res.status(500).json({ message: 'Error eliminando la tarea', error });
    }
});



module.exports = router;
