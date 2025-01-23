import { Router } from 'express';

import { 
    routesNotFound
} from '../controllers/errors.controller.js';

const router = Router();

router.use('*', routesNotFound);

export default router;