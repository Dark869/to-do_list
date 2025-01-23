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
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const tasks = await Task.findAll({
        where: {
            id_user: userDB.id
        }
    });

    res.json( tasks ).status(200);
};

export const postTask = async (req, res) => {
    const { title, description, deadline } = req.body;
    const username = req.user.username;

    if (!title) {
        return res.status(400).json({ message: 'Faltan datos' });
    }

    const userDB = await User.findOne({
        where: {
            username
        }
    });

    if (!userDB) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const newTask = await Task.create({
        id_user: userDB.id,
        title,
        description,
        isReady: false,
        deadline: deadline
    });

    res.json( newTask ).status(201);
    
}

export const putTask = async (req, res) => {
    const { id } = req.params;
    const username = req.user.username;
    const { title, description, isReady } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'Faltan datos' });
    }

    if (!title) {
        return res.status(400).json({ message: 'La tarea debe tener al menos el titulo' });
    }

    const user = await User.findOne({
        where: {
            username
        }
    });

    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const task = await Task.findOne({
        where: {
            id,
            id_user: user.id
        }
    });

    if (!task) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
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

    res.json( task ).status(200);

};

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    const username = req.user.username;

    if (!id) {
        return res.status(400).json({ message: 'Faltan datos' });
    }

    const user = await User.findOne({
        where: {
            username
        }
    });

    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const task = await Task.findOne({
        where: {
            id,
            id_user: user.id
        }
    });

    if (!task) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    await task.destroy();

    res.json({ message: 'Tarea eliminada' }).status(200);

};