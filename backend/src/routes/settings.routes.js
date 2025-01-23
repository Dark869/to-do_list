import { Router } from "express";

import {
    getUserData,
    putUpdateUserData
} from '../controllers/settings.controller.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = Router();

router.get('/settings', verifyToken, getUserData);

router.put('/settings', verifyToken, putUpdateUserData);

export default router;

