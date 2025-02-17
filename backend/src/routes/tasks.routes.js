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

router.post('/task', verifyToken, postTask);

router.put('/task/:id', verifyToken, putTask);

router.delete('/task/:id', verifyToken, deleteTask);

export default router;