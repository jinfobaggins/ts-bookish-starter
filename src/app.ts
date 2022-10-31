import express from 'express';
import 'dotenv/config';
import { Sequelize, Model, DataTypes } from 'sequelize';
//import { Book } from './sequelizeDefines';

import healthcheckRoutes from './controllers/healthcheckController';
import bookRoutes from './controllers/bookController';
import { getBooksAsList } from './DatabaseAccess/bookRequests';
import { correctUserAndPassword } from './DatabaseAccess/loggingIn';
import { config } from './DatabaseAccess/connectionConfig';

const port = process.env['PORT'] || 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});


const passport = require("passport");
require("./passport");
const auth = require('./routes/auth');
const user = require('./routes/user');



// app.use(express.json());
// app.use('/healthcheck', healthcheckRoutes);
// app.use('/books', bookRoutes);
// app.use('/auth', auth);
// app.use('/user', passport.authenticate('jwt', {session: false}), user);
app.use('/getBooks', (req, res) => {getBooksAsList().then((bookArray) => {res.send(bookArray)})});
app.use('/login', (req, res) => {correctUserAndPassword('user', 'pass').then((message)=>{res.send(message)})});
