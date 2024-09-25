const Task = require('../models/Task');

const TaskController = {
    async create (req, res) {
        try {
            const newTask = new Task(req.body); // Crea una nueva tarea con los datos recibidos en el body
            await newTask.save(); // Guarda la tarea en la base de datos
            res.status(201).json(newTask); // Devuelve la tarea recién creada
        } catch (error) {
            res.status(500).json({ message: 'Error creando la tarea', error });
        }
    },
    async getAll (req, res) {
        try {
            const tasks = await Task.find(); // Encuentra todas las tareas
            res.status(200).json(tasks); // Devuelve la lista de tareas
        } catch (error) {
            res.status(500).json({ message: 'Error obteniendo las tareas', error });
        }
    },
    async getId (req, res) {
        try {
            const task = await Task.findById(req.params._id); // Encuentra una tarea por su ID
            if (!task) {
                return res.status(404).json({ message: 'Tarea no encontrada' });
            }
            res.status(200).json(task); // Devuelve la tarea encontrada
        } catch (error) {
            res.status(500).json({ message: 'Error obteniendo la tarea', error });
        }
    },
    async markCompleted (req, res) {
        try {
            const task = await Task.findByIdAndUpdate(req.params._id, { completed: true }, { new: true }); // Actualiza el campo 'completed'
            if (!task) {
                return res.status(404).json({ message: 'Tarea no encontrada' });
            }
            res.status(200).json(task); // Devuelve la tarea actualizada
        } catch (error) {
            res.status(500).json({ message: 'Error marcando la tarea como completada', error });
        }
    },
    async updateById (req, res) {
        try {
            const task = await Task.findByIdAndUpdate(req.params._id, { title: req.body.title }, { new: true });
            if (!task) {
                return res.status(404).json({ message: 'Tarea no encontrada' });
            }
            res.status(200).json(task);
        } catch (error) {
            res.status(500).json({ message: 'Error actualizando la tarea', error });
        }
    },
    async deleteById (req, res) {
        try {
            const task = await Task.findByIdAndDelete(req.params._id); // Elimina la tarea por su ID
            if (!task) {
                return res.status(404).json({ message: 'Tarea no encontrada' });
            }
            res.status(200).json({ message: 'Tarea eliminada con éxito' });  // Confirma que la tarea ha sido eliminada
        } catch (error) {
            res.status(500).json({ message: 'Error eliminando la tarea', error });
        }
    }
   
}

module.exports = TaskController