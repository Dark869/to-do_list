import { Router } from 'express';

import {
    getAddUser,
    postSignUp,
    postSignIn,
    postSignOut
} from '../controllers/index.controller.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = Router();

router.get('/', getAddUser);

router.post('/signup', postSignUp);

router.post('/signin', postSignIn);

router.post('/signout', verifyToken, postSignOut);

export default router;