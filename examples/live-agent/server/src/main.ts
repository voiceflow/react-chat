import 'dotenv/config';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import expressWS from 'express-ws';

import { intercomRoutes } from './intercom/intercom.routes';

const { app } = expressWS(express());

app.use(cors());
app.use(bodyParser.json());

intercomRoutes(app);

app.listen(9099);
console.log('server is running on port 9099');
