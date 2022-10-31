import express from 'express';
import 'dotenv/config';

import healthcheckRoutes from './controllers/healthcheckController';
import bookRoutes from './controllers/bookController';
import userRoutes from './controllers/userController';
import { correctUserAndPassword } from './DatabaseAccess/loggingIn';

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



app.use(express.json());
app.use('/healthcheck', healthcheckRoutes);
app.use('/books', bookRoutes);
app.use('/auth', auth);
app.use('/user', passport.authenticate('jwt', {session: false}), userRoutes);
//app.use('/login', (req, res) => {correctUserAndPassword('user', 'pass').then((message)=>{res.send(message)})});
