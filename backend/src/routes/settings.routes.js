import { Router } from "express";

import {
    getUserData,
    putUpdateUserData
} from '../controllers/settings.controller.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = Router();

router.get('/user', verifyToken, getUserData);

router.put('/user', verifyToken, putUpdateUserData);

export default router;
