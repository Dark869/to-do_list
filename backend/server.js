import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './src/routes/auth.routes.js';
import tasksRoutes from './src/routes/tasks.routes.js';
import settingsRoutes from './src/routes/settings.routes.js';
import errorsRoutes from './src/routes/errors.routes.js';
import { PORT, URI, URL_FRONTEND } from './src/config/envConfig.js';

export const app = express();

//Middlewares
app.disable('x-powered-by');
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: URL_FRONTEND,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization']
    }));

//Routes
app.use(authRoutes);
app.use(tasksRoutes);
app.use(settingsRoutes);

app.use(errorsRoutes);

//Server running
app.listen(PORT, () => {
    console.log(`\x1b[32mServer is running in \x1b[34m${URI}:${PORT}`);
});
