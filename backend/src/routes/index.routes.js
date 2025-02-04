import { Router } from 'express';

import {
    postSignUp,
    postSignIn,
    postSignOut,
    postVerifyToken
} from '../controllers/index.controller.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = Router();

router.post('/signup', postSignUp);

router.post('/signin', postSignIn);

router.post('/signout', verifyToken, postSignOut);

router.post('/verifytoken', verifyToken, postVerifyToken);

export default router;