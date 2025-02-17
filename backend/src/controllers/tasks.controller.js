import Task from '../models/task.model.js';
import User from '../models/user.model.js';

export const getTasks = async (req, res) => {
    const username = req.user.username;

    const userDB = await User.findOne({
        where: {
            username
        }
    });

    if (!userDB) {
        return res.status(404).json({ success: false, error: 'Usuario no encontrado.' });
    }

    const tasks = await Task.findAll({
        where: {
            id_user: userDB.id
        }
    });

    res.status(200).json({ success: true, data: tasks, message: "Tareas recuperadas con exito." });
};

export const postTask = async (req, res) => {
    const { title, description, deadline } = req.body;
    const username = req.user.username;

    if (!title) {
        return res.status(400).json({ success: false, error: 'Faltan datos.' });
    }

    const userDB = await User.findOne({
        where: {
            username
        }
    });

    if (!userDB) {
        return res.status(404).json({ success: false, error: 'Usuario no encontrado.' });
    }

    const newTask = await Task.create({
        id_user: userDB.id,
        title,
        description,
        isReady: false,
        deadline: deadline
    });

    res.status(201).json({ success: true, message: "Tarea creada." });
    
}

export const putTask = async (req, res) => {
    const { id } = req.params;
    const username = req.user.username;
    const { title, description, isReady } = req.body;

    if (!id) {
        return res.status(400).json({ success: false, error: 'Faltan datos.' });
    }

    /*if (!title) {
        return res.status(400).json({ success: false, error: 'La tarea debe tener al menos el titulo' });
    }*/

    const user = await User.findOne({
        where: {
            username
        }
    });

    if (!user) {
        return res.status(404).json({ success: false, error: 'Usuario no encontrado.' });
    }

    const task = await Task.findOne({
        where: {
            id,
            id_user: user.id
        }
    });

    if (!task) {
        return res.status(404).json({ success: false, error: 'Tarea no encontrada.' });
    }

    if (title) {
        task.title = title;
    }

    if (description) {
        task.description = description;
    }

    if (isReady !== undefined) {
        task.isReady = isReady;
    }    

    await task.save();

    res.status(200).json({ success: true, message: "Tarea actualizada." });

};

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    const username = req.user.username;

    if (!id) {
        return res.status(400).json({ success: false, error: 'Faltan datos.' });
    }

    const user = await User.findOne({
        where: {
            username
        }
    });

    if (!user) {
        return res.status(404).json({ success: false, error: 'Usuario no encontrado.' });
    }

    const task = await Task.findOne({
        where: {
            id,
            id_user: user.id
        }
    });

    if (!task) {
        return res.status(404).json({ success: false, error: 'Tarea no encontrada.' });
    }

    await task.destroy();

    res.status(200).json({ success: true, message: 'Tarea eliminada con exito.' });

};