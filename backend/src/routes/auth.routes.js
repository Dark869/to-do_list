import { Router } from 'express';

import {
    postSignUp,
    postSignIn,
    postSignOut,
    postVerifyToken
} from '../controllers/auth.controller.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = Router();

router.post('/auth/signup', postSignUp);

router.post('/auth/signin', postSignIn);

router.post('/auth/signout', verifyToken, postSignOut);

router.post('/auth/verifytoken', verifyToken, postVerifyToken);

export default router;