import express from 'express';
import 'dotenv/config';

import healthcheckRoutes from './controllers/healthcheckController';
import bookRoutes from './controllers/bookController';
import getAllBooks from './controllers/getAllBooks';
import Book from './controllers/book';

const port = process.env['PORT'] || 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});


//set up tedious and the connection and stuff
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var jwt = require('jsonwebtoken');


var config = {
    server: "localhost", // or "localhost"
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

var connection = new Connection(config);
connection.connect();



//actually do the stuff now

var bookArray: Book[] = [];
var output: string = 'failed to login'

getBooksAsList();
//var message = login('user1', 'securepassword')
app.use('/healthcheck', healthcheckRoutes);
app.use('/books', bookRoutes);
app.use('/getBooks', (req, res) => {res.send(getBooksAsList())})
//app.use('/login', (req, res) => {res.send(message)})

//login()
//login('user1', 'wrongpassword')


export function getBooksAsList(){

    var request = new Request("SELECT * FROM books", function(err){
        if (err) {
            console.log(err);
        }
    });

    request.on('row', function(columns) {
        var arr: any[] = [];
        columns.forEach(function(column){
            arr.push(column.value);
        })
        var book = new Book(arr[0], arr[1], arr[2], arr[3]);
        bookArray.push(book);

    });
    
    //console.log(bookArray);
        
    // Setup event handler when the connection is established. 
    connection.on('connect', function(err) {
        if(err) {
            console.log('Error: ', err);
        } else{
            console.log('Connected');

        
            connection.execSql(request);
        }
    });
    //console.log(bookArray)    
    return bookArray;
        
}



function login(username: string, password: string){
   
    var sql: string = "SELECT * FROM users WHERE username='" + username + "' and password='" + password + "'";
    console.log(sql);
    var request = new Request(sql, function(err){
        if (err) {
            console.log(err);
        }
    });

    request.on('row', function() {

        var token = jwt.sign({ foo: 'loggedin' }, 'shhhhh');
        var decoded = jwt.verify(token, 'shhhhh');
        console.log(decoded.foo)
        output = 'loggedin';
        console.log(output);
        

    });

        
    // Setup event handler when the connection is established. 
    connection.on('connect', function(err) {
        if(err) {
            console.log('Error: ', err);
        } else{
            console.log('Connected');
            
            connection.execSql(request);
        }
    });

    return output;
    
    
        
}
