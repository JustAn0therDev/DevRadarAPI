import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import http from 'http';
import routes from './routes';
import { setupWebSocket } from './websocket';

const app = express();

//Criamos um servidor http passando o aplicativo express como argumento
const server = http.Server(app);

//e configuramos o WebSocket passando o proprio servidor.
setupWebSocket(server);

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-3ablg.mongodb.net/week10', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

//O express precisa usar o json() para entender que as requisições estão sendo efetivamente feitas em JSON.
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

server.listen(3333);