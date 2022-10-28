import express from 'express';
import 'dotenv/config';

import healthcheckRoutes from './controllers/healthcheckController';
import bookRoutes from './controllers/bookController';
import { getBooksAsList } from './DatabaseAccess/bookRequests';
import { login } from './DatabaseAccess/loggingIn';
import { Connection } from 'tedious';


const port = process.env['PORT'] || 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});


//set up tedious and the connection and stuff
//export var jwt = require('jsonwebtoken');



var config = {
    server: "localhost",
    options: {
        trustServerCertificate: true,
        trustedConnection: true
    },
    authentication: {
        type: "default",
        options: {  
            userName: "JenRob",
            password: "password",
        }
    }

};

//initialise the connection
var connection = new Connection(config);
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
app.use('/getBooks', (req, res) => {getBooksAsList(connection).then((bookArray) => {res.send(bookArray)})});
app.use('/login', (req, res) => {login('user1', 'securepassword', connection).then((message)=>{res.send(message)})});
