import { Router } from 'express';

import verifyToken from '../middlewares/verifyToken.js';
import {
    getTasks,
    postTask,
    putTask,
    deleteTask
} from '../controllers/tasks.controller.js';

const router = Router();

router.get('/tasks', verifyToken, getTasks);

router.post('/newTask', verifyToken, postTask);

router.put('/updateTask/:id', verifyToken, putTask);

router.delete('/deleteTask/:id', verifyToken, deleteTask);

export default router;