import { Router } from 'express';
import {
    getAddUser,
    postAddUser,
    postSignIn
} from '../controllers/index.controller.js';

const router = Router();

router.get('/', getAddUser);

router.post('/', postAddUser);

router.post('/signin', postSignIn);

export default router;