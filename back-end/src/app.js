import cors from 'cors';
import express from 'express';

import speciesRouter from './routes/species';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', speciesRouter);

export const viteNodeApp = app;
