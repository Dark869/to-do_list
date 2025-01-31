import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
/*import fs from 'fs';
import https from 'https';*/

import indexRoutes from './src/routes/index.routes.js';
import tasksRoutes from './src/routes/tasks.routes.js';
import settingsRoutes from './src/routes/settings.routes.js';
import errorsRoutes from './src/routes/errors.routes.js';
import { PORT, URI } from './src/config/envConfig.js';

export const app = express();

/*const sslOptions = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
};*/

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization']
    }));

//Routes
app.use(indexRoutes);
app.use(tasksRoutes);
app.use(settingsRoutes);

app.use(errorsRoutes);

//Server running
app.listen(PORT, () => {
    console.log(`\x1b[32mServer is running in \x1b[34m${URI}:${PORT}`);
});

/*https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(`\x1b[32mServer is running in \x1b[34m${URI}:${PORT}`);
});*/