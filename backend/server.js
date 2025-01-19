import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import indexRoutes from './src/routes/index.routes.js';
import { PORT, URI } from './src/config/envConfig.js';

export const app = express();

//Middlewares7
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

//Routes
app.use(indexRoutes);

app.listen(PORT, () => {
    console.log(`\x1b[32mServer is running in \x1b[34m${URI}:${PORT}`);
});