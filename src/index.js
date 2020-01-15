import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import routes from './routes';

const app = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-3ablg.mongodb.net/week10', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//O express precisa usar o json() para entender que as requisições estão sendo efetivamente feitas em JSON.
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

app.listen(9000);