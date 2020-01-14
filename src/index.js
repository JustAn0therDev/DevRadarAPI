import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

import usersRouter from './controllers/users.js';

//O express precisa usar o json() para entender que as requisições estão sendo efetivamente feitas em JSON.
//Tempo do vídeo: 39:32
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/users', usersRouter);

app.listen(9000);