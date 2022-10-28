import express from 'express';
import 'dotenv/config';

import healthcheckRoutes from './controllers/healthcheckController';
import bookRoutes from './controllers/bookController';
import { getBooksAsList } from './DatabaseAccess/bookRequests';
import { correctUserAndPassword } from './DatabaseAccess/loggingIn';
import { Connection } from 'tedious';
import { config } from './DatabaseAccess/createConnection';

const port = process.env['PORT'] || 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});


require('./passport');
const auth = require('./routes/auth');
app.use('/auth', auth);

 
//initialise the connection
export var connection = new Connection(config);


connection.connect();
    connection.on('connect', function(err) {
        if(err) {
            console.log('Error: ', err);
        } else{
            console.log('Connected');

        }
    });



app.use(express.json());
app.use('/healthcheck', healthcheckRoutes);
app.use('/books', bookRoutes);
app.use('/getBooks', (req, res) => {getBooksAsList().then((bookArray) => {res.send(bookArray)})});
app.use('/login', (req, res) => {correctUserAndPassword('user1', 'securepassword').then((message)=>{res.send(message)})});
